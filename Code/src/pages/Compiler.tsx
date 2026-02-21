import { useState } from "react";
import { Play, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/CodeEditor";
import { supabase } from "@/supabase/client";
import { toast } from "sonner";

const DEFAULT_CODE = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("Sum of 1-10: " + sum);
    }
}`;

interface CompileResult {
  success: boolean;
  output: string;
  errors: string[];
  debugInfo: string[];
}

export default function Compiler() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [result, setResult] = useState<CompileResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"output" | "debug">("output");

  const handleRun = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("compile-java", {
        body: { code },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      console.error("Compilation failed:", e);
      toast.error(e.message || "Failed to compile. Please try again.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Compiler & Debugger</h1>
        <p className="text-muted-foreground text-sm">
          Write or paste Java code, compile it online, and view debug messages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Source Code</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setCode(DEFAULT_CODE); setResult(null); }}>
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
              </Button>
              <Button
                size="sm"
                onClick={handleRun}
                disabled={isRunning || !code.trim()}
                className="gradient-accent text-accent-foreground hover:opacity-90"
              >
                <Play className="h-3.5 w-3.5 mr-1.5" /> {isRunning ? "Running..." : "Run"}
              </Button>
            </div>
          </div>
          <CodeEditor value={code} onChange={setCode} height="460px" />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center gap-1 mb-3">
            {(["output", "debug"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab === "output" ? "Output" : "Debug Log"}
              </button>
            ))}
          </div>

          <div className="rounded-lg border code-editor-bg min-h-[460px] p-4 font-mono text-sm">
            {isRunning ? (
              <div className="flex items-center gap-2 text-code-comment">
                <div className="h-4 w-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                Compiling and running...
              </div>
            ) : !result ? (
              <p className="text-code-comment">Click "Run" to compile and execute your code.</p>
            ) : activeTab === "output" ? (
              <div>
                {result.success ? (
                  <div>
                    <div className="flex items-center gap-2 text-code-string mb-3">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wide">Compilation Successful</span>
                    </div>
                    <pre className="text-code-fg whitespace-pre-wrap">{result.output}</pre>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 text-destructive mb-3">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wide">Compilation Failed</span>
                    </div>
                    {result.errors.map((err, i) => (
                      <p key={i} className="text-destructive/90">{err}</p>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                {result.debugInfo.map((line, i) => (
                  <p
                    key={i}
                    className={
                      line.includes("[ERROR]")
                        ? "text-destructive"
                        : line.includes("[DEBUG]")
                        ? "text-code-keyword"
                        : "text-code-comment"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
