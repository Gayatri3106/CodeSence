import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/CodeEditor";
import { AnalysisOutput } from "@/components/AnalysisOutput";
import { AIChatPanel } from "@/components/AIChatPanel";
import { supabase } from "@/supabase/client";
import { toast } from "sonner";

const SAMPLE_CODE = `public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        
        for (int val : arr) {
            System.out.print(val + " ");
        }
    }
}`;

interface AnalysisResult {
  steps: string[];
  timeComplexity: string;
  spaceComplexity: string;
  suggestion: string;
}

export default function CodeAnalyzer() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-code", {
        body: { code },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      console.error("Analysis failed:", e);
      toast.error(e.message || "Failed to analyze code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Code Analyzer</h1>
        <p className="text-muted-foreground text-sm">
          Paste your Java code to get a step-by-step analysis with complexity estimation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Editor + Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <CodeEditor value={code} onChange={setCode} height="340px" />
            <div className="mt-3 flex items-center gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || !code.trim()}
                className="gradient-accent text-accent-foreground hover:opacity-90"
              >
                <Play className="h-4 w-4 mr-2" />
                {isLoading ? "Analyzing..." : "Analyze Code"}
              </Button>
              <Button variant="outline" onClick={() => { setCode(""); setResult(null); }}>
                Clear
              </Button>
            </div>
          </div>

          <AnalysisOutput result={result} isLoading={isLoading} />
        </div>

        {/* Right: AI Chat */}
        <div className="lg:col-span-1">
          <AIChatPanel />
        </div>
      </div>
    </div>
  );
}
