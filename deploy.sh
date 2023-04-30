#!/usr/bin/env bash
set -e
yarn run build
scp -r ./dist/ zulipai:~/admin-frontend-dist/
