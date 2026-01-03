import Link from "next/link";

export default function Home() {
  return (
    <div style={{ maxWidth: 920 }}>
      <h1 style={{ margin: "8px 0 0", fontSize: 28 }}>Internal POC</h1>
      <p style={{ color: "#444", lineHeight: 1.5 }}>
        이 화면은 ‘Shadow → Copilot’ 흐름을 가장 단순한 UI로 확인하기 위한 POC입니다.
        (운영 시스템 연결은 Cafe24 OAuth로 붙입니다.)
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        <Link href="/merchants">Merchants</Link>
        <Link href="/cases">Cases</Link>
        <Link href="/connect">Connect Cafe24</Link>
      </div>

      <hr style={{ margin: "16px 0" }} />

      <p style={{ fontSize: 12, color: "#666" }}>
        POC 호출은 API에 <code>x-app-password</code> 헤더로 인증합니다. (내부 전용)
      </p>
    </div>
  );
}
