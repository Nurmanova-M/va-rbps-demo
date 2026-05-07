


import { GoogleGenAI, Type } from '@google/genai';
import { Claim } from '../types';
import { mockRules } from '../rules';

// Initialize the SDK. It expects process.env.API_KEY to be available in the environment.
// Initialize the SDK strictly using process.env.API_KEY so the environment bundler can inject it.
// For this browser-based demo environment, we simulate it if not present, 
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
// but in a real app, this must be securely provided.
const apiKey = (window as any).process?.env?.API_KEY || 'dummy-key-for-ui-testing';

let ai: GoogleGenAI | null = null;
try {
  ai = new GoogleGenAI({ apiKey: apiKey, vertexai: true });
} catch (e) {
  console.warn("Failed to initialize GoogleGenAI. Ensure API_KEY is set.", e);
}

// In-memory caches to store findings and prevent redundant API calls
const explanationCache = new Map<number, string>();
const reflectionCache = new Map<number, string>();

// Helper to extract rule ID and find the corresponding rule definition
const getRelevantRuleContext = (claim: Claim) => {
  const textToSearch = `${claim.Rules_Broken || ''} ${claim.Discrepancy_Explanation || ''}`;
  const matches = textToSearch.match(/CP\s*\d+([.-]\d+)?[a-zA-Z]?/gi) || [];
  
  const normalize = (s: string) => s.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  const uniqueCodes = Array.from(new Set(matches.map(normalize)));

  if (uniqueCodes.length === 0) return '';


  const matchedRules: typeof mockRules = [];
  mockRules.forEach(r => {
    const ruleMatch = r.rule_id.match(/CP\s*\d+([.-]\d+)?[a-zA-Z]?/i);
    if (ruleMatch) {
      const ruleCode = normalize(ruleMatch[0]);
      if (uniqueCodes.some(code => code.startsWith(ruleCode) || ruleCode.startsWith(code))) {
        if (!matchedRules.some(existing => existing.rule_id === r.rule_id)) {
          matchedRules.push(r);
        }
      }
    }
  });
  
  if (matchedRules.length === 0) return '';
  
  return `\nRelevant Rule Definitions:\n${JSON.stringify(matchedRules, null, 2)}\n`;
};

export const generateExplanation = async (claim: Claim): Promise<string> => {
  // Check cache first
  if (explanationCache.has(claim.Claim_ID)) {
    return explanationCache.get(claim.Claim_ID)!;
  }
if (!ai) return JSON.stringify({ confidenceScore: 0, keyFindings: ["AI Service unavailable."], detailedExplanation: "Please check API key configuration." });
  const ruleContext = getRelevantRuleContext(claim);

  const prompt = `
    You are an expert VA (Veterans Affairs) claims adjudicator assistant.
    Review the following claim data and explain the automated suggested decision.
    
    Focus specifically on explaining why the system made the decision it did ('${claim.Engine_Decision}'), 
    detailing any rules that were broken ('${claim.Rules_Broken}'), and clarifying the discrepancy explanation ('${claim.Discrepancy_Explanation}').
    
    ${ruleContext ? `\nUse the following rule definition to explain the system's behavior:\n${ruleContext}` : ''}
    
    Instructions:
    1. Use clear, human-readable variable names (e.g., use "Veteran's Name" instead of "Vet_Name").
    2. Be highly specific but ULTRA-CONCISE. Explicitly connect the data points in the claim to the conditions of the broken rules.
    3. Provide a confidence score (0-100) indicating how confident you are that the suggested decision is correct based on the rules and data.
    4. Keep the detailed explanation to a maximum of 2 to 3 short sentences.
    5. Keep each key finding strictly under 10 words.
    
    Claim Data:
    ${JSON.stringify(claim, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: prompt }],
      },
      config: {
        systemInstruction: 'You are a helpful, accurate, and concise assistant for VA claims adjudicators.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            confidenceScore: {
              type: Type.INTEGER,
              description: "Confidence percentage (0-100) that the suggested decision is correct."
            },
            keyFindings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 to 3 ultra-concise bullet points (maximum 10 words each) summarizing the most critical factors."
            },
            detailedExplanation: {
              type: Type.STRING,
              description: "A brief, 2-3 sentence explanation of the decision."
            }
          },
          required: ["confidenceScore", "keyFindings", "detailedExplanation"]
        }
      }
    });
    
    const resultText = response.text || "{}";
    // Save to cache
    explanationCache.set(claim.Claim_ID, resultText);
    return resultText;
    
  } catch (error) {
    console.error("Error generating explanation:", error);
    return JSON.stringify({ confidenceScore: 0, keyFindings: ["Error generating explanation."], detailedExplanation: "Please try again later." });
  }
};

export const generateReflection = async (claim: Claim, explanationJson: string): Promise<string> => {
  // Check cache first
  if (reflectionCache.has(claim.Claim_ID)) {
    return reflectionCache.get(claim.Claim_ID)!;
  }
  if (!ai) return JSON.stringify({ confidenceScore: 0, keyFindings: ["AI Service unavailable."], detailedExplanation: "Please check API key configuration." });

  const ruleContext = getRelevantRuleContext(claim);

  const prompt = `
    You are a strict QA Auditor for VA claims. Your job is to review an explanation provided by another AI agent and check it for hallucinations or logical errors based STRICTLY on the provided Claim Data and Rule Definitions.
    
    Claim Data:
    ${JSON.stringify(claim, null, 2)}
    ${ruleContext}

    Agent 1 Explanation (JSON format):
    ${explanationJson}

    Task:
    1. Did Agent 1 state any facts not present in the Claim Data or Rule Definitions? (Hallucination check)
    2. Is Agent 1's reasoning logically sound based on the Suggested Decision and Rules Broken?
    3. Provide a confidence score (0-100) indicating how confident you are that Agent 1's explanation is accurate and free of hallucinations.
    
    Instructions:
    - Use clear, human-readable variable names.
    - Provide a highly clear and specific justification in a maximum of 2 sentences.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: prompt }],
      },
      config: {
        systemInstruction: 'You are a strict, objective, and brief auditor checking for factual accuracy against provided data.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: {
              type: Type.STRING,
              description: "Must be exactly one of: 'Clear', 'Hallucination Detected', or 'Logical Error'"
            },
            confidenceScore: {
              type: Type.INTEGER,
              description: "Confidence percentage (0-100) that Agent 1's explanation is accurate and free of hallucinations."
            },
            detailedJustification: {
              type: Type.STRING,
              description: "A brief, 1-2 sentence justification of the audit."
            }
          },
          required: ["status", "confidenceScore", "detailedJustification"]
        }
      }
    });
    
    const resultText = response.text || "{}";
    // Save to cache
    reflectionCache.set(claim.Claim_ID, resultText);
    return resultText;
    
  } catch (error) {
    console.error("Error generating reflection:", error);
    return JSON.stringify({ status: "Logical Error", confidenceScore: 0, detailedJustification: "Please try again later." });
  }
};
