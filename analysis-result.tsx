import type { AnalyzeURLOutput } from '@/ai/schemas';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShieldAlert,
  BrainCircuit,
  CheckCircle2,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RiskScoreGauge } from './risk-score-gauge';

type AnalysisResultProps = {
  result: AnalyzeURLOutput;
};

export function AnalysisResult({ result }: AnalysisResultProps) {
  const {
    risk_score,
    verdict,
    user_friendly_summary,
    top_reasons,
    technical_insight,
  } = result;

  const getVerdictBadge = () => {
    switch (verdict) {
      case 'MALICIOUS':
        return (
          <Badge variant="destructive" className="text-lg px-4 py-1">
            Malicious
          </Badge>
        );
      case 'SUSPICIOUS':
        return (
          <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-4 py-1">
            Suspicious
          </Badge>
        );
      case 'SAFE':
      default:
        return (
          <Badge className="bg-safe text-safe-foreground hover:bg-safe/90 text-lg px-4 py-1">
            Safe
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-card/80 glow-border">
          <RiskScoreGauge score={risk_score} />
          <div className="mt-4">{getVerdictBadge()}</div>
        </Card>

        <Card className="md:col-span-2 bg-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <ShieldAlert className="w-6 h-6 text-accent" />
              <span>Threat Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-foreground/90">
              {user_friendly_summary}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <span>Top Reasons for Verdict</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {top_reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-accent mt-1 shrink-0" />
                <span className="text-foreground/90">{reason}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-card/80">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="technical-details" className="border-b-0">
            <AccordionTrigger className="p-6 text-left hover:no-underline">
              <CardTitle className="flex items-center gap-2 font-headline">
                <BrainCircuit className="w-6 h-6 text-primary" />
                <span>Technical Insights for Experts</span>
              </CardTitle>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="bg-background/50 p-4 rounded-md font-mono text-sm text-muted-foreground whitespace-pre-wrap border border-white/10">
                {technical_insight}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
