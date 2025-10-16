import { faAngleLeft, faAngleRight, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { Toggle } from "../../component/toggle";
import { DataConfig } from "../../constants/DataConfig/DataConfig";

export function Config() {
  //usado para navegação
  const navigate = useNavigate();

  const statusFunction = true;

  //verificando quais config devem ter btn toggle ou não
  function verificarConfigStatus({ chave }: { chave: string }) {
    switch (chave) {
      case "lixeira":
        return true;
      case "extras":
        return true;

      default:
        return false;
    }
  }

  function typeConfigToggle({ chave, link }: { chave: string; link: string }) {
    switch (chave) {
      case "lixeira":
        return (
          <div>
            {statusFunction && (
              <Button
                type="button"
                onClick={() => {
                  navigate(link);
                }}
                className="flex flex-row items-center justify-center gap-2 !py-1"
              >
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
                <P title="Abrir lixeira" />
              </Button>
            )}
          </div>
        );

      default:
    }
  }

  return (
    <div className="h-full rounded-[50px] bg-white pb-5 shadow-md shadow-blue-50">
      <HeaderContent
        btnBack={() => {
          navigate(-1);
        }}
        btnClosed={() => {
          navigate("/inicio");
        }}
        title="Configurações"
        iconBack={faAngleLeft}
        iconClosed={faX}
        classNameHeader=""
      />
      <div className="scroll-hide h-full overflow-auto rounded-[50px] pt-22">
        {DataConfig.map((c) => (
          <div
            key={c?.id}
            className="mx-5 my-3.5 flex flex-row items-center justify-between rounded-2xl bg-blue-100/5 p-2.5 px-3 py-4 shadow-sm shadow-blue-50"
          >
            {!verificarConfigStatus({ chave: c?.id }) ? (
              <NavLink
                to={c?.link}
                className={({ isActive }) =>
                  !isActive
                    ? "flex w-full flex-row items-center justify-center text-blue-300"
                    : "flex w-full flex-row text-blue-400"
                }
              >
                <div className="w-full">
                  <H3 title={c?.title} className="cursor-pointer text-base" />
                  <P
                    title={c?.description}
                    className="xs:max-2xs:w-40 3xs:max-4xs:w-50 truncate font-light whitespace-nowrap text-blue-300 md:w-full"
                  />
                </div>
                <Button type="button" className="min-h-10 min-w-10 bg-white">
                  <i className="text-blue-400">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </i>
                </Button>
              </NavLink>
            ) : (
              <div className="justify-cente flex max-h-min w-full flex-col items-center gap-3">
                <div className="flex w-full flex-row items-center">
                  <div className="w-full">
                    <H3 title={c?.title} className="cursor-pointer text-base text-blue-400" />
                    <P
                      title={c?.description}
                      className="xs:max-2xs:w-40 3xs:max-4xs:w-50 truncate font-light whitespace-nowrap text-blue-300 md:w-full"
                    />
                  </div>
                  <Toggle
                    name={c?.id}
                    //boleano={statusFunction?.[c?.id]}
                    //setBoleano={(e) => setStatusFunction({ [c?.id]: e.target.checked })}
                    //
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
