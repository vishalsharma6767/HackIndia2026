'use client';

import { cn } from '@/lib/utils';
import React, from 'react';

type RiskScoreGaugeProps = {
  score: number;
};

export function RiskScoreGauge({ score }: RiskScoreGaugeProps) {
  const [displayScore, setDisplayScore] = React.useState(0);

  React.useEffect(() => {
    // Animate the score from 0 to the target score
    const animation = requestAnimationFrame(() => setDisplayScore(score));
    return () => cancelAnimationFrame(animation);
  }, [score]);

  const getVerdictColorClass = (s: number) => {
    if (s <= 20) return 'text-safe'; // SAFE
    if (s <= 50) return 'text-accent'; // SUSPICIOUS
    return 'text-destructive'; // MALICIOUS
  };
  
  const getVerdictStrokeColorClass = (s: number) => {
    if (s <= 20) return 'stroke-safe';
    if (s <= 50) return 'stroke-accent';
    return 'stroke-destructive';
  };

  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (displayScore / 100) * circumference;

  const colorClass = getVerdictColorClass(score);
  const strokeColorClass = getVerdictStrokeColorClass(score);

  return (
    <div className="relative flex items-center justify-center h-48 w-48">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="stroke-muted"
          strokeWidth="8"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
        />
        <circle
          className={cn('transition-all duration-1000 ease-out', strokeColorClass)}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={cn('text-5xl font-bold font-headline', colorClass)}>
          {Math.round(displayScore)}
        </span>
        <span className="text-sm text-muted-foreground mt-1">Risk Score</span>
      </div>
    </div>
  );
}
