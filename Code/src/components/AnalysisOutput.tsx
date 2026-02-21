import { CheckCircle, Clock, Lightbulb, ListOrdered } from "lucide-react";

interface AnalysisResult {
  steps: string[];
  timeComplexity: string;
  spaceComplexity: string;
  suggestion: string;
}

interface AnalysisOutputProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

export function AnalysisOutput({ result, isLoading }: AnalysisOutputProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-muted animate-pulse h-20" />
        ))}
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <ListOrdered className="h-12 w-12 mb-3 opacity-40" />
        <p className="text-sm">Paste your Java code and click Analyze to see results</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Step-by-step explanation */}
      <div className="rounded-lg border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <ListOrdered className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Step-by-Step Explanation</h3>
        </div>
        <ol className="space-y-2 ml-4">
          {result.steps.map((step, i) => (
            <li key={i} className="text-sm text-foreground/80 flex gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center font-semibold">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Complexity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Time Complexity</span>
          </div>
          <p className="text-lg font-mono font-bold text-foreground">{result.timeComplexity}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle className="h-4 w-4 text-success" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Space Complexity</span>
          </div>
          <p className="text-lg font-mono font-bold text-foreground">{result.spaceComplexity}</p>
        </div>
      </div>

      {/* Suggestion */}
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Optimization Suggestion</h3>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{result.suggestion}</p>
      </div>
    </div>
  );
}
