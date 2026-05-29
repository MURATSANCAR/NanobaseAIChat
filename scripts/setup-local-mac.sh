#!/usr/bin/env bash
# One-time / repeatable local Mac setup for NanobaseAI dev.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> NanobaseAI local setup (Mac)"

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "    Created .env from .env.example"
else
  echo "    .env exists"
fi

if ! grep -q '^NANOBASE_OPERATION_BASE_URL=' .env 2>/dev/null; then
  printf '\n# NanobaseAI Operation Center (backend proxy only — not exposed to frontend)\nNANOBASE_OPERATION_BASE_URL=\n' >> .env
  echo "    Added NANOBASE_OPERATION_BASE_URL to .env"
else
  echo "    NANOBASE_OPERATION_BASE_URL already in .env"
fi

if [[ ! -f librechat.yaml ]]; then
  cp librechat.example.yaml librechat.yaml
  echo "    Created librechat.yaml from librechat.example.yaml"
else
  echo "    librechat.yaml exists"
fi

if ! grep -q '^FRONTEND_PORT=' .env 2>/dev/null; then
  sed -i '' '/^PORT=3080/a\
FRONTEND_PORT=3090\
BACKEND_PORT=3080
' .env 2>/dev/null || printf '\nFRONTEND_PORT=3090\nBACKEND_PORT=3080\n' >> .env
  echo "    Added FRONTEND_PORT and BACKEND_PORT to .env"
else
  echo "    FRONTEND_PORT already in .env"
fi

if grep -q '^DOMAIN_CLIENT=http://localhost:3080' .env 2>/dev/null; then
  sed -i '' 's|^DOMAIN_CLIENT=http://localhost:3080|DOMAIN_CLIENT=http://localhost:3090|' .env
  echo "    Updated DOMAIN_CLIENT to http://localhost:3090"
fi

if mongosh --eval 'db.runCommand({ ping: 1 })' --quiet >/dev/null 2>&1; then
  echo "    MongoDB: OK"
elif docker ps --format '{{.Names}}' 2>/dev/null | grep -qE 'mongo|chat-mongodb'; then
  echo "    MongoDB: OK (Docker)"
else
  echo "    WARN: MongoDB not reachable."
  echo "    Install/start MongoDB, e.g.: brew services start mongodb-community"
  echo "    Or: docker compose up -d mongodb"
  exit 1
fi

if [[ ! -d packages/data-provider/dist ]] || [[ ! -d packages/api/dist ]]; then
  echo "    Building packages (first run)..."
  npm run build:packages
else
  echo "    packages already built"
fi

echo ""
echo "Setup complete. Next:"
echo "  Terminal 1: npm run backend:dev"
echo "  Terminal 2: npm run frontend:dev"
echo "  Browser:    http://localhost:3090"
echo ""
echo "Operation Center: set NANOBASE_OPERATION_BASE_URL in .env, then restart backend."
