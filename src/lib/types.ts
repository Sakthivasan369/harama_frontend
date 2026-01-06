export interface Collaborator {
  id: string;
  name: string;
  role: string;
  image: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  skills: { name: string; level: number }[];
  contributions: string[];
}

export interface FeedbackFormData {
  name: string;
  email: string;
  role: string;
  rating: number;
  message: string;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}
