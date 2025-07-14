#!/usr/bin/env bash
set -e
echo "Building the project..."
SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
pushd "$SCRIPT_DIR" >/dev/null

if ! command -v node >/dev/null; then
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  . "$NVM_DIR/nvm.sh"
  nvm install 22
fi

if [ -f package-lock.json ]; then
  echo "Using package-lock.json for npm ci"
  npm ci
else
  echo "No package-lock.json found, using npm install"
  npm install
fi
npm run build
echo "Build completed successfully."
# 'next build' + static export via config
popd >/dev/null