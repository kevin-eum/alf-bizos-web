import { apiGet, apiPost } from "../../lib/api";

export default async function CaseDetail({ params }: { params: { id: string } }) {
  const data = await apiGet(`/v1/cases/${params.id}`);
  const cs = data.case as any;

  async function createPlan() {
    "use server";
    await apiPost("/v1/plans", { caseId: cs.id, createdBy: "web" });
  }

  async function approve(formData: FormData) {
    "use server";
    const planId = String(formData.get("planId") ?? "");
    await apiPost(`/v1/plans/${planId}/approve`, { approvedBy: "web" });
  }

  async function execute(formData: FormData) {
    "use server";
    const planId = String(formData.get("planId") ?? "");
    await apiPost(`/v1/plans/${planId}/execute`, {});
  }

  const latestPlan = (cs.plans?.[0] ?? null);

  return (
    <div style={{ maxWidth: 920 }}>
      <h2>Case</h2>

      <div style={{ padding: 12, border: "1px solid #eee", marginBottom: 12 }}>
        <div style={{ fontFamily: "ui-monospace", fontSize: 12 }}>{cs.id}</div>
        <div style={{ marginTop: 8 }}>{cs.rawText}</div>
      </div>

      <h3>Shadow Outputs</h3>
      <pre style={{ background: "#fafafa", padding: 12, overflowX: "auto" }}>
{JSON.stringify({ goalIR: cs.goalIR?.json, state: cs.stateVec?.json, decision: cs.decision }, null, 2)}
      </pre>

      <h3>Copilot</h3>
      {!latestPlan ? (
        <form action={createPlan}>
          <button type="submit">Create ActionPlan</button>
        </form>
      ) : (
        <div style={{ padding: 12, border: "1px solid #eee" }}>
          <div>Plan status: <b>{latestPlan.status}</b></div>
          <pre style={{ background: "#fafafa", padding: 12, overflowX: "auto" }}>
{JSON.stringify(latestPlan.actions, null, 2)}
          </pre>

          {latestPlan.status === "planned" && (
            <form action={approve}>
              <input type="hidden" name="planId" value={latestPlan.id} />
              <button type="submit">Approve</button>
            </form>
          )}

          {latestPlan.status === "approved" && (
            <form action={execute}>
              <input type="hidden" name="planId" value={latestPlan.id} />
              <button type="submit">Execute (requires ENABLE_EXECUTION=true)</button>
            </form>
          )}

          {latestPlan.proofJson && (
            <>
              <h4>Execution Proof</h4>
              <pre style={{ background: "#fafafa", padding: 12, overflowX: "auto" }}>
{JSON.stringify(latestPlan.proofJson, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}
