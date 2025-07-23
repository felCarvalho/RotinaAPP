import { useOutlet } from "react-router";
import { Config } from "../../pages/Configuracao/Config";
import { Overlay } from "../../component/overlay";
import { P } from "../../component/paragrafo";

export function LayoutConfig() {
  //tem o mesmo comportamendo do <Outlet/> no jsx, uso ele aqui em "LayoutConfig.jsx" para poder fazer verificação se existe rota ou não
  //useOutlet retorna o null
  const outlet = useOutlet();
  return (
    <Overlay
      initial={{ y: 500, scale: 0, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1, bounce: 0.3 }}
      className="flex-row !items-start !justify-start gap-5 p-5"
    >
      <div className="h-full w-full">
        <Config />
      </div>
      <div className="h-full w-full">
        {outlet ?? (
          <P
            title="Esolha alguma configuração para ver um pouco sobre ela aqui!"
            className="shadoe-blue-50 mt-72 w-full rounded-full text-center !text-lg text-blue-400"
          />
        )}
      </div>
    </Overlay>
  );
}
