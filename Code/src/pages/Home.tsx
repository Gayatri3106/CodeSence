import { Link } from "react-router-dom";
import { Code2, Search, Bug, BrainCircuit, Gauge, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Search,
    title: "Static Code Analysis",
    description: "Understand your Java program's logic with step-by-step explanations of each operation.",
  },
  {
    icon: Gauge,
    title: "Complexity Estimation",
    description: "Get time and space complexity analysis for your code to understand performance.",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description: "Receive optimization recommendations and alternative approaches based on complexity.",
  },
  {
    icon: Bug,
    title: "Compiler & Debugger",
    description: "Compile Java code online with error highlighting and debug messages.",
  },
  {
    icon: BrainCircuit,
    title: "AI Assistant",
    description: "Chat with an AI that explains code, answers questions, and helps debug issues.",
  },
  {
    icon: Code2,
    title: "Code Editor",
    description: "Full-featured code editor with syntax highlighting and line numbers for Java.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
        <div className="container mx-auto px-4 py-24 md:py-32 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent px-4 py-1.5 text-sm font-medium mb-6">
            <BrainCircuit className="h-4 w-4" />
            AI-Powered Code Analysis
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-tight">
            Understand Java Code
            <br />
            <span className="text-accent">Like Never Before</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            CodeSense helps students analyze, compile, and understand Java programs
            using AI-assisted explanations and static analysis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 px-8 text-base">
              <Link to="/analyzer">Start Analyzing</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 text-base">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground mb-3">Core Features</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to understand, analyze, and debug your Java programs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-card p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="h-11 w-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:gradient-accent group-hover:text-accent-foreground transition-all duration-300">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-2xl gradient-primary p-10 md:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Ready to decode your Java code?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Paste your code, get instant analysis, and learn from every line.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
            <Link to="/analyzer">Try CodeSense Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
