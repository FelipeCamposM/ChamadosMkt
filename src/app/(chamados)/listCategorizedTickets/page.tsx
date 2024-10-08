import CategorizedsTickets from "../_components/categorizedsTickets";

import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function ListCategorizedTickets() {

    let user = undefined;
    const session = await auth();
    if (session) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user = session.user;
    } else {
      return  redirect('/login');
    }

    return (
        <CategorizedsTickets/>
    )
}