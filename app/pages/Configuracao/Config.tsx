import {
  faAngleLeft,
  faAngleRight,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../../component/btn";
import { HeaderContent } from "../../component/headerContent";
import { P } from "../../component/paragrafo";
import { H3 } from "../../component/subTitle";
import { Toggle } from "../../component/toggle";

export function Config() {
  return (
    <div className="h-full rounded-[50px] bg-white pb-5 shadow-md shadow-blue-50">
      <HeaderContent
        iconBack={faAngleLeft}
        iconClosed={faX}
        title="Configurações"
        classNameHeader=""
      />
      <div className="scroll-hide h-full overflow-auto rounded-[50px] pt-22">
        <div
          key={1}
          className="mx-5 my-3.5 flex flex-row items-center justify-between rounded-2xl bg-blue-100/5 p-2.5 px-3 py-4 shadow-sm shadow-blue-50"
        >
          <NavLink to={""}>
            <div className="w-full">
              <H3 title={""} className="cursor-pointer text-base" />
              <P
                title={""}
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
                <H3
                  title={""}
                  className="cursor-pointer text-base text-blue-400"
                />
                <P
                  title={""}
                  className="xs:max-2xs:w-40 3xs:max-4xs:w-50 truncate font-light whitespace-nowrap text-blue-300 md:w-full"
                />
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
}
