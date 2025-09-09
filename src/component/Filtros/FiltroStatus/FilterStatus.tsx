import { Button } from "../../btn";
import { useMemo } from "react";
import { RotinaStore } from "../../../store/UseRotina";

export function DropdownFilterStatus() {
  const { setStatus, setStatusString } = RotinaStore();
  const booleanType = useMemo(
    () => ({
      concluidasTypes: { boleano: true, string: "Concluídas" },
      incompletasTypes: { boleano: false, string: "Incompletas" },
    }),
    [],
  );

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <Button
        onClick={() => {
          setStatus({ status: booleanType?.concluidasTypes?.boleano });
          setStatusString({ status: booleanType?.concluidasTypes?.string });
        }}
        type="button"
        className="flex w-full flex-row gap-1.5 rounded-full bg-white font-medium shadow-sm shadow-blue-50"
      >
        <p className="text-left text-blue-400">Concluidas</p>
      </Button>
      <Button
        onClick={() => {
          setStatus({ status: booleanType?.incompletasTypes?.boleano });
          setStatusString({ status: booleanType?.incompletasTypes?.string });
        }}
        type="button"
        className="flex w-full flex-row gap-1.5 rounded-full bg-white font-medium shadow-sm shadow-blue-50"
      >
        <p className="text-left text-blue-400">Incompletas</p>
      </Button>
    </div>
  );
}
