import { motion } from 'framer-motion';

export const About = () => {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python',
    'Three.js', 'Tailwind CSS', 'Git', 'PostgreSQL'
  ];

  return (
    <section id="about" className="relative h-screen flex items-center justify-center px-4 snap-start">
      <div className="w-[28rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Hello!</h3>
            <p className="text-white/70 mb-4 leading-relaxed">
              I'm a passionate full-stack developer with a love for creating beautiful,
              functional, and user-friendly applications. With expertise in modern web
              technologies, I bring ideas to life through code.
            </p>
            <p className="text-white/70 mb-6 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or working on creative side projects
              that push the boundaries of what's possible on the web.
            </p>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center px-6 py-3 bg-aqua hover:bg-aqua-dark text-black rounded-lg font-medium transition-colors shadow-lg shadow-aqua/50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Skills & Technologies</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:border-aqua/50 transition-colors"
                >
                  <span className="text-white font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
