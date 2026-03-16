import { useState } from "react";
import heroPerson from "@/assets/hero-person.jpg";
import { ArrowDown, Send, CheckCircle, Loader2 } from "lucide-react";

const Index = () => {
  const [problem, setProblem] = useState("");
  const [excuse, setExcuse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://n8n.ivyside.in/webhook-test/44fae8e3-0b0d-4484-8643-96b1da8cdf16", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem }),
      });
      const data = await res.json();
      setExcuse(data.output || "No excuse found. Try again!");
    } catch (error) {
      console.error("Failed to submit:", error);
      setExcuse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setExcuse("");
    setProblem("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#" className="text-sm font-medium tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors">
              Recent Escapes
            </a>
          </nav>

          <div className="absolute left-1/2 -translate-x-1/2">
            <h2 className="font-display text-lg font-bold tracking-[0.2em] uppercase">
              Get Me Outta This
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-screen">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pb-12 lg:py-0">
          {excuse ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="inline-flex items-center gap-2 mb-6">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-foreground">
                Here Is Your<br />
                Excuse.
              </h1>
              <div className="max-w-lg bg-input rounded-lg px-5 py-4 text-base text-foreground mb-6">
                {excuse}
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-display font-bold text-sm tracking-[0.15em] uppercase px-10 py-4 rounded-lg hover:opacity-90 transition-all duration-150"
              >
                Try Another
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-foreground">
                Tell Us What's<br />
                Got You Stuck.
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mb-10">
                Describe your problem below. We'll help you find a way out — fast.
              </p>

              <div className="max-w-lg">
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="I need help with..."
                  rows={5}
                  className="w-full bg-input border-0 rounded-lg px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-body"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!problem.trim() || loading}
                  className="mt-4 inline-flex items-center gap-3 bg-primary text-primary-foreground font-display font-bold text-sm tracking-[0.15em] uppercase px-10 py-4 rounded-lg hover:opacity-90 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      Working on it...
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Get Me Outta This
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Image */}
        <div className="flex-1 bg-hero-bg flex items-end justify-center overflow-hidden lg:min-h-screen">
          <img
            src={heroPerson}
            alt="Person looking up with relief"
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl object-cover object-top h-[60vh] lg:h-[85vh]"
          />
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-muted-foreground tracking-widest uppercase">
        Developed by Anish
      </footer>
    </div>
  );
};

export default Index;
