import { faAngleLeft, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseAsString, useQueryStates } from "nuqs";
import { Overlay } from "~/component/overlay";
import { useMatchesTypeds } from "~/utils/FunctionUtils/FunctionUtils";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { Input } from "../../component/input";
import type { taskLoader } from "./type";
import type { renomearTasks } from "./renomear.server";
import { useFetcher } from "react-router";

export function Renomear() {
  const fetcher = useFetcher();
  const [renomear, setRenomear] = useQueryStates(
    {
      renomear: parseAsString,
    },
    {
      history: "push",
    },
  );

  return (
    <>
      {renomear.renomear && (
        <Overlay>
          <div className="w-full max-md:m-5 max-lg:m-15 landscape:max-lg:m-10 xl:mx-60 rounded-[50px] bg-white shadow-2xl shadow-blue-100">
            <HeaderContent
              iconBack={faAngleLeft}
              iconClosed={faX}
              title="Renomear"
              classNameHeaderDiv="text-center"
              btnClosed={() => {}}
              btnBack={() => {}}
            />
            <fetcher.Form method="PATCH" className="mt-20 px-5">
              <label className="flex flex-col gap-1">
                <p className="text-base text-blue-400">Renomear:</p>
                <input type="hidden" name="intent" value="rename" />
                <input type="hidden" name="publicId" value={""} />
                <Input
                  type="text"
                  name="renomear"
                  placeholder="renomear rotina..."
                  autoFocus
                  defaultValue={""}
                />
              </label>
              <div className="mt-10 mb-5 flex flex-row items-center justify-center gap-5">
                <Button
                  type="submit"
                  className="flex flex-row justify-start gap-2 bg-blue-400 font-medium"
                >
                  <p>Confirmar</p>
                  <i>
                    <FontAwesomeIcon icon={faCheck} />
                  </i>
                </Button>
                <Button
                  type="reset"
                  onClick={() => {}}
                  className="flex flex-row justify-start gap-2 bg-gray-400 font-medium"
                >
                  <p>Cancelar</p>
                  <i>
                    <FontAwesomeIcon icon={faX} />
                  </i>
                </Button>
              </div>
            </fetcher.Form>
          </div>
        </Overlay>
      )}
    </>
  );
}
