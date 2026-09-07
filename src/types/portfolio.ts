export type PortfolioImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  kind: "screenshot" | "promo";
};

export type PortfolioWork = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  context: string;
  status?: string;
  images: PortfolioImage[];
  href?: string;
  features: string[];
};
