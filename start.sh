#!/bin/bash
declare -r environment="development"

# check for bun
if ! command -v bun &> /dev/null; then
    echo "Bun not found, installing Bun"
    if [ "$OSTYPE" == "linux-gnu"* ] || [ "$OSTYPE" == "darwin"* ]; then
        curl -fsSL https://bun.sh/install | bash
    else
        powershell -c "irm bun.sh/install.ps1|iex"
    fi
fi

if [ "$1" == "--clear" ] && [ environment == "development" ]; then
    echo "Deleting config.json"
    rm ./config.json
fi

bun install

bun run ./src/main.ts
