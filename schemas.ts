import {z} from 'genkit';

// Schemas for analyze-url-for-phishing
export const AnalyzeURLInputSchema = z.object({
  url: z.string().describe('The URL to analyze.'),
  sandboxReport: z.string().optional().describe('Optional sandbox behavior report.'),
  extractedCode: z.string().optional().describe('Optional extracted HTML/JavaScript code.'),
  networkCalls: z.string().optional().describe('Optional network calls observed.'),
});
export type AnalyzeURLInput = z.infer<typeof AnalyzeURLInputSchema>;

export const AnalyzeURLOutputSchema = z.object({
  risk_score: z.number().int().min(0).max(100).describe('The risk score (0-100).'),
  verdict: z.enum(['SAFE', 'SUSPICIOUS', 'MALICIOUS']).describe('The verdict (SAFE, SUSPICIOUS, or MALICIOUS).'),
  user_friendly_summary: z.string().describe('A human-readable summary of potential threats.'),
  technical_insight: z.string().describe('Technical details of detected threats for cybersecurity experts.'),
  top_reasons: z.array(z.string()).describe('Top 3 reasons contributing to the risk score.'),
});
export type AnalyzeURLOutput = z.infer<typeof AnalyzeURLOutputSchema>;


// Schemas for assess-risk-and-give-verdict
export const AssessRiskAndGiveVerdictInputSchema = z.object({
  url: z.string().describe('The URL to analyze.'),
  sandboxReport: z.string().optional().describe('Sandbox behavior report (if any).'),
  extractedCode: z.string().optional().describe('Extracted HTML/JavaScript code (optional).'),
  networkCalls: z.string().optional().describe('Observed network calls (optional).'),
});
export type AssessRiskAndGiveVerdictInput = z.infer<
  typeof AssessRiskAndGiveVerdictInputSchema
>;

export const AssessRiskAndGiveVerdictOutputSchema = z.object({
  risk_score: z.number().int().min(0).max(100).describe('Risk score between 0 and 100.'),
  verdict: z
    .enum(['SAFE', 'SUSPICIOUS', 'MALICIOUS'])
    .describe('Verdict based on the risk score.'),
  user_friendly_summary: z.string().describe('Human-readable summary of potential threats.'),
  technical_insight: z.string().describe('Technical details of detected threats.'),
  top_reasons: z.array(z.string()).describe('Top reasons contributing to the risk score.'),
});
export type AssessRiskAndGiveVerdictOutput = z.infer<
  typeof AssessRiskAndGiveVerdictOutputSchema
>;


// Schemas for provide-technical-insights
export const ProvideTechnicalInsightsInputSchema = z.object({
  url: z.string().describe('The URL to analyze.'),
  sandboxReport: z.string().optional().describe('The sandbox behavior report (if any).'),
  extractedCode: z.string().optional().describe('The extracted HTML/JavaScript code (optional).'),
  networkCalls: z.string().optional().describe('The network calls observed (optional).'),
});
export type ProvideTechnicalInsightsInput = z.infer<typeof ProvideTechnicalInsightsInputSchema>;

export const ProvideTechnicalInsightsOutputSchema = z.object({
  riskScore: z.number().describe('The risk score (0-100).'),
  verdict: z.enum(['SAFE', 'SUSPICIOUS', 'MALICIOUS']).describe('The final verdict.'),
  userFriendlySummary: z.string().describe('A clear, human-readable summary of the potential threats.'),
  technicalInsight: z.string().describe('Technical details of detected threats for cybersecurity experts.'),
  topReasons: z.array(z.string()).describe('Top 3 reasons for the risk score.'),
});
export type ProvideTechnicalInsightsOutput = z.infer<typeof ProvideTechnicalInsightsOutputSchema>;


// Schemas for simulate-sandbox
export const SimulateSandboxInputSchema = z.object({
  url: z.string().url().describe('The URL to simulate in the sandbox.'),
});
export type SimulateSandboxInput = z.infer<typeof SimulateSandboxInputSchema>;

const SandboxEventSchema = z.object({
  title: z.string().describe('A short, descriptive title for the event.'),
  description: z.string().describe('A one-sentence, easy-to-understand explanation of what happened.'),
  timestamp: z.string().describe('A realistic time for the event.'),
});

export const SimulateSandboxOutputSchema = z.object({
  timeline: z.array(SandboxEventSchema).describe('A timeline of events from the sandbox simulation.'),
});
export type SimulateSandboxOutput = z.infer<typeof SimulateSandboxOutputSchema>;


// Schemas for summarize-sandbox-report
export const SummarizeSandboxReportInputSchema = z.object({
  url: z.string().describe('The URL to analyze.'),
  sandboxReport: z.string().describe('The sandbox behavior report (if any).'),
  extractedCode: z.string().optional().describe('Extracted HTML/JavaScript code (optional).'),
  networkCalls: z.string().optional().describe('Observed network calls (optional).'),
});
export type SummarizeSandboxReportInput = z.infer<typeof SummarizeSandboxReportInputSchema>;

export const SummarizeSandboxReportOutputSchema = z.object({
  risk_score: z.number().int().min(0).max(100).describe('The risk score (0-100).'),
  verdict: z.enum(['SAFE', 'SUSPICIOUS', 'MALICIOUS']).describe('The final verdict.'),
  user_friendly_summary: z.string().describe('A clear, human-readable summary of the potential threats.'),
  technical_insight: z.string().describe('Technical details of detected threats for cybersecurity experts.'),
  top_reasons: z.array(z.string()).length(3).describe('Top 3 reasons for the risk score.'),
});
export type SummarizeSandboxReportOutput = z.infer<typeof SummarizeSandboxReportOutputSchema>;
