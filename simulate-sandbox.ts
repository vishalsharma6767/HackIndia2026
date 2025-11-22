'use server';

/**
 * @fileOverview Simulates running a URL in a sandbox and generates a technical report.
 *
 * - simulateSandbox - A function that simulates a sandbox and returns a report.
 * - SimulateSandboxInput - The input type for the simulateSandbox function.
 * - SimulateSandboxOutput - The return type for the simulateSandbox function.
 */

import { ai } from '@/ai/genkit';
import { SimulateSandboxInputSchema, SimulateSandboxOutputSchema, SimulateSandboxInput, SimulateSandboxOutput } from '@/ai/schemas';

export { type SimulateSandboxInput, type SimulateSandboxOutput } from '@/ai/schemas';

export async function simulateSandbox(input: SimulateSandboxInput): Promise<SimulateSandboxOutput> {
  return simulateSandboxFlow(input);
}

const simulateSandboxPrompt = ai.definePrompt({
  name: 'simulateSandboxPrompt',
  input: { schema: SimulateSandboxInputSchema },
  output: { schema: SimulateSandboxOutputSchema },
  prompt: `You are a cybersecurity sandbox simulation tool.
Given a URL, generate a plausible, technical timeline of events that would occur during a simulated visit.
The report should look like it came from a real sandbox environment like Joe Sandbox, Any.run, or VMRay, but presented as a timeline for a non-technical user.

URL: {{{url}}}

Generate a timeline of 4-6 events. Each event must include:
1.  **title:** A short, descriptive title for the event (e.g., "Initial Request", "DNS Lookup").
2.  **description:** A one-sentence, easy-to-understand explanation of what happened.
3.  **timestamp:** A realistic time for the event.

The events should be in chronological order. Do not include any pre-amble or explanation; just output the JSON object with the timeline array.`,
});

const simulateSandboxFlow = ai.defineFlow(
  {
    name: 'simulateSandboxFlow',
    inputSchema: SimulateSandboxInputSchema,
    outputSchema: SimulateSandboxOutputSchema,
  },
  async (input) => {
    const { output } = await simulateSandboxPrompt(input);
    return output!;
  }
);
