import { IdentityInfo } from "~/models/identity";

export const ShowOtherIdentityInfo = ({ identityInfo: identityInfo }: { identityInfo: IdentityInfo }) => {
    return <div>
        <p>{(identityInfo.edged ? "登録済み" : "未登録")}</p>
    </div>
}
