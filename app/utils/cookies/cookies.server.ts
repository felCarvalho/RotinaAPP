import { createCookieSessionStorage } from "react-router";
import type { Token } from "../context/type.server";

const cookies = createCookieSessionStorage({
  cookie: {
    name: "user",
    httpOnly: true,
    path: "/",
    secure: import.meta.env.AMBIENTE === "PRODUCTION",
    sameSite: "lax",
  },
});

export const { getSession, commitSession, destroySession } = cookies;

export async function getSessionNotification(
  cookiesSession: string | null,
  notification: string,
) {
  const session = await getSession(cookiesSession);

  const message = session.get(notification);

  if (!message) return false;

  return message;
}

export async function getCookieTokens({
  cookiesSession,
}: {
  cookiesSession: string | null;
}) {
  const session = await getSession(cookiesSession);

  const accessToken = session.get("accessToken");
  const refreshToken = session.get("refreshToken");
  const expAccessToken = session.get("expAccessToken");

  if (!accessToken || !refreshToken || !expAccessToken) {
    return null;
  }

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    expAccessToken: expAccessToken,
  };
}
