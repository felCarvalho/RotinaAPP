import { Button } from "../../../btn";

export function DropdownFilterStatus() {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <Button
        onClick={() => {}}
        type="button"
        className="flex w-full flex-row gap-1.5 rounded-full bg-white font-medium shadow-sm shadow-blue-50"
      >
        <p className="text-left text-blue-400">Concluidas</p>
      </Button>
      <Button
        onClick={() => {}}
        type="button"
        className="flex w-full flex-row gap-1.5 rounded-full bg-white font-medium shadow-sm shadow-blue-50"
      >
        <p className="text-left text-blue-400">Incompletas</p>
      </Button>
    </div>
  );
}
