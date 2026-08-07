export type Project = {
  order: number;
  isOnHome: boolean;
  slug: string;
  title: string;
  category: string;
  homeTitle: string;
  homeIconPath: string;
  homeIconBg: string;
  homeDescription: string;
  homeCategory: string;
  homeTags: string[];
  descriptionMarkdown: string;
  stack: string;
  demoAccessHTML: string;
  caseSlug?: string;
  screenshots: {
    src: string;
    alt: string;
  }[];
};

export type CaseSystemNode = {
  id: string;
  title: string;
  role: string;
  description: string;
  projectSlug?: string;
};

export type CaseSystemEdge = {
  from: string;
  to: string;
  label: string;
};

export type Case = {
  order: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  challengeMarkdown: string;
  resultMarkdown: string;
  systemNodes: CaseSystemNode[];
  systemEdges: CaseSystemEdge[];
  projectSlugs: string[];
};
