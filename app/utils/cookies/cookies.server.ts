import {
  createCookieSessionStorage,
  type Session,
  type SessionData,
} from "react-router";

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

interface notification {
  message: string;
  type: "INFO" | "ERROR" | "WARNING";
}
export async function getSessionNotification(
  cookiesSession: Session<SessionData, SessionData>,
  notification: "notification",
) {
  const message: notification[] = cookiesSession.get(notification);

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
