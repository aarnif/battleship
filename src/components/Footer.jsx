import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="p-2 w-full flex flex-col justify-around items-center bg-footer">
      <ul className="flex justify-center items-center">
        <li className="px-1">
          <h3 className="text-xl font-bold">Created By aarnif</h3>
        </li>
        <li className="px-1">
          <motion.div
            whileHover={{
              scale: 1.5,
              rotate: 360,
            }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="https://github.com/aarnif"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="w-6 h-6 fill-current" />
            </a>
          </motion.div>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;