import { faAngleLeft, faX, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { P } from "../../component/paragrafo";
import { HeaderContent } from "../../component/headerContent";
import { H3 } from "../../component/subTitle";
import { Button } from "../../component/btn";
import { Toggle } from "../../component/toggle";
import { DataConfig } from "../../constants/DataConfig/DataConfig";
import { RotinaStore } from "../../store/UseRotina";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";

export function Config() {
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

  return (
    <div className="h-full rounded-[50px] bg-white p-5 shadow-sm shadow-blue-50">
      <HeaderContent
        btnBack={() => navigate(-1)}
        btnClosed={() => navigate("/inicio")}
        title="Configurações"
        iconBack={faAngleLeft}
        iconClosed={faX}
      />
      <div className="box-border overflow-auto pt-8">
        {DataConfig.map((c) => (
          <div
            key={c?.id}
            className="mb-3 flex flex-row items-center justify-between rounded-full bg-blue-100/5 p-5 shadow-sm shadow-blue-50"
            onDoubleClick={() => {
              verificarConfigStatus({ chave: c?.id }) && setStatusFunction({ [c?.id]: !statusFunction?.[c?.id] });
            }}
          >
            <NavLink>
              <H3 title={c?.title} className="cursor-pointer text-base text-blue-400" />
              <P title={c?.description} className="w-40 truncate font-light whitespace-nowrap text-blue-300" />
            </NavLink>
            {!verificarConfigStatus({ chave: c?.id }) ? (
              <div>
                <Button
                  onClick={() => {
                    setTimeout(() => {
                      navigate(c?.link);
                    }, 300);
                  }}
                  className="min-h-10 min-w-10 cursor-pointer rounded-full bg-white !p-0 shadow-xs shadow-blue-100"
                >
                  <i className="text-blue-400">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </i>
                </Button>
              </div>
            ) : (
              <Toggle
                id={c?.id}
                boleano={statusFunction?.[c?.id]}
                setBoleano={(e) => setStatusFunction({ [c?.id]: e.target.checked })}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
