export interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  icon: string;

  keyPoints: {
    title: string;
    description: string;
    icon: string;
  }[];

  process: {
    step: number;
    title: string;
    description: string;
  }[];

  faq: {
    question: string;
    answer: string;
  }[];

  caseHighlight: {
    title: string;
    result: string;
    description: string;
    icon: string;
  }[];
}

export type ServiceType = 'alimony' | 'property' | 'custody' | 'adultery';
