import React, { useState, useMemo } from 'react';
import { Claim, WidgetFilterType, ColumnDef } from '../types';
import { DataTable } from './DataTable';
import { Activity, AlertTriangle, CheckCircle, ShieldAlert, TrendingUp, LayoutDashboard, LineChart } from 'lucide-react';

interface DashboardProps {
  claims: Claim[];
  onClaimSelect: (claim: Claim) => void;
  activeFilter: WidgetFilterType;
  onFilterChange: (filter: WidgetFilterType) => void;
}

export function Dashboard({ claims, onClaimSelect, activeFilter, onFilterChange }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends'>('overview');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedRuleFilter, setSelectedRuleFilter] = useState<string | null>(null);
  
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

  // All unique rules for the filter dropdown
  const allUniqueRules = useMemo(() => {
    const rules = new Set<string>();
    claims.filter(c => c.Audit_Status === 'DISCREPANCY').forEach(c => {
      if (!c.Rules_Broken) return;
      c.Rules_Broken.split('|').map(s => s.trim()).filter(Boolean).forEach(r => {
        const match = r.match(/^([A-Z0-9.]+)/);
        rules.add(match ? match[1] : r);
      });
    });
    return Array.from(rules).sort();
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
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [claims]);

  // Calculate trend data for the chart
  const trendData = useMemo(() => {
    const dataByDate: Record<string, { date: string; discrepancies: number }> = {};
    
    // Initialize all dates to 0 to ensure continuous timeline
    const allDates = Array.from(new Set(claims.map(c => c.Claim_Date))).sort();
    allDates.forEach(d => {
      dataByDate[d] = { date: d, discrepancies: 0 };
    });

    claims.forEach(c => {
      if (c.Audit_Status === 'DISCREPANCY') {
        let matchesRule = true;
        if (selectedRuleFilter) {
           const rules = (c.Rules_Broken || '').split('|').map(s => s.trim());
           matchesRule = rules.some(r => r.startsWith(selectedRuleFilter));
        }
        if (matchesRule) {
          dataByDate[c.Claim_Date].discrepancies += 1;
        }
      }
    });

    return Object.values(dataByDate).sort((a, b) => a.date.localeCompare(b.date));
  }, [claims, selectedRuleFilter]);

  // Calculate max value for the custom chart scaling
  const maxChartValue = useMemo(() => {
    if (trendData.length === 0) return 1;
    return Math.max(...trendData.map(d => d.discrepancies), 1);
  }, [trendData]);

  // Apply widget filters for Overview tab
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

  // Separate into Discrepancy and Accurate for Overview tab
  const discrepancyClaims = filteredClaims.filter(c => c.Audit_Status === 'DISCREPANCY');
  const accurateClaims = filteredClaims.filter(c => c.Audit_Status === 'Accurate');

  // Filtered table data for Trends tab
  const trendsTableData = useMemo(() => {
    let data = claims.filter(c => c.Audit_Status === 'DISCREPANCY');
    if (selectedDate) {
      data = data.filter(c => c.Claim_Date === selectedDate);
    }
    if (selectedRuleFilter) {
      data = data.filter(c => {
        const rules = (c.Rules_Broken || '').split('|').map(s => s.trim());
        return rules.some(r => r.startsWith(selectedRuleFilter));
      });
    }
    return data;
  }, [claims, selectedDate, selectedRuleFilter]);

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
      {/* Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`${
              activeTab === 'trends'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
          >
            <LineChart className="w-4 h-4" />
            Discrepancy Trends
          </button>
        </nav>
      </div>

      {/* Tab Content: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      )}

      {/* Tab Content: Trends */}
      {activeTab === 'trends' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Discrepancies Over Time</h3>
                  <p className="text-sm text-slate-500">Click on a bar to filter claims by date.</p>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    className="text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedRuleFilter || ''}
                    onChange={(e) => setSelectedRuleFilter(e.target.value || null)}
                  >
                    <option value="">All Rules</option>
                    {allUniqueRules.map(rule => (
                      <option key={rule} value={rule}>{rule}</option>
                    ))}
                  </select>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              
              {/* Custom Bar Chart with Trend Line */}
              <div className="h-[350px] w-full flex flex-col">
                <div className="flex-1 relative flex items-end justify-around gap-2 pt-10 mb-8 border-b border-slate-200">
                  {/* Y-axis lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[1, 0.75, 0.5, 0.25, 0].map(tick => (
                      <div key={tick} className="w-full border-t border-slate-100 border-dashed flex items-start">
                        <span className="text-[10px] text-slate-400 -mt-2 bg-white pr-2">
                          {Math.round(maxChartValue * tick)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Trend Line (SVG) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20">
                    {trendData.map((d, i) => {
                      const x = `${(i + 0.5) / trendData.length * 100}%`;
                      const y = `${100 - (d.discrepancies / maxChartValue) * 100}%`;
                      
                      const next = trendData[i + 1];
                      const nextX = next ? `${(i + 1.5) / trendData.length * 100}%` : null;
                      const nextY = next ? `${100 - (next.discrepancies / maxChartValue) * 100}%` : null;

                      return (
                        <g key={`line-${i}`}>
                          {next && (
                            <line x1={x} y1={y} x2={nextX} y2={nextY} stroke="#3b82f6" strokeWidth="2" />
                          )}
                          <circle cx={x} cy={y} r="4" fill="#3b82f6" className="transition-all duration-300" />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Bars */}
                  {trendData.map((data, idx) => (
                    <div 
                      key={idx} 
                      className="relative flex flex-col items-center group cursor-pointer h-full justify-end z-10 w-full max-w-[60px]"
                      onClick={() => setSelectedDate(data.date)}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs rounded p-2 whitespace-nowrap z-30 pointer-events-none shadow-lg">
                        <p className="font-bold mb-1">{data.date}</p>
                        <p className="text-amber-400">Discrepancies: {data.discrepancies}</p>
                      </div>

                      {/* Bar Group */}
                      <div className="flex items-end gap-1 w-full h-full justify-center">
                        <div 
                          className="w-full bg-amber-500/80 rounded-t-sm hover:bg-amber-400 transition-colors"
                          style={{ height: `${(data.discrepancies / maxChartValue) * 100}%`, minHeight: data.discrepancies > 0 ? '4px' : '0' }}
                        />
                      </div>

                      {/* X-axis label */}
                      <span className="absolute -bottom-6 text-[10px] text-slate-500 whitespace-nowrap">
                        {data.date.split('-').slice(1).join('/')}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="flex justify-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <span className="text-xs text-slate-600">Discrepancies (Bar)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-slate-600">Trend (Line)</span>
                  </div>
                </div>
              </div>

              {selectedDate && (
                <div className="mt-6 flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100 animate-in fade-in">
                  <span className="text-sm text-blue-800">
                    Filtering claims for <strong>{selectedDate}</strong>
                  </span>
                  <button 
                    onClick={() => setSelectedDate(null)} 
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider px-3 py-1.5 bg-white rounded shadow-sm border border-blue-200 transition-colors"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
            
            {/* Top Rules List */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Top Broken Rules</h3>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              
              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {topDiscrepancyRules.map(([rule, count], index) => (
                  <div key={rule} className="flex items-start justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-start gap-3 pr-4">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-500 shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div>
                        <span className="inline-block font-mono text-slate-800 font-semibold text-sm mb-1">{rule}</span>
                        <p className="text-xs text-slate-500 line-clamp-2" title={rule}>
                          {/* Extract description if possible, otherwise just show rule */}
                          {claims.find(c => c.Rules_Broken?.includes(rule))?.Rules_Broken || 'Rule description unavailable'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md text-xs whitespace-nowrap">
                        {count} cases
                      </span>
                    </div>
                  </div>
                ))}
                {topDiscrepancyRules.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 py-10">
                    <CheckCircle className="w-8 h-8 text-slate-300" />
                    <p className="text-sm italic">No broken rules found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filtered Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                {selectedDate ? `Discrepancy Claims on ${selectedDate}` : 'All Discrepancy Claims'}
                {selectedRuleFilter && <span className="ml-2 text-sm font-normal text-slate-500">(Filtered by {selectedRuleFilter})</span>}
              </h3>
              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                {trendsTableData.length} items
              </span>
            </div>
            <DataTable 
              data={trendsTableData} 
              columns={columns} 
              onRowClick={onClaimSelect}
              pageSize={5}
            />
          </div>
        </div>
      )}
    </div>
  );
}
