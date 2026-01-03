import { apiGet } from "../lib/api";

export default async function ConnectPage({ searchParams }: { searchParams: { merchantId?: string; connected?: string } }) {
  const data = await apiGet("/v1/merchants");
  const merchants = data.merchants as any[];

  return (
    <div style={{ maxWidth: 920 }}>
      <h2>Connect Cafe24</h2>
      {searchParams.connected === "1" && (
        <div style={{ padding: 12, border: "1px solid #ddd", marginBottom: 12 }}>
          ✅ Connected
        </div>
      )}

      <p style={{ color: "#444" }}>
        아래 버튼은 API의 OAuth 시작 엔드포인트로 이동합니다. (Vercel 배포 시 BASE_URL/WEB_ORIGIN 세팅 필요)
      </p>

      <ul>
        {merchants.map((m) => (
          <li key={m.id} style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 600 }}>{m.name} ({m.cafe24MallId})</div>
            <a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/cafe24/oauth/start?merchantId=${m.id}`}>
              Start OAuth
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
