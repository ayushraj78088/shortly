import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-6 py-4 text-sm md:grid-cols-3 md:px-10">
        {/* Left */}
        <div className="text-center md:text-left text-base-content/70">
          <p>Made with ❤️ by Ayush Raj</p>
          <p>© {new Date().getFullYear()} Shortly. All rights reserved.</p>
        </div>

        {/* Center */}
        <div className="text-center">
          <p className="font-medium text-base-content">
            Fast. Secure. Simple URL Shortening.
          </p>
        </div>

        {/* Right */}
        <div className="flex justify-center md:justify-end items-center gap-5 text-xl text-base-content/70">
          <a
            href="https://github.com/ayushraj78088"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-all duration-300 hover:text-blue-700 hover:-translate-y-1"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ayushraj78088/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-all duration-300 hover:text-blue-700 hover:-translate-y-1"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://ayushraj-dev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            className="transition-all duration-300 hover:text-blue-700 hover:-translate-y-1"
          >
            <FaGlobe />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
