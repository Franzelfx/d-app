#!/bin/bash

# Start Ganache in the background
ganache-cli > /dev/null 2>&1 &

# A more robust wait for Ganache to be ready (optional improvement)
until curl -s http://localhost:8545; do
    echo "Waiting for Ganache to launch..."
    sleep 1
done
echo "Ganache launched"

# Deploy the smart contracts
npx truffle migrate --network development

# Keep the container running
npm run start
