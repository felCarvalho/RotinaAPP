import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface footerType {
  github: IconProp;
  linkedin: IconProp;
}

export function Footer({ github, linkedin }: footerType) {
  return (
    <footer className="absolute right-0 left-0 flex items-center">
      <div className="flex flex-row items-center gap-5">
        <span aria-hidden="true">
          <FontAwesomeIcon icon={github} />
        </span>
        <span aria-hidden="true">
          <FontAwesomeIcon icon={linkedin} />
        </span>
      </div>
      <p className="text-blue-200">
        <small>Felipe Carvalho @2025</small>
      </p>
    </footer>
  );
}
