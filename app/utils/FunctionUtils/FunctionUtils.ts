import { toast } from "sonner";
import { useLocation, useMatches } from "react-router";
import { useEffect } from "react";

export function success({ success }: { success: string }) {
  toast.success(success, {
    position: "top-center",
    duration: 5000,
    className: "text-blue-400! rounded-3xl! text-md! shadow-xs!",
  });
}

export function error({ error }: { error: string }) {
  toast.error(error, {
    position: "top-center",
    duration: 5000,
    className: "text-blue-400! rounded-3xl! text-md! shadow-xs!",
  });
}

export function info({ info }: { info: string }) {
  toast.info(info, {
    position: "top-center",
    duration: 5000,
    className: "text-blue-400! rounded-3xl! text-md! shadow-xs!",
  });
}

export function warning({ warning }: { warning: string }) {
  toast.warning(warning, {
    position: "top-center",
    duration: 5000,
    className: "text-blue-400! rounded-3xl! text-md! shadow-xs!",
  });
}

type routeTypePage = "modal" | "normal";

enum TypePage {
  MODAL = "modal",
}

export function layoutRoutes({
  route,
  typeRoute,
}: {
  route: routeTypePage;
  typeRoute: string;
}) {
  const { pathname } = useLocation();

  const routeBoolean = pathname.startsWith(route);
  const typeRouteBoolean = typeRoute === TypePage.MODAL;

  return routeBoolean && typeRouteBoolean
    ? "fixed top-0 left-0 right-0 bottom-0 z-50"
    : "relative top-0 left-0 right-0 bottom-0 z-50";
}

export function useMatchesTypeds<H = unknown, D = unknown>() {
  const matches = useMatches();
  return matches.map((s) => ({
    ...s,
    handle: s.handle as H,
    loaderData: s.loaderData as D,
  }));
}

export function useRetiredScroll() {
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.scrollBehavior = "smooth";
      html.style.overflow = "hidden";
    }

    return () => {
      const html = document.querySelector("html");
      if (html) {
        html.style.scrollBehavior = "smooth";
        html.style.overflow = "auto";
      }
    };
  }, []);
}
