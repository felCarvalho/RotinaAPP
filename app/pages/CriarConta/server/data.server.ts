import axios from "axios";
import { data, redirect } from "react-router";
import {
  commitSession,
  getSession,
} from "../../../utils/cookies/cookies.server";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { Data } from "../../../utils/typesGlobals/type.server";

export async function createAccountAction({
  cookiesSession,
  formData,
}: {
  cookiesSession: string | null;
  formData: FormData;
}) {
  const cookieSession = await getSession(cookiesSession);
  const form = Object.fromEntries(formData);

  try {
    const response = await axios.post(
      "/criar-conta",
      {
        name: form.name,
        identifier: form.identifier,
        password: form.password,
        passwordConfirm: form.passwordConfirm,
      },
      {
        baseURL: LOCAL_URL,
      },
    );

    cookieSession.flash("success", "Sua conta foi criada com sucesso!");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(cookieSession),
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
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
