import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => (
  <>
    <Navbar />
    <main className="container mx-auto px-4 pt-24 min-h-[70vh] text-white">
      <section className="mb-16">
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          About Obsidian Ink Flow
        </h1>
        <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
          Obsidian Ink Flow is a next-generation tech blog designed for developers, creators, and tech enthusiasts. Whether you're exploring programming, DevOps, AI, or cybersecurity, we offer high-quality content built to inform and inspire.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4 text-cyan-300">Meet the Creator</h2>
        <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
          I'm <strong>H.M. Thushara Navod</strong>, a software engineering undergraduate from the University of Sabaragamuwa, Sri Lanka. I specialize in DevOps, cloud technologies, and full-stack development. My current mission is to become a top-tier Cloud and DevOps Engineer within one year.
        </p>
        <p className="text-white/70 mt-4 text-lg max-w-3xl">
          Through continuous hands-on learning and open-source contributions, I build scalable systems, CI/CD pipelines, and cloud-native apps while documenting everything to help others grow.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">What You Can Expect</h2>
        <ul className="list-disc pl-6 text-white/80 space-y-2">
          <li>In-depth tutorials on DevOps and cloud tools like AWS, Docker, and Kubernetes</li>
          <li>Insights on building production-ready pipelines and infrastructure</li>
          <li>Reflections and case studies from real-world projects</li>
          <li>Guidance on growing as a software engineer, both technically and mentally</li>
        </ul>
      </section>
    </main>
    <Footer />
  </>
);

export default About;
