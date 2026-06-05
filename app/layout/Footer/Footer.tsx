import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="flex flex-row items-center justify-center">
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-blue-400"
      >
        <span aria-hidden="true">
          <FontAwesomeIcon icon={faGithub} />
        </span>
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <span aria-hidden="true">
          <FontAwesomeIcon icon={faLinkedin} />
        </span>
      </a>
    </footer>
  );
}
