import { Outlet, useNavigate } from "react-router";
import { Button } from "../../component/btn";

export default function HomeLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-row">
      <div>
        <Button type="button" onClick={() => navigate("/home")}>
          Aperte para ir para tela de home
        </Button>
      </div>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
