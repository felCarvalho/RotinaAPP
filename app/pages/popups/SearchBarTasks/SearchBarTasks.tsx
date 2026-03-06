import { useLocation, useNavigate } from "react-router";
import { SearchFloatBar } from "../../component/searchFloatBar";
import { useEffect } from "react";
import { parseAsString, useQueryStates } from "nuqs";

export function SearchBarTasks() {
  return (
    <>
      <SearchFloatBar
        value={""}
        onBack={() => ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => ""}
      />
    </>
  );
}
