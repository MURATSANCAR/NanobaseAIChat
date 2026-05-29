#!/usr/bin/env bash
# Start backend + frontend for local Mac dev (single terminal; Ctrl+C stops both).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

bash scripts/setup-local-mac.sh

BACKEND_PID=""
cleanup() {
  if [[ -n "$BACKEND_PID" ]] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null || true
    wait "$BACKEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "==> Starting backend (http://localhost:3080)..."
npm run backend:dev &
BACKEND_PID=$!

sleep 3

if ! curl -sf "http://localhost:3080/health" >/dev/null 2>&1; then
  echo "    Waiting for backend..."
  for _ in $(seq 1 30); do
    curl -sf "http://localhost:3080/health" >/dev/null 2>&1 && break
    sleep 1
  done
fi

echo "==> Starting frontend (http://localhost:${FRONTEND_PORT:-3090})..."
echo "    Press Ctrl+C to stop both servers."
FRONTEND_PORT="${FRONTEND_PORT:-3090}" npm run frontend:dev
