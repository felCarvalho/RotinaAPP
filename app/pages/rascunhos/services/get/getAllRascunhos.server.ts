import { LOCAL_URL } from "../../../../utils/constants/contants.server";
import { getSession } from "../../../../utils/cookies/cookies.server";
import { data } from "react-router";
import axios from "axios";

export async function getAllRascunho({
  cookieSession,
}: {
  cookieSession: string;
}) {
  const session = await getSession(cookieSession);

  try {
    const response = await axios.get("home/rascunhos", {
      baseURL: LOCAL_URL,
      headers: {
        Cookie: `accessToken=${session.get("accessToken")};`,
      },
    });

    return data(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return data(
        {
          data: error.response?.data,
        },
        {
          status: error.response?.status || 500,
        },
      );
    }

    return data(
      {
        data: "Ops! erro interno no loader",
      },
      {
        status: 500,
      },
    );
  }
}
