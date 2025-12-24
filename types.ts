
export type Category = 'Strategy' | 'Data' | 'Design' | 'Delivery';
export type MaturityLevel = 'Adopt' | 'Trial' | 'Assess' | 'Experimental';

export interface CompetencyTerm {
  id: string;
  name: string;
  category: Category;
  description: string;
  impact: string;
  maturity: MaturityLevel;
  details?: string;
  keyTech?: string;
  deepDive?: string;
}

export interface CompetencyData {
  glossary: CompetencyTerm[];
}

export interface RadarItem extends CompetencyTerm {
  x: number;
  y: number;
}

/** 
 * Added to fix errors in MatrixSection and CategoryDetailView 
 */
export interface CompetencyCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  quadrant: Category;
  items: CompetencyTerm[];
}

/** 
 * Added to fix error in ProcessView 
 */
export interface ProcessStep {
  id: string;
  label: string;
  description: string;
  icon: string;
  tools: string[];
}
