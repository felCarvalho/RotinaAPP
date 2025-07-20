import { Nav } from "../../component/Nav/Nav";
import { TelasStore } from "../../store/UseTelasFixos";

export function NavMobile() {
  const { isRenderID } = TelasStore();
  return (
    <>
      {isRenderID({ name: "menu-h-mobile", id: 300, status: false }) && (
        <div className="absolute top-0 right-10 bottom-0 left-0 z-50 flex flex-row items-start justify-center bg-white">
          <Nav />
        </div>
      )}
    </>
  );
}
