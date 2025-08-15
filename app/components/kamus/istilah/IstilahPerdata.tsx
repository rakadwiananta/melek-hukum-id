// Temporary minimal file to fix build errors
export const istilahPerdataData = {
  categories: [],
  terms: []
};

export type LegalTermCategory = "kontrak" 
  | "properti" 
  | "keluarga" 
  | "waris" 
  | "perbuatan-melawan-hukum" 
  | "perikatan" 
  | "benda" 
  | "perusahaan" 
  | "properti-intelektual" 
  | "pembuktian" 
  | "umum";

export interface LegalTerm {
  id: number;
  term: string;
  category: LegalTermCategory;
  definition: string;
  example: string;
  legalBasis: string;
  englishTerm: string;
  relatedTerms: string[];
  trending?: boolean;
}

export const searchLegalTerms = (searchTerm: string): LegalTerm[] => {
  return [];
};

export const getLegalTermsByCategory = (category: LegalTermCategory): LegalTerm[] => {
  return [];
};

export const getTrendingLegalTerms = (): LegalTerm[] => {
  return [];
};

export const getLegalTermById = (id: number): LegalTerm | undefined => {
  return undefined;
};

export default function IstilahPerdataComponent() {
  return <div>Loading...</div>;
}