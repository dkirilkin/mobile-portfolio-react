export type Project = {
  slug: string;
  title: string;
  category: string;
  descriptionMarkdown: string;
  stack: string;
  demoAccessHTML: string;
  screenshots: {
    src: string;
    alt: string;
  }[];
};
