import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { code } = await req.json();
    if (!code?.trim()) {
      return new Response(JSON.stringify({ error: "No code provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use the Piston API (free, no API key required) to execute Java code
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "java",
        version: "15.0.2",
        files: [{ name: "Main.java", content: code }],
        stdin: "",
        run_timeout: 10000,
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Piston API error:", response.status, t);
      return new Response(JSON.stringify({ error: "Compilation service unavailable. Please try again." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    const compileOutput = data.compile?.output || "";
    const compileCode = data.compile?.code ?? 0;
    const runOutput = data.run?.output || "";
    const runCode = data.run?.code ?? 0;
    const runSignal = data.run?.signal || null;

    const success = compileCode === 0;
    const errors: string[] = [];
    const debugInfo: string[] = [];
    let output = "";

    debugInfo.push("[INFO] Compilation started...");

    if (!success) {
      // Compilation failed
      debugInfo.push("[ERROR] Compilation failed.");
      const errorLines = compileOutput.split("\n").filter((l: string) => l.trim());
      errors.push(...errorLines);
      debugInfo.push(...errorLines.map((l: string) =>
        l.toLowerCase().includes("error") ? `[ERROR] ${l}` : `[DEBUG] ${l}`
      ));
    } else {
      debugInfo.push("[INFO] No syntax errors found.");
      debugInfo.push("[INFO] ByteCode generated successfully.");

      if (runSignal === "SIGKILL" || runCode !== 0) {
        debugInfo.push("[ERROR] Runtime error occurred.");
        if (runOutput.trim()) {
          output = runOutput;
          // Check if there's a runtime exception
          const lines = runOutput.split("\n");
          const errorLines = lines.filter((l: string) =>
            l.includes("Exception") || l.includes("Error") || l.includes("\tat ")
          );
          if (errorLines.length > 0) {
            errors.push(...errorLines);
          }
        }
        if (runSignal === "SIGKILL") {
          errors.push("Program terminated: exceeded time limit (10s).");
          debugInfo.push("[ERROR] Execution timed out.");
        }
      } else {
        output = runOutput;
        debugInfo.push("[INFO] Program executed successfully.");
      }
    }

    const result = {
      success: success && runCode === 0 && runSignal !== "SIGKILL",
      output,
      errors,
      debugInfo,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("compile-java error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
