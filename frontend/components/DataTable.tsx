import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Filter, Check, Search } from 'lucide-react';
import { ColumnDef } from '../types';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (item: T) => void;
  pageSize?: number;
}

// Helper to break down strings like "Add Spouse, Add Child" or "Rule1 | Rule2"
const tokenize = (val: any): string[] => {
  if (!val) return [];
  const str = String(val);
  return str.split(/,\s*|\s*\|\s*/).map(s => s.trim()).filter(Boolean);
};

export function DataTable<T extends Record<string, any>>({ 
  data, 
  columns, 
  onRowClick,
  pageSize = 10 
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract unique values for multiple-choice filters (skip date and text columns)
  const filterOptions = useMemo(() => {
    const options: Record<string, string[]> = {};
    columns.forEach(col => {
      if (col.filterable && col.filterType !== 'date' && col.filterType !== 'text') {
        const allTokens = data.flatMap(item => {
          if (col.filterTokenize) return col.filterTokenize(item[col.key]);
          return tokenize(item[col.key]);
        });
        options[col.key as string] = Array.from(new Set(allTokens)).sort();
      }
    });
    return options;
  }, [data, columns]);

  const handleFilterToggle = (key: string, value: string) => {
    setFilters(prev => {
      const current = prev[key] || [];
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      
      const newFilters = { ...prev, [key]: next };
      if (next.length === 0) {
        delete newFilters[key];
      }
      return newFilters;
    });
    setCurrentPage(1); // Reset to first page on filter
  };

  const handleDateRangeChange = (key: string, start: string, end: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (!start && !end) {
        delete newFilters[key];
      } else {
        newFilters[key] = [start, end];
      }
      return newFilters;
    });
    setCurrentPage(1);
  };

  const handleTextFilterChange = (key: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (!value) {
        delete newFilters[key];
      } else {
        newFilters[key] = [value];
      }
      return newFilters;
    });
    setCurrentPage(1);
  };

  const clearFilter = (key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, selectedValues]) => {
        if (!selectedValues || selectedValues.length === 0) return true;
        
        const col = columns.find(c => c.key === key);
        
        // Handle text search filtering
        if (col?.filterType === 'text') {
          const searchTerm = (selectedValues[0] || '').toLowerCase();
          const itemValue = String(item[key]).toLowerCase();
          return itemValue.includes(searchTerm);
        }

        // Handle date range filtering
        if (col?.filterType === 'date') {
          const itemDate = String(item[key]);
          const start = selectedValues[0] || '';
          const end = selectedValues[1] || '';
          
          if (start && itemDate < start) return false;
          if (end && itemDate > end) return false;
          return true;
        }

        // Handle multiple choice filtering
        const itemTokens = col?.filterTokenize 
          ? col.filterTokenize(item[key]) 
          : tokenize(item[key]);
          
        // OR logic within the same column: item must have at least one of the selected values
        return selectedValues.some(val => itemTokens.includes(val));
      });
    });
  }, [data, filters, columns]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-slate-200" ref={tableRef}>
      <div className="overflow-x-auto min-h-[300px]">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => {
                const isActive = filters[col.key as string]?.length > 0;
                return (
                  <th 
                    key={col.key as string}
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider relative"
                  >
                    <div className="flex items-center justify-between space-x-2">
                      <span>{col.header}</span>
                      {col.filterable && (
                        <div className="relative inline-block text-left">
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setOpenFilter(openFilter === col.key ? null : col.key as string); 
                            }}
                            className={`p-1 rounded hover:bg-slate-200 transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}
                            title="Filter"
                          >
                            {col.filterType === 'text' ? (
                              <Search className={`w-4 h-4 ${isActive ? 'text-blue-600' : ''}`} />
                            ) : (
                              <Filter className={`w-4 h-4 ${isActive ? 'fill-blue-100' : ''}`} />
                            )}
                          </button>
                          
                          {/* Filter Dropdown */}
                          {openFilter === col.key && (
                            <div 
                              className="absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none p-2 max-h-64 overflow-y-auto left-0 top-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                                <span className="text-xs font-semibold text-slate-700">Filter {col.header}</span>
                                {isActive && (
                                  <button 
                                    onClick={() => clearFilter(col.key as string)}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    Clear
                                  </button>
                                )}
                              </div>
                              
                              {col.filterType === 'text' ? (
                                <div className="p-2">
                                  <input 
                                    type="text" 
                                    placeholder={`Search ${col.header}...`}
                                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 text-slate-700"
                                    value={filters[col.key as string]?.[0] || ''}
                                    onChange={(e) => handleTextFilterChange(col.key as string, e.target.value)}
                                    autoFocus
                                  />
                                </div>
                              ) : col.filterType === 'date' ? (
                                <div className="p-2 space-y-3">
                                  <div>
                                    <label className="block text-xs text-slate-500 mb-1">From</label>
                                    <input 
                                      type="date" 
                                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 text-slate-700"
                                      value={filters[col.key as string]?.[0] || ''}
                                      onChange={(e) => handleDateRangeChange(col.key as string, e.target.value, filters[col.key as string]?.[1] || '')}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-slate-500 mb-1">To</label>
                                    <input 
                                      type="date" 
                                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 text-slate-700"
                                      value={filters[col.key as string]?.[1] || ''}
                                      onChange={(e) => handleDateRangeChange(col.key as string, filters[col.key as string]?.[0] || '', e.target.value)}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  {filterOptions[col.key as string]?.map(opt => {
                                    const isChecked = filters[col.key as string]?.includes(opt) || false;
                                    return (
                                      <label key={opt} className="flex items-start space-x-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group">
                                        <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-slate-300 group-hover:border-blue-400'}`}>
                                          {isChecked && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <input 
                                          type="checkbox" 
                                          className="hidden"
                                          checked={isChecked}
                                          onChange={() => handleFilterToggle(col.key as string, opt)}
                                        />
                                        <span className="text-sm text-slate-700 break-words leading-tight">{opt || '(Empty)'}</span>
                                      </label>
                                    );
                                  })}
                                  {filterOptions[col.key as string]?.length === 0 && (
                                    <div className="text-sm text-slate-500 p-2 text-center">No options</div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => (
                <tr 
                  key={idx} 
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`hover:bg-slate-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col) => (
                    <td key={col.key as string} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500 text-sm">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Filter className="w-8 h-8 text-slate-300" />
                    <p>No claims found matching the current filters.</p>
                    <button 
                      onClick={() => setFilters({})}
                      className="text-blue-600 hover:text-blue-800 font-medium mt-2"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, filteredData.length)}</span> of <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
