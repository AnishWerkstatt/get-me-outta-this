import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const Index = () => {
  const [problem, setProblem] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!problem.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setProblem("");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-6">
        <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-center text-foreground">
          Get Me Outta This
        </h2>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-xl">
          {submitted ? (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-200">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-6" />
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 text-foreground">
                You're on your way out.
              </h1>
              <p className="text-muted-foreground">
                Your problem has been submitted. Breathe easy.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 text-foreground">
                What's got you stuck?
              </h1>
              <p className="text-muted-foreground mb-8">
                Describe your problem. We'll help you find a way out.
              </p>

              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="I need help with..."
                rows={5}
                className="w-full bg-input border-0 rounded-lg px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-body"
              />
              <button
                onClick={handleSubmit}
                disabled={!problem.trim()}
                className="mt-4 inline-flex items-center gap-3 bg-primary text-primary-foreground font-display font-bold text-sm tracking-[0.15em] uppercase px-10 py-4 rounded-lg hover:opacity-90 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Get Me Outta This
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
