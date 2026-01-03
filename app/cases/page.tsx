import Link from "next/link";
import { apiGet, apiPost } from "../lib/api";

export default async function CasesPage({ searchParams }: { searchParams: { merchantId?: string } }) {
  const merchants = (await apiGet("/v1/merchants")).merchants as any[];
  const merchantId = searchParams.merchantId ?? (merchants[0]?.id ?? "");

  const cases = merchantId ? ((await apiGet(`/v1/cases?merchantId=${merchantId}`)).cases as any[]) : [];

  async function ingest(formData: FormData) {
    "use server";
    const rawText = String(formData.get("rawText") ?? "");
    await apiPost("/v1/cases/ingest", { merchantId, rawText });
  }

  return (
    <div style={{ maxWidth: 920 }}>
      <h2>Cases</h2>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "#666" }}>Merchant</div>
        <div>{merchantId ? merchantId : "No merchants"}</div>
      </div>

      <form action={ingest} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input name="rawText" placeholder="e.g. 주문번호 2512294277 불량이라 환불해주세요" style={{ flex: 1 }} />
        <button type="submit">Ingest (Shadow)</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Created</th>
            <th align="left">Raw</th>
            <th align="left">Decision</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((cs) => (
            <tr key={cs.id} style={{ borderTop: "1px solid #eee" }}>
              <td style={{ fontSize: 12, color: "#666" }}>{new Date(cs.createdAt).toLocaleString("ko-KR")}</td>
              <td>
                <Link href={`/cases/${cs.id}`}>{cs.rawText}</Link>
              </td>
              <td style={{ fontFamily: "ui-monospace", fontSize: 12 }}>
                {cs.decision?.result ?? "-"} / {cs.decision?.recommendedAmount ?? 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ margin: "16px 0" }} />

      <p style={{ fontSize: 12, color: "#666" }}>
        머천트 선택 UI는 최소화했습니다. 필요하면 querystring으로 <code>?merchantId=...</code>를 넘기세요.
      </p>
    </div>
  );
}
