import { useState } from "react";
import { Mic, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type AnalysisResult = {
  status: "normal" | "irregular" | "distress";
  message: string;
  confidence: number;
};

const CoughAnalyzer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [waveIntensity, setWaveIntensity] = useState(0);

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsAnalyzing(true);
      
      // Simulate analysis
      setTimeout(() => {
        const results: AnalysisResult[] = [
          { status: "normal", message: "Normal Cough", confidence: 94 },
          { status: "irregular", message: "Irregular Cough Detected", confidence: 76 },
          { status: "distress", message: "Possible Respiratory Distress", confidence: 82 },
        ];
        setResult(results[Math.floor(Math.random() * results.length)]);
        setIsAnalyzing(false);
      }, 2000);
    } else {
      setIsRecording(true);
      setResult(null);
      // Simulate sound waves
      const interval = setInterval(() => {
        setWaveIntensity(Math.random() * 100);
      }, 100);
      setTimeout(() => clearInterval(interval), 3000);
    }
  };

  const getResultIcon = () => {
    if (!result) return null;
    switch (result.status) {
      case "normal":
        return <CheckCircle className="w-12 h-12 text-success" />;
      case "irregular":
        return <AlertTriangle className="w-12 h-12 text-warning" />;
      case "distress":
        return <AlertCircle className="w-12 h-12 text-destructive" />;
    }
  };

  const getResultVariant = () => {
    if (!result) return "default";
    switch (result.status) {
      case "normal": return "success";
      case "irregular": return "warning";
      case "distress": return "danger";
    }
  };

  return (
    <div className="min-h-screen pb-24 px-4">
      <div className="max-w-md mx-auto pt-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Cough Analyzer</h1>
          <p className="text-muted-foreground">Tap to record your cough</p>
        </div>

        {/* Microphone Button */}
        <div className="flex justify-center py-12 relative">
          {/* Sound waves */}
          {isRecording && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-32 rounded-full border-2 border-primary animate-ping"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    opacity: waveIntensity / 100,
                  }}
                />
              ))}
            </div>
          )}
          
          <Button
            size="lg"
            onClick={handleRecord}
            className={cn(
              "w-32 h-32 rounded-full transition-all duration-300",
              isRecording
                ? "bg-destructive hover:bg-destructive/90 animate-pulse-glow"
                : "bg-primary hover:bg-primary/90 glow-primary"
            )}
          >
            <Mic className="w-12 h-12" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-foreground">
            {isRecording ? "Recording..." : isAnalyzing ? "Analyzing..." : "Tap to start"}
          </p>
        </div>

        {/* Analysis Loading */}
        {isAnalyzing && (
          <div className="space-y-4 animate-fade-in">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-pulse-glow" style={{ width: "60%" }} />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              AI is analyzing your cough pattern...
            </p>
          </div>
        )}

        {/* Result Card */}
        {result && !isAnalyzing && (
          <div
            className={cn(
              "bg-card/30 backdrop-blur-sm border rounded-3xl p-6 space-y-4 animate-fade-in",
              result.status === "normal" && "border-success/30",
              result.status === "irregular" && "border-warning/30",
              result.status === "distress" && "border-destructive/30"
            )}
          >
            <div className="flex items-center gap-4">
              {getResultIcon()}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">{result.message}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Confidence: {result.confidence}%
                </p>
              </div>
            </div>
            
            <Progress value={result.confidence} className="h-2" />

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                {result.status === "normal"
                  ? "Your cough pattern appears normal. Continue monitoring."
                  : result.status === "irregular"
                  ? "Slight irregularity detected. Monitor symptoms over the next 24 hours."
                  : "Concerning pattern detected. Consider consulting a healthcare professional."}
              </p>
            </div>
          </div>
        )}

        {/* Trend Graph Placeholder */}
        {result && (
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-3xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Recent Trend</h3>
            <div className="h-32 flex items-end gap-2">
              {[65, 72, 68, 85, 78, 82, 88, 75, 71, result.confidence].map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/30 rounded-t-lg transition-all hover:bg-primary/50"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">Last 10 recordings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoughAnalyzer;
