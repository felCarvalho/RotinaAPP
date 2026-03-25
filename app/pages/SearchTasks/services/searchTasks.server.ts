import { LOCAL_URL } from "../../../utils/constants/contants.server";
import axios from "axios";
import { getSession } from "../../../utils/cookies/cookies.server";
import { data } from "react-router";

export async function searchTasks({
  cookieSession,
  url,
}: {
  cookieSession: string | null;
  url: string;
}) {
  const urlObj = new URL(url);
  const search = urlObj.searchParams.get("search");
  const session = await getSession(cookieSession);
  console.log(search, "search  aqui", urlObj);

  if (!search) {
    return;
  }

  try {
    const response = await axios.post(
      `home/buscar/${search}`,
      {},
      {
        baseURL: LOCAL_URL,
        headers: {
          Cookie: `accessToken=${session.get("accessToken")}`,
        },
      },
    );

    console.log(response.data, "testando o data de search");

    return data(response.data, { status: response.status });
  } catch (error) {
    return error;
  }
}
