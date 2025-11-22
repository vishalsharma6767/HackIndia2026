'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Terminal,
  Loader2,
  ShieldQuestion,
  Clock,
} from 'lucide-react';
import React from 'react';
import type { SimulateSandboxOutput } from '@/ai/schemas';

type SandboxSimulationProps = {
  timeline: SimulateSandboxOutput['timeline'] | null;
};

export function SandboxSimulation({ timeline }: SandboxSimulationProps) {
  if (!timeline) return null;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/10 animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline">
          <ShieldQuestion className="h-6 w-6 text-primary" />
          <span>Sandbox Simulation</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground pt-2">
          A timeline of events from a safe, simulated visit to the URL.
        </p>
      </CardHeader>
      <CardContent>
        {!timeline.length ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Initializing sandbox...</p>
          </div>
        ) : (
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
            
            <ul className="space-y-8">
              {timeline.map((event, index) => (
                <li key={index} className="relative flex items-start gap-4 animate-in fade-in-0 slide-in-from-top-4 duration-500" style={{ animationDelay: `${index * 150}ms`}}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center z-10 border-4 border-background">
                     <Terminal className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow pt-1">
                    <h4 className="font-semibold text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Clock className="w-3 h-3 mr-1.5" />
                      <span>{event.timestamp}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
