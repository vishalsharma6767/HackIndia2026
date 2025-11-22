'use server';
/**
 * @fileOverview Summarizes a sandbox behavior report to highlight key indicators of malicious activity.
 *
 * - summarizeSandboxReport - A function that summarizes the sandbox report.
 * - SummarizeSandboxReportInput - The input type for the summarizeSandboxReport function.
 * - SummarizeSandboxReportOutput - The return type for the summarizeSandboxReport function.
 */

import {ai} from '@/ai/genkit';
import { SummarizeSandboxReportInputSchema, SummarizeSandboxReportOutputSchema, SummarizeSandboxReportInput, SummarizeSandboxReportOutput } from '@/ai/schemas';

export { type SummarizeSandboxReportInput, type SummarizeSandboxReportOutput } from '@/ai/schemas';


export async function summarizeSandboxReport(input: SummarizeSandboxReportInput): Promise<SummarizeSandboxReportOutput> {
  return summarizeSandboxReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSandboxReportPrompt',
  input: {schema: SummarizeSandboxReportInputSchema},
  output: {schema: SummarizeSandboxReportOutputSchema},
  prompt: `You are RAKSHAK—an AI cybersecurity analyst specializing in phishing and malicious link detection.\nAnalyze the given URL and sandbox-output details to generate a risk score and an easy-to-understand summary.\n\n------------------------------------\n### INPUT FORMAT\n1. URL: <insert_url_here>\n2. Sandbox Behavior Report (if any): <insert_behavior_report_here>\n3. HTML/JavaScript Extracted Code (optional): <insert_code_here>\n4. Network Calls Observed (optional): <insert_network_calls_here>\n\n------------------------------------\n### YOUR TASKS\n\n#### 1. Generate a **Risk Score (0–100)**\n- 0–20 → SAFE  \n- 21–50 → SUSPICIOUS  \n- 51–100 → MALICIOUS  \nThe score must be justified using your reasoning.\n\n#### 2. Give a **Final Verdict**\nChoose ONE of:\n- **SAFE**\n- **SUSPICIOUS**\n- **MALICIOUS**\n\n#### 3. Provide a **Clear, Human-Readable Summary**\nExplain:\n- Why the link might be dangerous  \n- What exact behaviors triggered concern  \n- What data it might steal (example: passwords, camera, clipboard, cookies)\n- Whether it tries redirection, downloads, or hidden scripts  \n\nMake it understandable for a **non-technical user**, like:\n“⚠️ This site tries to secretly redirect you to another domain and load unknown scripts. It may steal passwords.”\n\n#### 4. Provide an **Expert Technical Insight**\nExplain in technical terms for cybersecurity evaluators:\n- Pattern matches\n- Obfuscation check\n- Suspicious parameters\n- Heuristic flags\n- DNS/WHOIS anomalies\n- Script behavior anomalies\n
#### 5. Provide **Top 3 Reasons for the Risk Score**
\n------------------------------------\n### OUTPUT FORMAT (STRICT)\n\n{
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
------------------------------------\n\nFollow the output format exactly.
\nHere is the input:\nURL: {{{url}}}\nSandbox Behavior Report: {{{sandboxReport}}}\nExtracted Code: {{{extractedCode}}}\nNetwork Calls: {{{networkCalls}}}`, 
});

const summarizeSandboxReportFlow = ai.defineFlow(
  {
    name: 'summarizeSandboxReportFlow',
    inputSchema: SummarizeSandboxReportInputSchema,
    outputSchema: SummarizeSandboxReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
