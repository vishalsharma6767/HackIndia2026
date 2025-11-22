'use client';

import { useState } from 'react';
import type { AnalyzeURLOutput, SimulateSandboxOutput } from '@/ai/schemas';
import { analyzeURL } from '@/ai/flows/analyze-url-for-phishing';
import { simulateSandbox } from '@/ai/flows/simulate-sandbox';
import { Header } from '@/components/app/header';
import { AnalysisForm } from '@/components/app/analysis-form';
import { AnalysisResult } from '@/components/app/analysis-result';
import { useToast } from '@/hooks/use-toast';
import { SandboxSimulation } from '@/components/app/sandbox-simulation';
import { AnalysisResultSkeleton } from '@/components/app/analysis-result-skeleton';

export default function Home() {
  const [result, setResult] = useState<AnalyzeURLOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sandboxTimeline, setSandboxTimeline] = useState<SimulateSandboxOutput['timeline'] | null>(null);
  const { toast } = useToast();

  const handleAnalysis = async (data: {
    url: string;
    sandboxReport?: string;
    extractedCode?: string;
    networkCalls?: string;
  }) => {
    setIsLoading(true);
    setResult(null);
    setSandboxTimeline(null);

    try {
      // Kick off the sandbox simulation first and update the UI as soon as it's ready.
      // Don't wait for the full analysis.
      simulateSandbox({ url: data.url }).then(sandboxResult => {
        setSandboxTimeline(sandboxResult.timeline);
      });

      // Then, run the main analysis.
      const analysisResult = await analyzeURL({
        ...data,
      });

      setResult(analysisResult);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description:
          'An error occurred during the analysis. Please try again.',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary/80 to-primary">
              RAKSHAK
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your AI-powered guardian against malicious links. Paste a URL to
              instantly analyze its threat level.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-10">
            <AnalysisForm onSubmit={handleAnalysis} isLoading={isLoading} />
          </div>

          <div className="mt-12 max-w-5xl mx-auto">
            {(isLoading || result) && (
              <div className="space-y-6">
                <SandboxSimulation timeline={sandboxTimeline} />
                {isLoading && !result && <AnalysisResultSkeleton />}
                {result && <AnalysisResult result={result} />}
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 border-t border-white/5">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} RAKSHAK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
