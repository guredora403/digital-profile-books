import { OwnedIdentityInfo } from "~/models/identity"

export function ShowOwnedIdentityInfo({ identityInfo }: {identityInfo: OwnedIdentityInfo}){
    return <div>
        <p>あなたのIDです。</p>
        <p>そのうち編集などができる予定。</p>
    </div>
}
