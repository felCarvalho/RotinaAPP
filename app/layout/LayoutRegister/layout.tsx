import { useEffect, useEffectEvent } from "react";
import { Outlet, redirect } from "react-router";

export default function AuthLayout() {
  const redirectEvent = useEffectEvent(() => redirect("/home"));
  useEffect(() => {
    redirectEvent();
  }, [redirectEvent]);
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
