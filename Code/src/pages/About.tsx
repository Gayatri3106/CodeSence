import { Target, BookOpen, Award, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const objectives = [
  "Provide AI-assisted Java code explanation for students",
  "Perform static analysis to break down program logic step-by-step",
  "Estimate time and space complexity automatically",
  "Suggest optimized approaches based on analysis",
  "Integrate an online Java compiler with error highlighting",
  "Offer a chat-based AI assistant for interactive learning",
];

const advantages = [
  { icon: BookOpen, title: "Student-Friendly", desc: "Designed for learners with clear, jargon-free explanations." },
  { icon: ShieldCheck, title: "No Setup Required", desc: "Everything runs in the browser — no installations needed." },
  { icon: Target, title: "Instant Feedback", desc: "Get analysis and compilation results in seconds." },
  { icon: Award, title: "AI-Powered", desc: "Leverages AI to provide contextual, accurate code explanations." },
];

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About CodeSense</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          An AI-powered educational platform that helps computer science students
          understand, analyze, and debug Java programs effectively.
        </p>
      </div>

      {/* Problem Statement */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
            <Target className="h-4 w-4" />
          </div>
          Problem Statement
        </h2>
        <div className="rounded-xl border bg-card p-6">
          <p className="text-foreground/80 leading-relaxed">
            Students learning Java often struggle to understand how their programs work internally.
            Traditional debugging tools are complex, and manual code tracing is time-consuming and error-prone.
            There is a need for an accessible, AI-powered tool that can explain code logic,
            estimate complexity, and suggest improvements — all in a student-friendly interface.
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <BookOpen className="h-4 w-4" />
          </div>
          Objectives
        </h2>
        <div className="rounded-xl border bg-card p-6">
          <ol className="space-y-3">
            {objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/80">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center font-semibold mt-0.5">
                  {i + 1}
                </span>
                {obj}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Advantages */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-success/10 text-success flex items-center justify-center">
            <Award className="h-4 w-4" />
          </div>
          Advantages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {advantages.map((adv) => (
            <div key={adv.title} className="rounded-xl border bg-card p-5">
              <adv.icon className="h-5 w-5 text-accent mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{adv.title}</h3>
              <p className="text-sm text-muted-foreground">{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Button asChild size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 px-8">
          <Link to="/analyzer">
            Try CodeSense <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
