# alf-bizos-web (Next.js)

Minimal internal UI for:
- Merchants
- Cafe24 OAuth connect
- Cases (ingest Shadow)
- Plan/Approve/Execute (Copilot)

## Quickstart
```bash
pnpm i
cp .env.example .env.local
pnpm dev
```

Set:
- NEXT_PUBLIC_API_BASE_URL
- NEXT_PUBLIC_APP_PASSWORD (matches API APP_PASSWORD)

> Note: This POC uses a shared password header. For real internal rollout, replace with SSO / signed JWT.
