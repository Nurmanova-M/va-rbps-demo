import React, { useMemo } from 'react';
import { Claim, WidgetFilterType, ColumnDef } from '../types';
import { DataTable } from './DataTable';
import { Activity, AlertTriangle, CheckCircle, ShieldAlert, TrendingUp } from 'lucide-react';

interface DashboardProps {
  claims: Claim[];
  onClaimSelect: (claim: Claim) => void;
  activeFilter: WidgetFilterType;
  onFilterChange: (filter: WidgetFilterType) => void;
}

export function Dashboard({ claims, onClaimSelect, activeFilter, onFilterChange }: DashboardProps) {
  
  // Calculate metrics
  const metrics = useMemo(() => {
    const total = claims.length;
    const accurate = claims.filter(c => c.Audit_Status === 'Accurate').length;
    
    // Definitions for this dashboard:
    // False Positive: Suggested Decision flagged it (offramp), but History passed it (process)
    const falsePositives = claims.filter(c => c.Engine_Decision !== 'process' && c.History_Decision === 'process').length;
    
    // False Negative: Suggested Decision passed it (process), but History flagged it (offramp)
    const falseNegatives = claims.filter(c => c.Engine_Decision === 'process' && c.History_Decision !== 'process').length;

    return {
      confidence: total > 0 ? Math.round((accurate / total) * 100) : 0,
      falsePositives,
      falseNegatives,
      total
    };
  }, [claims]);

  // Calculate top discrepancy rules
  const topDiscrepancyRules = useMemo(() => {
    const counts: Record<string, number> = {};
    claims.filter(c => c.Audit_Status === 'DISCREPANCY').forEach(c => {
      if (!c.Rules_Broken) return;
      const rules = c.Rules_Broken.split('|').map(s => s.trim()).filter(Boolean);
      rules.forEach(r => {
        const match = r.match(/^([A-Z0-9.]+)/);
        const ruleId = match ? match[1] : r;
        counts[ruleId] = (counts[ruleId] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  }, [claims]);

  // Apply widget filters
  const filteredClaims = useMemo(() => {
    switch (activeFilter) {
      case 'FP':
        return claims.filter(c => c.Engine_Decision !== 'process' && c.History_Decision === 'process');
      case 'FN':
        return claims.filter(c => c.Engine_Decision === 'process' && c.History_Decision !== 'process');
      default:
        return claims;
    }
  }, [claims, activeFilter]);

  // Separate into Discrepancy and Accurate
  const discrepancyClaims = filteredClaims.filter(c => c.Audit_Status === 'DISCREPANCY');
  const accurateClaims = filteredClaims.filter(c => c.Audit_Status === 'Accurate');

  // Define columns
  const columns: ColumnDef<Claim>[] = [
    { key: 'Claim_ID', header: 'ID', filterable: true, filterType: 'text' },
    { key: 'Claim_Date', header: 'Date', filterable: true, filterType: 'date' },
    { key: 'Vet_Name', header: 'Veteran', filterable: true, filterType: 'text' },
    { 
      key: 'Action_Requested', 
      header: 'Action', 
      filterable: true,
      filterTokenize: (val) => {
        if (!val) return [];
        return String(val).split(',').map(s => s.trim()).filter(Boolean);
      }
    },
    { 
      key: 'History_Decision', 
      header: 'Historical Decision', 
      filterable: true,
      render: (val) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          val === 'process' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {val}
        </span>
      )
    },
    { 
      key: 'Engine_Decision', 
      header: 'Suggested Decision', 
      filterable: true,
      render: (val) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          val === 'process' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {val}
        </span>
      )
    },
    { 
      key: 'Audit_Status', 
      header: 'Audit', 
      filterable: true,
      render: (val) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          val === 'Accurate' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
        }`}>
          {val}
        </span>
      )
    },
    { 
      key: 'Rules_Broken', 
      header: 'Rule', 
      filterable: true,
      filterTokenize: (val) => {
        if (!val) return [];
        const rules = String(val).split('|').map(s => s.trim()).filter(Boolean);
        return rules.map(r => {
          const match = r.match(/^([A-Z0-9.]+)/);
          return match ? match[1] : r;
        });
      },
      render: (val) => {
        if (!val) return <span className="text-slate-400">-</span>;
        const rules = String(val).split('|').map(s => s.trim()).filter(Boolean);
        return (
          <div className="flex flex-wrap gap-1">
            {rules.map((r, i) => {
              const match = r.match(/^([A-Z0-9.]+)/);
              const display = match ? match[1] : r;
              return (
                <span key={i} className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-600">
                  {display}
                </span>
              );
            })}
          </div>
        );
      }
    },
  ];

  return (
    <div className="space-y-6">
      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div 
          className={`bg-white rounded-xl shadow-sm p-6 border-2 cursor-pointer transition-all ${activeFilter === 'ALL' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-slate-200'}`}
          onClick={() => onFilterChange('ALL')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Claims</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{metrics.total}</p>
            </div>
            <div className="p-3 bg-slate-100 rounded-lg">
              <Activity className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Overall Confidence</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{metrics.confidence}%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div 
          className={`bg-white rounded-xl shadow-sm p-6 border-2 cursor-pointer transition-all ${activeFilter === 'FP' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-transparent hover:border-slate-200'}`}
          onClick={() => onFilterChange('FP')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">False Positives</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">{metrics.falsePositives}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Suggested Decision flagged, History passed</p>
        </div>

        <div 
          className={`bg-white rounded-xl shadow-sm p-6 border-2 cursor-pointer transition-all ${activeFilter === 'FN' ? 'border-red-500 ring-2 ring-red-200' : 'border-transparent hover:border-slate-200'}`}
          onClick={() => onFilterChange('FN')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">False Negatives</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{metrics.falseNegatives}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Suggested Decision passed, History flagged</p>
        </div>

        {/* New Trends Widget */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-500">Discrepancy Trends</p>
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="space-y-2.5 flex-1">
            {topDiscrepancyRules.map(([rule, count]) => (
              <div key={rule} className="flex items-center justify-between text-sm">
                <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-xs border border-slate-200">{rule}</span>
                <span className="font-semibold text-slate-900 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">{count} cases</span>
              </div>
            ))}
            {topDiscrepancyRules.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <span className="text-xs text-slate-400 italic">No discrepancies found.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              Claims with Discrepancies
            </h2>
            <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{discrepancyClaims.length} items</span>
          </div>
          <DataTable 
            data={discrepancyClaims} 
            columns={columns} 
            onRowClick={onClaimSelect}
            pageSize={10}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Accurate Claims
            </h2>
            <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{accurateClaims.length} items</span>
          </div>
          <DataTable 
            data={accurateClaims} 
            columns={columns} 
            onRowClick={onClaimSelect}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
}
