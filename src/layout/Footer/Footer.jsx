import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Button } from "../../component/btn";

export function Foooter() {
  return (
    <div className="flex flex-row items-center justify-center">
      <Button className="text-blue-400">
        <i>
          <FontAwesomeIcon icon={faGithub} />
        </i>
      </Button>
      <Button>
        <i>
          <FontAwesomeIcon icon={faLinkedin} />
        </i>
      </Button>
    </div>
  );
}
