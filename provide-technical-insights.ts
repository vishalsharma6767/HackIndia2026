'use server';

/**
 * @fileOverview A cybersecurity analysis AI agent that provides technical insights into potential threats.
 *
 * - provideTechnicalInsights - A function that provides technical insights into potential threats.
 * - ProvideTechnicalInsightsInput - The input type for the provideTechnicalInsights function.
 * - ProvideTechnicalInsightsOutput - The return type for the provideTechnicalInsights function.
 */

import {ai} from '@/ai/genkit';
import { ProvideTechnicalInsightsInputSchema, ProvideTechnicalInsightsOutputSchema, ProvideTechnicalInsightsInput, ProvideTechnicalInsightsOutput } from '@/ai/schemas';

export { type ProvideTechnicalInsightsInput, type ProvideTechnicalInsightsOutput } from '@/ai/schemas';

export async function provideTechnicalInsights(input: ProvideTechnicalInsightsInput): Promise<ProvideTechnicalInsightsOutput> {
  return provideTechnicalInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideTechnicalInsightsPrompt',
  input: {schema: ProvideTechnicalInsightsInputSchema},
  output: {schema: ProvideTechnicalInsightsOutputSchema},
  prompt: `You are RAKSHAK—an AI cybersecurity analyst specializing in phishing and malicious link detection.
Analyze the given URL and sandbox-output details to generate a risk score and an easy-to-understand summary.

------------------------------------
### INPUT FORMAT
1. URL: {{{url}}}
2. Sandbox Behavior Report (if any): {{{sandboxReport}}}
3. HTML/JavaScript Extracted Code (optional): {{{extractedCode}}}
4. Network Calls Observed (optional): {{{networkCalls}}}

------------------------------------
### YOUR TASKS

#### 1. Generate a **Risk Score (0–100)**
- 0–20 → SAFE
- 21–50 → SUSPICIOUS
- 51–100 → MALICIOUS
The score must be justified using your reasoning.

#### 2. Give a **Final Verdict**
Choose ONE of:
- **SAFE**
- **SUSPICIOUS**
- **MALICIOUS**

#### 3. Provide a **Clear, Human-Readable Summary**
Explain:
- Why the link might be dangerous
- What exact behaviors triggered concern
- What data it might steal (example: passwords, camera, clipboard, cookies)
- Whether it tries redirection, downloads, or hidden scripts

Make it understandable for a **non-technical user**, like:
“⚠️ This site tries to secretly redirect you to another domain and load unknown scripts. It may steal passwords.”

#### 4. Provide an **Expert Technical Insight**
Explain in technical terms for cybersecurity evaluators:
- Pattern matches
- Obfuscation check
- Suspicious parameters
- Heuristic flags
- DNS/WHOIS anomalies
- Script behavior anomalies

#### 5. Provide **Top 3 Reasons for the Risk Score**

------------------------------------
### OUTPUT FORMAT (STRICT)

{
  "risk_score": <0-100>,
  "verdict": "SAFE / SUSPICIOUS / MALICIOUS",
  "user_friendly_summary": "Explain risk in simple language...",
  "technical_insight": "Explain risk in technical detail...",
  "top_reasons": [
      "Reason 1",
      "Reason 2",
      "Reason 3"
  ]
}
------------------------------------

Follow the output format exactly.
`,
});

const provideTechnicalInsightsFlow = ai.defineFlow(
  {
    name: 'provideTechnicalInsightsFlow',
    inputSchema: ProvideTechnicalInsightsInputSchema,
    outputSchema: ProvideTechnicalInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
