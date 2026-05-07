import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { mockClaims } from './data';
import { Claim, WidgetFilterType } from './types';
import { Dashboard } from './components/Dashboard';
import { ClaimDetail } from './components/ClaimDetail';

export default function App() {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [activeFilter, setActiveFilter] = useState<WidgetFilterType>('ALL');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedClaim(null)}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Review Claims Decisions</h1>
              
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-300">
              <span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-2 animate-pulse"></span>
              System Online
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold border border-slate-600">
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {selectedClaim ? (
          <ClaimDetail 
            claim={selectedClaim} 
            onBack={() => setSelectedClaim(null)} 
          />
        ) : (
          <Dashboard 
            claims={mockClaims} 
            onClaimSelect={setSelectedClaim}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        )}
      </main>
    </div>
  );
}


