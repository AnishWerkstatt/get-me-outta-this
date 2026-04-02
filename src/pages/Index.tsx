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
      const res = await fetch("https://n8n.ivyside.in/webhook/44fae8e3-0b0d-4484-8643-96b1da8cdf16", {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center md:justify-between">
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#" className="text-sm font-medium tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors">
              Recent Escapes
            </a>
          </nav>

          <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
            <h2 className="font-display text-base sm:text-lg font-bold tracking-[0.2em] uppercase">
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
        <div className="flex-1 flex flex-col justify-start pt-16 sm:pt-20 lg:justify-center lg:pt-0 px-5 sm:px-8 md:px-16 lg:px-24 pb-8 sm:pb-12">
          {excuse ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 animate-in zoom-in duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-success relative z-10" />
                </div>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 sm:mb-6 text-foreground">
                Here Is Your<br />
                Excuse.
              </h1>
              <div className="max-w-lg relative group animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-accent/40 to-success/30 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-card border border-border/50 rounded-xl px-5 sm:px-6 py-4 sm:py-5 text-sm sm:text-base text-foreground shadow-lg backdrop-blur-sm">
                  <div className="absolute top-3 left-4 text-primary/30 text-3xl font-serif leading-none">"</div>
                  <p className="pt-4 leading-relaxed">{excuse}</p>
                  <div className="absolute bottom-2 right-4 text-primary/30 text-3xl font-serif leading-none">"</div>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="mt-5 sm:mt-6 inline-flex items-center gap-3 bg-primary text-primary-foreground font-display font-bold text-xs sm:text-sm tracking-[0.15em] uppercase px-8 sm:px-10 py-3 sm:py-4 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500"
              >
                Try Another
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 sm:mb-8">
                <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 sm:mb-6 text-foreground">
                Tell Us What's<br />
                Got You Stuck.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-8 sm:mb-10">
                Describe your problem below. We'll help you find a way out — fast.
              </p>

              <div className="max-w-lg">
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="I need help with..."
                  rows={4}
                  className="w-full bg-input border-0 rounded-lg px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-body"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!problem.trim() || loading}
                  className="mt-3 sm:mt-4 inline-flex items-center gap-3 bg-primary text-primary-foreground font-display font-bold text-xs sm:text-sm tracking-[0.15em] uppercase px-8 sm:px-10 py-3 sm:py-4 rounded-lg hover:opacity-90 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
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

        {/* Right Image - hidden on small screens, shown on lg+ */}
        <div className="flex bg-hero-bg items-end justify-center overflow-hidden h-[40vh] lg:flex-1 lg:h-auto lg:min-h-screen">
          <img
            src={heroPerson}
            alt="Person looking up with relief"
            className="w-full max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl object-cover object-top h-full lg:h-[85vh]"
          />
        </div>
      </main>

      <footer className="py-3 sm:py-4 text-center text-xs text-muted-foreground tracking-widest uppercase">
        Developed by Anish
      </footer>
    </div>
  );
};

export default Index;
