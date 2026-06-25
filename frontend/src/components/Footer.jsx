import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:px-10 py-4 text-sm md:flex-row">
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
        <div className="flex items-center gap-5 text-xl text-base-content/70">
          <a
            href="https://github.com/ayushraj78088"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors duration-200 hover:text-primary"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/ayushraj78088/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors duration-200 hover:text-primary"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://ayushraj-dev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            className="transition-colors duration-200 hover:text-primary"
          >
            <FaGlobe />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;