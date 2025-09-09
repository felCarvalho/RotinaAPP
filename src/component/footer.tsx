import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface footerType {
  github: IconProp;
  linkedin: IconProp;
}

export function Footer({ github, linkedin }: footerType) {
  return (
    <div className="absolute right-0 left-0 flex items-center">
      <div className="flex flex-row items-center gap-5">
        <i>
          <FontAwesomeIcon icon={github} />
        </i>
        <i>
          <FontAwesomeIcon icon={linkedin} />
        </i>
      </div>
      <h2 className="text-blue-200">Felipe Carvalho @2025</h2>
    </div>
  );
}
