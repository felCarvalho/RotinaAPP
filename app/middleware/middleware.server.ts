import axios from "axios";
import { redirect } from "react-router";
import type { MiddlewareFunction } from "react-router";
import { getSession, commitSession } from "../utils/cookies/cookies.server";
import { LOCAL_URL } from "../utils/constants/contants.server";
import { tokenContext } from "../utils/context/context.server";

const routesPublic = ["/login", "/criar-conta", "/redefinir-senha"];

const AuthMiddleware: MiddlewareFunction = async (
  { request, context },
  next,
) => {
  const url = new URL(request.url);
  const isPublicRoute = routesPublic.some((r) => r === url.pathname);
  const cookiesSession = request.headers.get("Cookie");
  const session = await getSession(cookiesSession);
  const expAccessToken = session.get("expAccessToken");

  const date = new Date().getTime();
  console.log("expAccessToken", expAccessToken, "date", date);

  if (!isPublicRoute && !expAccessToken) {
    session.flash("notification", "Ops, Faça login para poder entrar");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (!isPublicRoute && date > expAccessToken) {
    try {
      const refresh = await axios.post(
        "/refresh-token",
        {},
        {
          baseURL: LOCAL_URL,
          headers: {
            Cookie: `refreshToken=${session.get("refreshToken")}`,
          },
        },
      );

      const data = refresh.data.data;

      session.set("accessToken", data.accessToken);
      session.set("refreshToken", data.refreshToken);
      session.set("expAccessToken", data.expAccessToken);

      context.set(tokenContext, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expAccessToken: data.expAccessToken,
      });

      console.log("refresh", data);

      const response = (await next()) as Response;
      response.headers.append("Set-Cookie", await commitSession(session));
      return response;
    } catch (e) {
      console.error(e);
      session.set("accessToken", "");
      session.set("expAccessToken", "");
      session.set("refreshToken", "");
      session.flash("notification", "Ops, Faça login para poder entrar");

      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }

  return await next();
};

export const middleware: MiddlewareFunction[] = [AuthMiddleware];
