import { faAngleLeft, faX, faTrash, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { P } from "../../component/paragrafo";
import { HeaderContent } from "../../component/headerContent";
import { H3 } from "../../component/subTitle";
import { Toggle } from "../../component/toggle";
import { Button } from "../../component/btn";
import { DataConfig } from "../../constants/DataConfig/DataConfig";
import { RotinaStore } from "../../store/UseRotina";
import { useNavigate, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutStore } from "../../store/UseLayout";

export function Config() {
  //
  const { setLayout } = LayoutStore();
  //estado global e função para atualizar o mesmo
  const { statusFunction, setStatusFunction } = RotinaStore();
  //usado para navegação
  const navigate = useNavigate();

  //verificando quais config devem ter btn toggle ou não
  function verificarConfigStatus({ chave }) {
    switch (chave) {
      case "lixeira":
        return true;
      case "extras":
        return true;

      default:
        return false;
    }
  }

  function typeConfigToggle({ chave, link }) {
    switch (chave) {
      case "lixeira":
        return (
          <Button onClick={() => navigate(link)} className="flex flex-row items-center justify-center gap-2 !py-1">
            <i>
              <FontAwesomeIcon icon={faTrash} />
            </i>
            <P title="Lixeira" />
          </Button>
        );

      default:
        "";
    }
  }

  return (
    <div className="h-full rounded-[50px] bg-white shadow-sm shadow-blue-50">
      <HeaderContent
        btnBack={() => {
          navigate(-1);
          setLayout({ isMobileLayout: true });
        }}
        btnClosed={() => {
          navigate("/inicio");
          setLayout({ isMobileLayout: true });
        }}
        title="Configurações"
        iconBack={faAngleLeft}
        iconClosed={faX}
        classNameHeader="p-5"
      />
      <div className="box-border h-[300px] overflow-auto px-5">
        {DataConfig.map((c) => (
          <div
            key={c?.id}
            className="my-3 flex flex-row items-center justify-between rounded-2xl bg-blue-100/5 px-3 py-4 shadow-sm shadow-blue-50"
            onDoubleClick={() => {
              verificarConfigStatus({ chave: c?.id }) && setStatusFunction({ [c?.id]: !statusFunction?.[c?.id] });
            }}
          >
            {!verificarConfigStatus({ chave: c?.id }) ? (
              <NavLink
                onClick={() => setLayout({ isMobileLayout: true })}
                to={c?.link}
                className={({ isActive }) =>
                  !isActive
                    ? "flex w-full flex-row items-center justify-center text-blue-300"
                    : "flex w-full flex-row text-blue-400"
                }
              >
                <div className="w-full">
                  <H3 title={c?.title} className="cursor-pointer text-base" />
                  <P title={c?.description} className="w-40 truncate font-light whitespace-nowrap text-blue-300" />
                </div>
                <Button type="button" className="min-h-10 min-w-10 bg-white">
                  <i className="text-blue-400">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </i>
                </Button>
              </NavLink>
            ) : (
              <div className="justify-cente flex w-full flex-col items-center gap-3">
                <div className="flex w-full flex-row items-center">
                  <div className="w-full">
                    <H3 title={c?.title} className="cursor-pointer text-base text-blue-400" />
                    <P title={c?.description} className="w-40 truncate font-light whitespace-nowrap text-blue-300" />
                  </div>
                  <Toggle
                    id={c?.id}
                    boleano={statusFunction?.[c?.id]}
                    setBoleano={(e) => setStatusFunction({ [c?.id]: e.target.checked })}
                  />
                </div>
                <div className="">{typeConfigToggle({ chave: c?.id, link: c?.link })}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
