import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-aqua/50 transition-all duration-300 hover:transform hover:scale-105">
      <div className="aspect-video bg-gradient-to-br from-aqua-dark/10 to-blue-900/20 flex items-center justify-center">
        <div className="text-white/40 text-sm">Project Image</div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white/70 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-aqua/20 text-aqua-light rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-aqua hover:text-aqua-light transition-colors text-sm font-medium"
            >
              Live Demo →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-aqua transition-colors text-sm font-medium"
            >
              View Code →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
