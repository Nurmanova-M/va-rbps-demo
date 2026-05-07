import React, { useState, useCallback, useMemo } from 'react';
import { ArrowLeft, User, FileText, Users, Heart, AlertCircle, BookOpen, GraduationCap, ChevronDown } from 'lucide-react';
import { Claim } from '../types';
import { mockRules } from '../rules';
import { AgentExplanation } from './AgentExplanation';
import { AgentReflection } from './AgentReflection';

interface Props {
  claim: Claim;
  onBack: () => void;
}

// Helper to parse children details
const parseChildren = (details: string) => {
  if (!details || details === 'None') return [];
  return details.split('||').map(item => {
    const match = item.trim().match(/(.+?)\s*\((.+)\)/);
    if (match) {
      const name = match[1].trim();
      const attrs = match[2].split('|').map(a => a.trim());
      const type = attrs.find(a => !a.includes(':') && a.toLowerCase() !== 'disabled' && a.toLowerCase() !== 'not disabled') || '-';
      const dobAttr = attrs.find(a => a.startsWith('DOB:'));
      const dob = dobAttr ? dobAttr.replace('DOB:', '').trim() : '-';
      const ssnAttr = attrs.find(a => a.startsWith('SSN:'));
      const ssn = ssnAttr ? ssnAttr.replace('SSN:', '').trim() : '-';
      const disabled = attrs.find(a => a.toLowerCase() === 'disabled' || a.toLowerCase() === 'not disabled') || '-';
      return { name, type, dob, ssn, disabled };
    }
    return { name: item.trim(), type: '-', dob: '-', ssn: '-', disabled: '-' };
  });
};

// Helper to parse student details
const parseStudents = (details: string) => {
  if (!details || details === 'None') return [];
  return details.split('||').map(item => {
    const match = item.trim().match(/(.+?)\s*\((.+)\)/);
    if (match) {
      const name = match[1].trim();
      const attrs = match[2].split('|').map(a => a.trim());
      const school = attrs.find(a => !a.startsWith('Net Worth:')) || '-';
      const nwAttr = attrs.find(a => a.startsWith('Net Worth:'));
      const netWorth = nwAttr ? nwAttr.replace('Net Worth:', '').trim() : '-';
      return { name, school, netWorth };
    }
    return { name: item.trim(), school: '-', netWorth: '-' };
  });
};

export function ClaimDetail({ claim, onBack }: Props) {
  const [explanation, setExplanation] = useState<string>('');

  const handleExplanationGenerated = useCallback((text: string) => {
    setExplanation(text);
  }, []);

  // Helper to determine if sections should be shown based on Action_Requested
  const actionStr = claim.Action_Requested.toLowerCase();
  const showDependents = actionStr.includes('child') || claim.Children_Count > 0;
  const showMarriage = actionStr.includes('spouse') || claim.Prev_Marriages_Count > 0 || claim.Spouse_Name !== 'None';
  const showDivorce = claim.Divorce_Reported === 'Yes';
  const showStudents = actionStr.includes('674') || claim.Student_Count > 0;

  // Determine action tags for each section
  const childActions = useMemo(() => {
    const actions = [];
    if (actionStr.includes('add child') || actionStr.includes('disabled child')) actions.push('ADD');
    if (actionStr.includes('death') || actionStr.includes('not in household')) actions.push('REMOVE');
    return actions;
  }, [actionStr]);

  const studentActions = useMemo(() => {
    const actions = [];
    if (actionStr.includes('674')) actions.push('ADD');
    if (actionStr.includes('not attending school')) actions.push('REMOVE');
    return actions;
  }, [actionStr]);

  const spouseActions = useMemo(() => {
    const actions = [];
    if (actionStr.includes('add spouse')) actions.push('ADD');
    if (actionStr.includes('divorce') || actionStr.includes('death')) actions.push('REMOVE');
    return actions;
  }, [actionStr]);

  const renderActionTag = (type: 'ADD' | 'REMOVE') => (
    <span className={`ml-2 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full ${
      type === 'ADD' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
    }`}>
      {type === 'ADD' ? 'To Add' : 'To Remove'}
    </span>
  );

  // Find relevant rule definitions from both Rules_Broken and Discrepancy_Explanation
  const relevantRules = useMemo(() => {
    const textToSearch = `${claim.Rules_Broken || ''} ${claim.Discrepancy_Explanation || ''}`;
    const matches = textToSearch.match(/CP\s*\d+([.-]\d+)?[a-zA-Z]?/gi) || [];
    
    const normalize = (s: string) => s.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    const uniqueCodes = Array.from(new Set(matches.map(normalize)));

    if (uniqueCodes.length === 0) return [];

    const matchedRules: typeof mockRules = [];
    mockRules.forEach(r => {
      const ruleMatch = r.rule_id.match(/CP\s*\d+([.-]\d+)?[a-zA-Z]?/i);
      if (ruleMatch) {
        const ruleCode = normalize(ruleMatch[0]);
        // Match if the extracted code starts with the rule code, or vice versa
        if (uniqueCodes.some(code => code.startsWith(ruleCode) || ruleCode.startsWith(code))) {
          if (!matchedRules.some(existing => existing.rule_id === r.rule_id)) {
            matchedRules.push(r);
          }
        }
      }
    });

    return matchedRules;
  }, [claim.Rules_Broken, claim.Discrepancy_Explanation]);

  const parsedChildren = useMemo(() => parseChildren(claim.Children_Details), [claim.Children_Details]);
  const parsedStudents = useMemo(() => parseStudents(claim.Student_Details), [claim.Student_Details]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Claim #{claim.Claim_ID}</h1>
            <p className="text-sm text-slate-500">Submitted: {claim.Claim_Date}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Historical Decision</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-1 ${
              claim.History_Decision === 'process' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {claim.History_Decision.toUpperCase()}
            </span>
          </div>
          <div className="text-right border-l pl-3 border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Suggested Decision</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-1 ${
              claim.Engine_Decision === 'process' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {claim.Engine_Decision.toUpperCase()}
            </span>
          </div>
          <div className="text-right border-l pl-3 border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Audit Status</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-1 ${
              claim.Audit_Status === 'Accurate' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
            }`}>
              {claim.Audit_Status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Claim Data Section */}
      <div className="space-y-6">
        {/* Veteran Info */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-500" />
            <h2 className="font-semibold text-slate-800">Veteran Information</h2>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
            <div>
              <p className="text-slate-500 text-xs">Name</p>
              <p className="font-medium text-slate-900">{claim.Vet_Name}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">SSN (Last 4)</p>
              <p className="font-medium text-slate-900">***-**-{claim.Vet_SSN4}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">DOB</p>
              <p className="font-medium text-slate-900">{claim.Vet_DOB}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Phone</p>
              <p className="font-medium text-slate-900">{claim.Vet_Phone}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Disability Rating</p>
              <p className="font-medium text-slate-900">
                {claim.Disability_Rating}
                {claim.Disability_Rating !== 'N/A' && claim.Disability_Rating !== '' ? '%' : ''}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">On Pension</p>
              <p className="font-medium text-slate-900">{claim.On_Pension}</p>
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <p className="text-slate-500 text-xs">Address</p>
              <p className="font-medium text-slate-900">{claim.Vet_Address}</p>
            </div>
          </div>
        </section>
{/* Dependents (Children) Table */}
        {showDependents && (
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-500" />
                <h2 className="font-semibold text-slate-800 flex items-center">
                  Dependents (Children)
                  {childActions.includes('ADD') && renderActionTag('ADD')}
                  {childActions.includes('REMOVE') && renderActionTag('REMOVE')}
                </h2>
              </div>
              <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2 py-1 rounded-full">Count: {claim.Children_Count}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">DOB</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">SSN</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {parsedChildren.length > 0 ? parsedChildren.map((child, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">{child.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{child.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{child.dob}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{child.ssn}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                        <span className={`px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${child.disabled.toLowerCase() === 'disabled' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                          {child.disabled}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="px-4 py-4 text-center text-sm text-slate-500 italic">No child details provided.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Students Table */}
        {showStudents && (
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-500" />
                <h2 className="font-semibold text-slate-800 flex items-center">
                  Students (18-23)
                  {studentActions.includes('ADD') && renderActionTag('ADD')}
                  {studentActions.includes('REMOVE') && renderActionTag('REMOVE')}
                </h2>
              </div>
              <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2 py-1 rounded-full">Count: {claim.Student_Count}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">School</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Net Worth</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {parsedStudents.length > 0 ? parsedStudents.map((student, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">{student.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{student.school}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{student.netWorth}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={3} className="px-4 py-4 text-center text-sm text-slate-500 italic">No student details provided.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Marital History Table */}
        {(showMarriage || showDivorce) && (
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <Heart className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-slate-800 flex items-center">
                Marital History
                {spouseActions.includes('ADD') && renderActionTag('ADD')}
                {spouseActions.includes('REMOVE') && renderActionTag('REMOVE')}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Current Spouse</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Marriage Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Marriage Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Divorce Reported</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Previous Marriages</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">{claim.Spouse_Name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{claim.Marriage_Date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{claim.Marriage_Type}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                      <span className={`px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${claim.Divorce_Reported.startsWith('Yes') ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                        {claim.Divorce_Reported}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{claim.Prev_Marriages_Count}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
        {/* Action & Rules */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            <h2 className="font-semibold text-slate-800">Claim Details & Policies</h2>
          </div>
          <div className="p-4 space-y-4 text-sm">
            <div>
              <p className="text-slate-500 text-xs">Action Requested</p>
              <p className="font-medium text-slate-900">{claim.Action_Requested}</p>
            </div>

            {claim.Discrepancy_Explanation && claim.Audit_Status === 'DISCREPANCY' && (
              <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                <p className="text-amber-800 text-xs font-semibold mb-1">Discrepancy Note</p>
                <p className="text-amber-900">{claim.Discrepancy_Explanation}</p>
              </div>
            )}

            {relevantRules.length > 0 && (
              <div className="space-y-2 mt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Policy Definitions</p>
                {relevantRules.map((rule, idx) => (
                  <details key={idx} className="bg-white rounded border border-slate-200 text-sm shadow-sm group">
                    <summary className="font-semibold text-slate-800 flex items-center gap-1.5 p-3 cursor-pointer hover:bg-slate-50 list-none outline-none [&::-webkit-details-marker]:hidden">
                      <BookOpen className="w-4 h-4 text-slate-500" /> 
                      {rule.rule_id}
                      <ChevronDown className="w-4 h-4 ml-auto text-slate-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                      <p className="text-slate-600 leading-relaxed">
                        {rule.description}
                        {rule.use_case_ref && (
                          <>
                            <br />
                            <span className="font-medium text-slate-700">Use Case:</span> {rule.use_case_ref}
                          </>
                        )}
                        {rule.laws_regulations && (
                          <>
                            <br />
                            <span className="font-medium text-slate-700">Ref:</span> {rule.laws_regulations}
                          </>
                        )}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        </section>

        
      </div>

      {/* AI Agents Section - Moved Below Claim Details */}
      <div className="mt-10 pt-8 border-t-2 border-slate-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">AI Adjudication Analysis</h2>
          <p className="text-slate-500 text-sm mt-1">Automated explanation and hallucination audit of the suggested decision.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <AgentExplanation 
            claim={claim} 
            onExplanationGenerated={handleExplanationGenerated} 
          />
          
          <AgentReflection 
            claim={claim} 
            explanation={explanation} 
          />
        </div>
      </div>
    </div>
  );
}
