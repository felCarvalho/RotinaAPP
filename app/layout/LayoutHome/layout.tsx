import { Outlet, redirect } from "react-router";
import { Button } from "../../component/btn";

export default function HomeLayout() {
  return (
    <div className="flex h-full w-full flex-row">
      <div>
        <Button type="button" onClick={() => redirect("/home")}>
          Aperte para ir para tela de home
        </Button>
      </div>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
