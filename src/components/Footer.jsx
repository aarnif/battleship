import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-2 w-full flex flex-col justify-around items-center bg-footer shadow-xl">
      <ul className="flex justify-center items-center">
        <li className="px-1">
          <h3 className="text-xl font-bold">Created By aarnif</h3>
        </li>
        <li className="px-1">
          <div className="hover:animate-rotate-and-scale">
            <a
              href="https://github.com/aarnif"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="w-6 h-6 fill-current" />
            </a>
          </div>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
