export interface Tool {
  id: string;
  name: string;
  description?: string;
  desc?: string;
  url: string;
  category: string;
  categoryIcon?: string;
  tags?: string[];
  github?: string;
  githubUrl?: string;
  license?: string;
  stars?: number | string;
  icon?: string;
  featured?: boolean;
  addedAt?: string;
  section?: string;
}

export interface Category {
  title: string;
  icon: string;
  slug: string;
  tools: Tool[];
  filteredTools?: Tool[];
  matchesCategory?: boolean;
}
