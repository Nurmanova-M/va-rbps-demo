import React, { useState, useEffect } from 'react';
import { ShieldCheck, Loader2, AlertOctagon } from 'lucide-react';
import { Claim } from '../types';
import { generateReflection } from '../services/gemini';

interface Props {
  claim: Claim;
  explanation: string;
}

interface ReflectionData {
  status: string;
  confidenceScore: number;
  detailedJustification: string;
}

export function AgentReflection({ claim, explanation }: Props) {
  const [data, setData] = useState<ReflectionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchReflection = async () => {
      if (!explanation) return; // Wait for explanation to exist
      
      setLoading(true);
      const result = await generateReflection(claim, explanation);
      
      if (isMounted) {
        try {
          const cleanJson = result.replace(/```json\n?|```/g, '').trim();
          const parsed = JSON.parse(cleanJson) as ReflectionData;
          setData(parsed);
        } catch (e) {
          console.error("Failed to parse reflection JSON", e);
          setData({
            status: "Unknown",
            confidenceScore: 0,
            detailedJustification: result
          });
        }
        setLoading(false);
      }
    };

    fetchReflection();

    return () => {
      isMounted = false;
    };
  }, [claim, explanation]);

  if (!explanation && !loading) return null;

  const isWarning = data?.status !== 'Clear' && data?.status !== 'Unknown';
  
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-amber-500';
    return 'text-red-600';
  };

  return (
    <div className={`rounded-xl p-5 border shadow-sm h-full ${isWarning ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
      <div className={`flex items-center gap-2 mb-4 pb-3 border-b flex-wrap ${isWarning ? 'border-amber-200/60' : 'border-emerald-200/60'}`}>
        <div className={`p-1.5 rounded-md shadow-sm ${isWarning ? 'bg-amber-500' : 'bg-emerald-600'}`}>
          {isWarning ? <AlertOctagon className="w-5 h-5 text-white" /> : <ShieldCheck className="w-5 h-5 text-white" />}
        </div>
        <h3 className={`font-bold text-lg ${isWarning ? 'text-amber-900' : 'text-emerald-900'}`}>
          Agent 2: Hallucination & Logic Check
        </h3>
        
        {data && !loading && (
          <div className="ml-auto flex items-center gap-2">
            {data.status !== 'Clear' && (
              <div className={`flex items-center px-3 py-1 rounded-full text-sm font-bold border bg-white ${
                isWarning ? 'text-amber-800 border-amber-300' : 'text-emerald-800 border-emerald-300'
              }`}>
                {data.status}
              </div>
            )}
            
            {data.confidenceScore !== undefined && (
              <div className={`flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border shadow-sm ${isWarning ? 'border-amber-200' : 'border-emerald-200'}`}>
                <span className="text-xs font-bold text-slate-500 uppercase">Confidence</span>
                <span className={`text-sm font-bold ${getConfidenceColor(data.confidenceScore)}`}>
                  {data.confidenceScore}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {loading ? (
        <div className={`flex items-center gap-3 py-6 justify-center ${isWarning ? 'text-amber-600' : 'text-emerald-600'}`}>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm font-medium">Auditing Agent 1's explanation...</span>
        </div>
      ) : data ? (
        <div className="space-y-5">
          {/* Detailed Justification Section */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ml-1 ${isWarning ? 'text-amber-700/70' : 'text-emerald-700/70'}`}>
              Detailed Justification
            </h4>
            <div className={`prose prose-sm max-w-none whitespace-pre-wrap bg-white/50 p-4 rounded-lg border ${
              isWarning ? 'text-amber-900 border-amber-200/50' : 'text-emerald-900 border-emerald-200/50'
            }`}>
              {data.detailedJustification}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
