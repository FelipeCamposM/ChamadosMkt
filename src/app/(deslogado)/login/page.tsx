import Logins from "../_components/logins";

import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function Login() {

    const session = await auth();
    if (session) {
        return redirect('/listopenTickets');
    }   

    return (
        <Logins />
    )
}