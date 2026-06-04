import { Chat } from "./Chat";
import { action } from "./controllers/action.server";
import { handle } from "./controllers/handle";
import { middleware } from "../../middleware/middleware.server";

export { action, handle, middleware };

export default function ChatComponent() {
  return (
    <div className="h-full w-full">
      <Chat />
    </div>
  );
}
