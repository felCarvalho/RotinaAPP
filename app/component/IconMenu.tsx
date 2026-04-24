export function IconInfoMenu() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-4xl text-blue-400">
      <div className="flex flex-row items-center justify-center gap-1.5">
        <div className="h-5 w-5 rounded-md rounded-br-none bg-blue-400"></div>
        <div className="h-5 w-5 rounded-md rounded-bl-none bg-blue-400"></div>
      </div>
      <div className="flex flex-row items-center justify-center gap-1.5">
        <div className="h-5 w-5 rounded-md rounded-tr-none bg-blue-400"></div>
        <div className="h-5 w-5 rounded-md rounded-tl-none bg-blue-400"></div>{" "}
      </div>
    </div>
  );
}
