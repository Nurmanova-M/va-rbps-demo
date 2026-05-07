import React, { useState, useEffect } from 'react';
import { Bot, Loader2, Lightbulb, ChevronRight } from 'lucide-react';
import { Claim } from '../types';
import { generateExplanation } from '../services/gemini';

interface Props {
  claim: Claim;
  onExplanationGenerated: (text: string) => void;
}

interface ExplanationData {
  confidenceScore: number;
  keyFindings: string[];
  detailedExplanation: string;
}

export function AgentExplanation({ claim, onExplanationGenerated }: Props) {
  const [data, setData] = useState<ExplanationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchExplanation = async () => {
      setLoading(true);
      const result = await generateExplanation(claim);
      
      if (isMounted) {
        try {
          // Clean up potential markdown formatting from the JSON string
          const cleanJson = result.replace(/```json\n?|```/g, '').trim();
          const parsed = JSON.parse(cleanJson) as ExplanationData;
          setData(parsed);
          onExplanationGenerated(cleanJson); // Pass the full JSON string to Agent 2
        } catch (e) {
          console.error("Failed to parse explanation JSON", e);
          setData({
            confidenceScore: 0,
            keyFindings: ["Failed to parse structured response."],
            detailedExplanation: result
          });
          onExplanationGenerated(result);
        }
        setLoading(false);
      }
    };

    fetchExplanation();

    return () => {
      isMounted = false;
    };
  }, [claim, onExplanationGenerated]);

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-amber-500';
    return 'text-red-600';
  };

  return (
    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-blue-200/60">
        <div className="bg-blue-600 p-1.5 rounded-md shadow-sm">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-blue-900 text-lg">Agent 1: Decision Explanation</h3>
        
        {data && !loading && data.confidenceScore !== undefined && (
          <div className="ml-auto flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-blue-200 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase">Confidence</span>
            <span className={`text-sm font-bold ${getConfidenceColor(data.confidenceScore)}`}>
              {data.confidenceScore}%
            </span>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="flex items-center gap-3 text-blue-600 py-6 justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm font-medium">Analyzing claim data and policies...</span>
        </div>
      ) : data ? (
        <div className="space-y-5">
          {/* Key Findings Section */}
          {data.keyFindings && data.keyFindings.length > 0 && (
            <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
              <h4 className="text-sm font-bold text-blue-800 flex items-center gap-2 mb-3 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Key Findings
              </h4>
              <ul className="space-y-2">
                {data.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Explanation Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Detailed Analysis</h4>
            <div className="prose prose-sm prose-blue max-w-none text-slate-700 whitespace-pre-wrap bg-white/50 p-4 rounded-lg border border-blue-100/50">
              {data.detailedExplanation}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

