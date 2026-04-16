import { Button } from "../../component/btn";
import { H1 } from "../../component/title";
import { P } from "../../component/paragrafo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useFetcher, NavLink, useLocation } from "react-router";
import { useMatchesTypeds } from "../../utils/FunctionUtils/FunctionUtils";
import { handle, type Handle } from "./controllers/handle";
import type { dataCategorias, Category } from "./type.server";

export function InfoCategoria() {
  const matches = useMatchesTypeds<Handle, dataCategorias>();
  const findHandle = matches.find((s) => s?.handle?.id === handle.id);
  const data = findHandle?.loaderData;
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { pathname } = useLocation();

  if (pathname !== "/home/categorias") return null;

  //className="mb-3 flex flex-col justify-center gap-2 rounded-2xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-3 select-none"

  return (
    <div>
      <div className="">
        <NavLink
          to="/home"
          className="flex w-min flex-row items-center gap-2 rounded-full px-2 hover:bg-blue-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-blue-400" />
          <H1
            title="Informações Categorias"
            className="w-max text-lg! text-blue-400"
          />
        </NavLink>
      </div>
      <div className="h-full w-full pt-3">
        {data?.data && data.data.length ? (
          data.data.map((c: Category) => (
            <div
              key={c.id}
              className="mb-3 flex flex-col justify-center rounded-4xl border border-slate-100 bg-linear-to-r from-blue-50/60 p-3 select-none"
            >
              <div className="mx-3 flex flex-row justify-between">
                <div className="flex flex-col justify-center">
                  <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center">
                      <H1
                        title="Titulo:"
                        className="text-base! text-blue-400"
                      />
                      <P title={c.title} className={"text-blue-400"} />
                    </div>
                    <H1
                      title="Descrição:"
                      className="text-base! text-blue-400"
                    />
                    <P
                      title={c.description ?? "Ops, descrição não disponível"}
                      className="text-blue-300"
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <div>
                    <Button
                      type="button"
                      className="min-h-9 min-w-9 p-0!"
                      onClick={() => navigate(`renomear/${c.id}`)}
                    >
                      <i>
                        <FontAwesomeIcon icon={faPen} />
                      </i>
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="button"
                      className="min-h-9 min-w-9 p-0!"
                      onClick={() =>
                        fetcher.submit(
                          {
                            idCategory: c.id,
                            intent: "delete-category-task",
                          },
                          {
                            method: "DELETE",
                            action: "/home/categorias",
                          },
                        )
                      }
                    >
                      <i>
                        <FontAwesomeIcon icon={faTrash} />
                      </i>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full text-center">
                <Button
                  type="button"
                  className="px-3 pt-1 pb-1 text-base font-medium"
                  onClick={() => navigate(`detalhes-categoria/${c.id}`)}
                >
                  <p className="text-white">Ver detalhes</p>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <P
              title="Ops, nenhuma categoria foi encontrada"
              className="text-blue-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
