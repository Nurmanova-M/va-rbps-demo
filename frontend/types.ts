export interface Claim {
  Claim_ID: number;
  Claim_Date: string;
  Action_Requested: string;
  Vet_Name: string;
  Vet_SSN4: string;
  Vet_DOB: string;
  Vet_Phone: string;
  Vet_Email: string;
  Vet_Address: string;
  Disability_Rating: string;
  On_Pension: string;
  Prev_Marriages_Count: number;
  Divorce_Reported: string;
  Spouse_Name: string;
  Marriage_Date: string;
  Marriage_Type: string;
  Children_Count: number;
  Children_Details: string;
  Student_Count: number;
  Student_Details: string;
  Engine_Decision: 'process' | 'offramp' | 'manual_review';
  History_Decision: 'process' | 'offramp' | 'manual_review';
  Audit_Status: 'Accurate' | 'DISCREPANCY' | 'Pending';
  Rules_Broken: string;
  Discrepancy_Explanation: string;
}

export interface Rule {
  rule_id: string;
  description: string;
  use_case_ref: string;
  laws_regulations: string | null;
  action: string;
  category: string;
  source_models: string[];
  model_count: number;
}

export type WidgetFilterType = 'ALL' | 'FP' | 'FN';

export interface ColumnDef<T> {
  key: keyof T;
  header: string;
  render?: (val: any, item: T) => React.ReactNode;
  filterable?: boolean;
  filterType?: 'select' | 'date' | 'text';
  filterTokenize?: (val: any) => string[];
}
