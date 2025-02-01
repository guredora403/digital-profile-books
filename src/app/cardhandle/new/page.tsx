import { Metadata } from "next";
import { NewIdentityForm } from "~/app/_components/newIdentityForm";

export const metadata: Metadata = {title: "ID追加"};
export default function NewIdentity(){
    return (
        <main>
            <h1>利用ID新規作成</h1>
            <NewIdentityForm/>
        </main>
    )
}
