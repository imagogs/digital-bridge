#!/bin/bash

# ─── DIGITAL BRIDGE — Avviatore automatico ───────────────────────────────────

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
PORTA=3000

clear
echo ""
echo "  ██████╗ ██╗ ██████╗ ██╗████████╗ █████╗ ██╗      "
echo "  ██╔══██╗██║██╔════╝ ██║╚══██╔══╝██╔══██╗██║      "
echo "  ██║  ██║██║██║  ███╗██║   ██║   ███████║██║      "
echo "  ██║  ██║██║██║   ██║██║   ██║   ██╔══██║██║      "
echo "  ██████╔╝██║╚██████╔╝██║   ██║   ██║  ██║███████╗ "
echo "  ╚═════╝ ╚═╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝ "
echo "  BRIDGE — Lavoro · Competenze · Autonomia"
echo ""

# ─── Carica nvm se installato ────────────────────────────────────────────────
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
export PATH="$PATH:/usr/local/bin:/opt/homebrew/bin"

# ─── Installa Node.js se mancante ────────────────────────────────────────────
if ! command -v node &> /dev/null; then
  echo "  📦 Node.js non trovato — installazione automatica..."
  echo ""

  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    echo "  ⬇️  Installazione nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
  fi

  echo "  ⬇️  Installazione Node.js LTS..."
  nvm install --lts
  nvm use --lts
  echo ""
fi

NODE_VER=$(node --version)
echo "  ✓ Node.js $NODE_VER pronto"
echo ""

# ─── Vai nella cartella del progetto ─────────────────────────────────────────
cd "$APP_DIR"

# ─── Installa dipendenze se mancano ──────────────────────────────────────────
if [ ! -d "node_modules/react" ]; then
  echo "  📦 Installazione dipendenze app (solo la prima volta, ~2 min)..."
  echo ""
  npm install
  echo ""
fi

echo "  ✓ Dipendenze pronte"
echo ""

# ─── Apri browser dopo 4 secondi ─────────────────────────────────────────────
( sleep 4 && open "http://localhost:$PORTA" ) &

# ─── Avvia il server ─────────────────────────────────────────────────────────
echo "  🚀 Avvio su http://localhost:$PORTA"
echo "  Il browser si apre automaticamente tra qualche secondo."
echo "  Per fermare: CTRL+C"
echo ""
echo "──────────────────────────────────────────────────────────────"
echo ""

npm run dev
