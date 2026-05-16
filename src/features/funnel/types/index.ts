export type ProjectType = 'landing' | 'ecommerce' | 'webapp' | 'not_sure' | 'other';

export type FunnelState = {
  currentStep: number;
  projectType: ProjectType | null;
  answers: Record<string, any>;
  contact: {
    name: string;
    email: string;
    phone?: string;
    businessName: string;
  };
};

export type VisualStyle = {
  id: string;
  name: string;
  description: string;
  colors: string[];
  font: string;
};
