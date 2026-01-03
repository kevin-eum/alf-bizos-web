import { apiGet, apiPost } from "../lib/api";

export default async function MerchantsPage() {
  const data = await apiGet("/v1/merchants");
  const merchants = data.merchants as any[];

  async function createMerchant(formData: FormData) {
    "use server";
    const name = String(formData.get("name") ?? "");
    const cafe24MallId = String(formData.get("mallId") ?? "");
    await apiPost("/v1/merchants", { name, cafe24MallId });
  }

  return (
    <div style={{ maxWidth: 920 }}>
      <h2>Merchants</h2>

      <form action={createMerchant} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input name="name" placeholder="Merchant name" />
        <input name="mallId" placeholder="Cafe24 mall id (e.g. testmallid1)" />
        <button type="submit">Create</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Cafe24 Mall</th>
            <th align="left">MerchantId</th>
          </tr>
        </thead>
        <tbody>
          {merchants.map((m) => (
            <tr key={m.id} style={{ borderTop: "1px solid #eee" }}>
              <td>{m.name}</td>
              <td>{m.cafe24MallId}</td>
              <td style={{ fontFamily: "ui-monospace", fontSize: 12 }}>{m.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
