import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Button } from "../../component/btn";

export function Foooter() {
  return (
    <div className="flex flex-row items-center justify-center">
      <Button type="button" ariaLabel="botão para GitHub" className="text-blue-400">
        <i>
          <FontAwesomeIcon icon={faGithub} />
        </i>
      </Button>
      <Button type="button" ariaLabel="botão para Linkedin">
        <i>
          <FontAwesomeIcon icon={faLinkedin} />
        </i>
      </Button>
    </div>
  );
}
