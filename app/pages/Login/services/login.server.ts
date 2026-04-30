import axios, { isAxiosError } from "axios";
import { data, redirect } from "react-router";
import { commitSession, getSession } from "~/utils/cookies/cookies.server";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { z } from "zod";

type LoginInput = {
  identifier: string;
  password: string;
};

export async function loginAccount({
  data: parsedData,
  cookieSession,
}: {
  data: LoginInput;
  cookieSession: string | null;
}) {
  const session = await getSession(cookieSession);

  try {
    const response = await axios.post(
      "/login",
      {
        identifier: parsedData.identifier,
        password: parsedData.password,
      },
      {
        baseURL: LOCAL_URL,
      },
    );

    const { accessToken, refreshToken, expAccessToken } = response.data;
    const expAccessTokenDate = new Date(expAccessToken * 1000);
    session.flash("notification", `Seja bem-vindo(a) ao Minha Rotina!`);
    session.set("accessToken", accessToken);
    session.set("refreshToken", refreshToken);
    session.set("expAccessToken", expAccessTokenDate);

    return redirect("/home", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return data(
        {
          data: error.response?.data,
        },
        {
          status: error.response?.status,
        },
      );
    }

    return data(
      {
        data: {
          message: "Ops! erro interno ao fazer login",
          error: error,
          status: 500,
        },
      },
      {
        status: 500,
      },
    );
  }
}
