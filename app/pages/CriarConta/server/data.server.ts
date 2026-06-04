import axios from "axios";
import { data, redirect } from "react-router";
import {
  commitSession,
  getSession,
} from "../../../utils/cookies/cookies.server";
import { LOCAL_URL } from "~/utils/constants/contants.server";
import type { CreateUserProps } from "~/utils/schemas/user.schema";

export async function createAccountAction({
  cookiesSession,
  validatedData,
}: {
  cookiesSession: string | null;
  validatedData: CreateUserProps;
}) {
  const cookieSession = await getSession(cookiesSession);

  try {
    const response = await axios.post(
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

    console.log(response);

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(cookieSession),
      },
    });
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return data(error.response?.data, { status: error.response?.status });
    }

    return data(
      { message: "Ops! Servidor indisponível no momento" },
      { status: 500 },
    );
  }
}

export { createAccountAction as action };
