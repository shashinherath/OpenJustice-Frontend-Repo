export interface LegalTopic {
  id: string;
  title: string;
  description: string;
}

export interface LegalCitation {
  source: string;
  reference: string;
  confidence?: number;
}