#!/bin/bash

# Deploy script for Cloudflare Pages projects with no git connection

set -e

export CLOUDFLARE_ACCOUNT_ID=928c63e31d813db161f334371e0d44f6

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Projects with no git connection: "local-folder:cf-project-name"
projects=(
  "video-wisdom:video-wisdom"
  "tech-guide-writer:example-ai-tech-guide-writer"
  "notedash:notedash"
  "therapeutic-assistant:therapeutic-assistant"
  "resume-tailor:resume-tailor"
  "ai-email-agent:example-ai-email-agent"
  "api-sec-consultant:example-api-sec-consultant"
  "pseudocode-generator:example-pseudocode-generator"
  "dev-screener:example-dev-screener"
  "product-review-generator:example-product-review-generator"
  "excel-master:example-excel-master"
  "code-alchemist:code-alchemist"
  "text-summarizer:ai-text-summarizer"
)

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
success=()
failed=()

echo "========================================"
echo "Deploying ${#projects[@]} projects to Cloudflare Pages"
echo "========================================"
echo ""

for proj in "${projects[@]}"; do
  folder="${proj%%:*}"
  cfname="${proj##*:}"

  echo -e "${YELLOW}=== Deploying $folder -> $cfname ===${NC}"

  if [ ! -d "$folder" ]; then
    echo -e "${RED}Directory $folder not found, skipping${NC}"
    failed+=("$folder (not found)")
    continue
  fi

  cd "$folder"

  if pnpm install && pnpm run cf-build && wrangler pages deploy .vercel/output/static --project-name="$cfname"; then
    echo -e "${GREEN}Successfully deployed $folder${NC}"
    success+=("$folder")
  else
    echo -e "${RED}Failed to deploy $folder${NC}"
    failed+=("$folder")
  fi

  cd ..
  echo ""
done

echo "========================================"
echo "Deployment Summary"
echo "========================================"
echo -e "${GREEN}Successful: ${#success[@]}${NC}"
for s in "${success[@]}"; do
  echo "  - $s"
done

if [ ${#failed[@]} -gt 0 ]; then
  echo -e "${RED}Failed: ${#failed[@]}${NC}"
  for f in "${failed[@]}"; do
    echo "  - $f"
  done
fi

echo ""
echo "========================================"
echo "Project URLs"
echo "========================================"
echo "video-wisdom          -> https://videowisdom.langbase.dev"
echo "tech-guide-writer     -> https://ai-tech-guide-writer.langbase.dev"
echo "notedash              -> https://notedash.langbase.dev"
echo "therapeutic-assistant -> https://therapeutic-assistant.langbase.dev"
echo "resume-tailor         -> https://resume-tailor.langbase.dev"
echo "ai-email-agent        -> https://ai-email-agent.langbase.dev"
echo "api-sec-consultant    -> https://api-sec-consultant.langbase.dev"
echo "pseudocode-generator  -> https://pseudocode-generator.langbase.dev"
echo "dev-screener          -> https://dev-screener.langbase.dev"
echo "product-review-generator -> https://product-review-generator.langbase.dev"
echo "excel-master          -> https://excel-master.langbase.dev"
echo "code-alchemist        -> https://code-alchemist.langbase.dev"
echo "text-summarizer       -> https://ai-pipe-summarizer.langbase.dev"
