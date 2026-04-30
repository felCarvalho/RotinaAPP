import axios from "axios";
import { data, redirect } from "react-router";
import {
  commitSession,
  getSession,
} from "../../../utils/cookies/cookies.server";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { Data } from "~/utils/typesGlobals/type.server";
import type { CreateAccountData } from "../controllers/action.server";

export async function createAccountAction({
  cookiesSession,
  validatedData,
}: {
  cookiesSession: string | null;
  validatedData: CreateAccountData;
}) {
  const cookieSession = await getSession(cookiesSession);

  try {
    const response: Data<unknown> = await axios.post(
      "/criar-conta",
      {
        name: validatedData.name,
        identifier: validatedData.identifier,
        password: validatedData.password,
        passwordConfirm: validatedData.passwordConfirm,
      },
      {
        baseURL: LOCAL_URL,
      },
    );
    cookieSession.flash(
      "notification",
      response.notification?.find((m) => m.type === "INFO")?.message,
    );

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(cookieSession),
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const resultData: Data<unknown> = error.response?.data;

      return data(
        {
          data: resultData.data,
          success: resultData.success,
          notification: resultData.notification,
          code: resultData.code,
        },
        {
          status: error.response?.status,
        },
      );
    }

    return data(
      {
        data: {
          message: "Ops! tivemos algum problema ao enviar seus dados",
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

export { createAccountAction as action };
