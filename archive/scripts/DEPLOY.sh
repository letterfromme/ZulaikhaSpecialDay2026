#!/bin/bash
# 🚀 DEPLOYMENT CHECKLIST

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "$REPO_ROOT"

echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║               ZULAIKHA BIRTHDAY 2026 - DEPLOYMENT CHECKLIST               ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check optimized HTML variant exists
echo "[1/5] Checking optimized HTML file..."
if [ -f "archive/variants/index-optimized.html" ]; then
    echo -e "${GREEN}✅ archive/variants/index-optimized.html found${NC}"
else
    echo -e "${RED}❌ archive/variants/index-optimized.html NOT found${NC}"
    exit 1
fi

# Step 2: Check images
echo "[2/5] Checking images..."
if [ -f "background.jpg" ] && [ -d "Images" ]; then
    echo -e "${GREEN}✅ Images found${NC}"
    echo "   Total size: $(du -sh . | cut -f1)"
else
    echo -e "${RED}❌ Images NOT found${NC}"
    exit 1
fi

# Step 3: Check audio
echo "[3/5] Checking audio file..."
if [ -f "HappyBirthdayAiqhaSong.mp3" ]; then
    SIZE=$(stat -f%z "HappyBirthdayAiqhaSong.mp3" 2>/dev/null || stat -c%s "HappyBirthdayAiqhaSong.mp3")
    SIZE_MB=$(echo "scale=2; $SIZE / 1048576" | bc)
    if (( $(echo "$SIZE_MB < 5" | bc -l) )); then
        echo -e "${GREEN}✅ Audio file OK (${SIZE_MB}MB)${NC}"
    else
        echo -e "${YELLOW}⚠️  Audio file large (${SIZE_MB}MB) - Consider compressing${NC}"
    fi
else
    echo -e "${RED}❌ Audio file NOT found${NC}"
    exit 1
fi

# Step 4: Check package.json for npm
echo "[4/5] Checking npm setup..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json found${NC}"
else
    echo -e "${YELLOW}⚠️  package.json not found${NC}"
fi

# Step 5: Check git
echo "[5/5] Checking git status..."
if [ -d ".git" ]; then
    echo -e "${GREEN}✅ Git repository found${NC}"
else
    echo -e "${YELLOW}⚠️  Git repository not initialized${NC}"
    echo "   Run: git init && git add . && git commit -m 'Initial commit'"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                         DEPLOYMENT OPTIONS                                ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "📋 OPTION 1: Quick Test (No deployment)"
echo "   1. Open: firefox archive/variants/index-optimized.html"
echo "   2. Press: F12 → Network tab"
echo "   3. Click: 💝 SELAMAT HARI ULANG TAHUN ZULAIKHA 💝 button"
echo "   4. Check: Load time < 2 seconds ✓"
echo ""

echo "📋 OPTION 2: Local Deployment"
echo "   1. Backup:  cp index.html index-old.html"
echo "   2. Deploy:  cp archive/variants/index-optimized.html index.html"
echo "   3. Compress: scripts/optimize-images.bat (or use TinyPNG)"
echo "   4. Test:    Open http://localhost:8080/index.html"
echo "   5. Verify:  DevTools Network < 1.5MB total"
echo ""

echo "📋 OPTION 3: GitHub Deployment (Recommended)"
echo "   1. Create GitHub repo (if not exists)"
echo "   2. Commit:  git add . && git commit -m 'Optimize for speed'"
echo "   3. Push:    git push origin main"
echo "   4. Setup:   Visit https://imgbot.io/app"
echo "   5. ImgBot auto-optimizes on every PR 🤖"
echo ""

echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                      PERFORMANCE EXPECTATIONS                             ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "📊 Target Metrics:"
echo "   • DOMContentLoaded: < 1.5s ✓"
echo "   • Page Load:        < 2s ✓"
echo "   • Speed Index:      < 1s ✓"
echo "   • Total Size:       < 1.5MB ✓"
echo "   • Lighthouse:       85+ ✓"
echo ""

echo "📱 Mobile Performance (4G):"
echo "   • Load Time:        < 3s ✓"
echo "   • Data Usage:       < 1MB ✓"
echo "   • Button Response:  Instant ✓"
echo ""

echo "✨ All checks complete! Ready for deployment!"
echo ""
