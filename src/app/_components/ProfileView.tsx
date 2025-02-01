import { type ProfileResponse } from "~/models/profile";

export function ProfileView({ profiles }: { profiles: ProfileResponse[] }) {
    return <>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
                <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>タイトル</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>内容</th>
                </tr>
            </thead>
            <tbody>
            {profiles.map((profile) => (
                <tr key={profile.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{profile.title}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{profile.content}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
}
