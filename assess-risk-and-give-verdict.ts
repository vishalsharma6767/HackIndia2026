'use server';

/**
 * @fileOverview Analyzes a URL and associated data to generate a risk score and verdict.
 *
 * - assessRiskAndGiveVerdict - A function that analyzes a URL and data to generate a risk score and verdict.
 * - AssessRiskAndGiveVerdictInput - The input type for the assessRiskAndGiveVerdict function.
 * - AssessRiskAndGiveVerdictOutput - The return type for the assessRiskAndGiveVerdict function.
 */

import {ai} from '@/ai/genkit';
import { AssessRiskAndGiveVerdictInputSchema, AssessRiskAndGiveVerdictOutputSchema, AssessRiskAndGiveVerdictInput, AssessRiskAndGiveVerdictOutput } from '@/ai/schemas';

export { type AssessRiskAndGiveVerdictInput, type AssessRiskAndGiveVerdictOutput } from '@/ai/schemas';


export async function assessRiskAndGiveVerdict(
  input: AssessRiskAndGiveVerdictInput
): Promise<AssessRiskAndGiveVerdictOutput> {
  return assessRiskAndGiveVerdictFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessRiskAndGiveVerdictPrompt',
  input: {schema: AssessRiskAndGiveVerdictInputSchema},
  output: {schema: AssessRiskAndGiveVerdictOutputSchema},
  prompt: `You are RAKSHAK—an AI cybersecurity analyst specializing in phishing and malicious link detection.

Analyze the given URL and sandbox-output details to generate a risk score and an easy-to-understand summary.

------------------------------------
### INPUT FORMAT
1. URL: {{url}}
2. Sandbox Behavior Report (if any): {{sandboxReport}}
3. HTML/JavaScript Extracted Code (optional): {{extractedCode}}
4. Network Calls Observed (optional): {{networkCalls}}

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

const assessRiskAndGiveVerdictFlow = ai.defineFlow(
  {
    name: 'assessRiskAndGiveVerdictFlow',
    inputSchema: AssessRiskAndGiveVerdictInputSchema,
    outputSchema: AssessRiskAndGiveVerdictOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
