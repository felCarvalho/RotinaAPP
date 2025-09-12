import { P } from "../../../component/paragrafo";
import { Button } from "../../../component/btn";
import { useResizeView } from "../../../hooks/UseResizeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface layoutConfigErrorsTypes {
  desktop: string;
  mobile: string;
  icon: IconProp;
}

export function LayoutConfigError({ desktop, mobile, icon }: layoutConfigErrorsTypes) {
  const { verificarWidth } = useResizeView();

  return (
    <div className="h-full w-full">
      {verificarWidth({ largura: 1000 }) && (
        <div className="flex h-full w-full items-center justify-center">
          <P title={desktop} className="!text-lg text-blue-400" />
        </div>
      )}
    </div>
  );
}
