import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Squares',
    description: 'A beautiful scene filled with varying colors of squares that continuously fall',
    longDescription: '',
    tags: ['Java'],
    image: '',
    videoUrl: `${import.meta.env.BASE_URL}assets/Java_Squares.mp4`,
    demoUrl: '',
    githubUrl: 'https://github.com/Irakli0007/Squares',
    featured: true,
    completedDate: '2016',
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
