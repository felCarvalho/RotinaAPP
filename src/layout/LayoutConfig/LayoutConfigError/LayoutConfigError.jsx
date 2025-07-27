import { P } from "../../../component/paragrafo";
import { Button } from "../../../component/btn";
import { useResizeView } from "../../../hooks/UseResizeView";
import { LayoutStore } from "../../../store/UseLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function LayoutConfigError({ desktop, mobile, icon }) {
  const { verificarWidth } = useResizeView();
  const { setLayout } = LayoutStore();

  return (
    <div className="h-full w-full">
      {verificarWidth({ largura: 799 }) ? (
        <div className="flex h-full w-full items-center justify-center">
          <P title={desktop} className="!text-lg text-blue-400" />
        </div>
      ) : (
        <div
          onDoubleClick={() => setLayout({ isDesktopLayout: false })}
          className="mx-5 flex h-full w-full flex-col items-center justify-center gap-5"
        >
          <div>
            <P title={mobile} className="!text-base text-blue-400" />
          </div>
          <div>
            <Button onClick={() => setLayout({ isMobileLayout: false })} className="min-h-10 min-w-10 !p-0">
              <i>
                <FontAwesomeIcon icon={icon} />
              </i>
            </Button>
          </div>
          <P
            title="DICA: clique duas vezes na tela par ir á configurações"
            className="absolute bottom-4 left-4 !text-[12px] text-zinc-400 italic"
          />
        </div>
      )}
    </div>
  );
}
