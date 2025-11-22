import { config } from 'dotenv';
config();

import '@/ai/flows/assess-risk-and-give-verdict.ts';
import '@/ai/flows/summarize-sandbox-report.ts';
import '@/ai/flows/provide-technical-insights.ts';
import '@/ai/flows/analyze-url-for-phishing.ts';
import '@/ai/flows/simulate-sandbox.ts';
