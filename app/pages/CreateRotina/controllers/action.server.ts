import type { ActionFunctionArgs } from "react-router";
import { createRotina } from "../services/createTasks.server";


export async function action({ request }: ActionFunctionArgs) {
    const cookieSession = request.headers.get("Cookie");
    const formData = await request.formData();
    const intent = formData.get("intent");

    console.log(formData)

    switch (intent) {
        case 'criar':
            return createRotina({ formData, cookieSession });
        default:
            throw new Error("Ops não action foi executada");
    }
}
