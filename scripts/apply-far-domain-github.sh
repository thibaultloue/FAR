#!/usr/bin/env bash
# Configure le domaine personnalisé sur GitHub Pages (API).
# Prérequis : un PAT avec scope « repo » (ou droit « Administration » du dépôt).
# Usage :
#   export GITHUB_TOKEN=ghp_xxxxxxxx
#   ./scripts/apply-far-domain-github.sh

set -euo pipefail
OWNER="thibaultloue"
REPO="FAR"
DOMAIN="far.thibaultloue.com"

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "Définis GITHUB_TOKEN (classic PAT : scope repo, ou fine-grained : Administration du dépôt)." >&2
  exit 1
fi

code="$(curl -sS -o /tmp/gh-pages-resp.json -w "%{http_code}" -X PUT \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/${OWNER}/${REPO}/pages" \
  -d "{\"cname\":\"${DOMAIN}\",\"https_enforced\":true,\"build_type\":\"workflow\"}")"

echo "HTTP ${code}"
cat /tmp/gh-pages-resp.json
echo

if [[ "$code" != "204" && "$code" != "201" ]]; then
  echo "Si tu obtiens 422 : ouvre une fois https://github.com/${OWNER}/${REPO}/settings/pages et vérifie que la source est « GitHub Actions »." >&2
  exit 1
fi

echo "OK — Domaine ${DOMAIN} enregistré côté GitHub Pages (HTTPS forcé). Vérifie le DNS (CNAME far → thibaultloue.github.io)."
