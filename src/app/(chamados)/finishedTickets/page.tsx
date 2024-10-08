import FinishedsTickets from "../_components/finishedsTickets";

import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function FinishedTickets() {

    let user = undefined;
    const session = await auth();
    if (session) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user = session.user;
    } else {
      return  redirect('/login');
    }

  return(
    <FinishedsTickets/>
  )
}