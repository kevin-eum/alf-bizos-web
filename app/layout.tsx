import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ALF BizOS POC",
  description: "Shadow → Copilot → Gated Autopilot (Money-Out Safe Kernel)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: "ui-sans-serif, system-ui", margin: 0 }}>
        <div style={{ padding: 16, borderBottom: "1px solid #eee" }}>
          <div style={{ fontWeight: 700 }}>ALF BizOS POC</div>
          <div style={{ fontSize: 12, color: "#666" }}>Money‑Out Safe Kernel · Shadow → Copilot</div>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </body>
    </html>
  );
}
