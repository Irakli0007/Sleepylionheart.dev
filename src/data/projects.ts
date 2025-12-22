import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Example Project 1',
    description: 'A brief description of your first project. What problem did it solve?',
    longDescription: 'A more detailed description with technical challenges and solutions.',
    tags: ['React', 'TypeScript', 'Node.js'],
    image: '/projects/project1.jpg',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true,
    completedDate: '2024-01',
  },
  {
    id: '2',
    title: 'Example Project 2',
    description: 'A brief description of your second project.',
    tags: ['Python', 'Machine Learning', 'TensorFlow'],
    image: '/projects/project2.jpg',
    githubUrl: 'https://github.com/username/project2',
    featured: true,
    completedDate: '2024-03',
  },
  {
    id: '3',
    title: 'Example Project 3',
    description: 'A brief description of your third project.',
    tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    image: '/projects/project3.jpg',
    demoUrl: 'https://example3.com',
    featured: false,
    completedDate: '2024-06',
  },
];
