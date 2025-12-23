export type AnimationPhase = 'lightspeed' | 'deceleration' | 'idle';

export interface StarLayerConfig {
  count: number;
  depth: number;
  size: number;
  speed: number;
  parallax: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  images?: string[];
  videoUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedDate: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  proficiency: 1 | 2 | 3 | 4 | 5;
  icon?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
