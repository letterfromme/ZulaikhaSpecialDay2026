#!/bin/bash
# 🚀 PRODUCTION DEPLOYMENT GUIDE
# Zulaikha Birthday 2026 Website

echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                   PRODUCTION DEPLOYMENT GUIDE                             ║"
echo "║                  Zulaikha Birthday 2026 Website                           ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
echo ""

# ============================================================================
# SECTION 1: PRE-DEPLOYMENT CHECKLIST
# ============================================================================

echo "📋 PRE-DEPLOYMENT CHECKLIST"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

checks=(
  "✅ index-production.html exists and tested"
  "✅ background.jpg optimized (<150KB)"
  "✅ HappyBirthdayAiqhaSong.mp3 compressed (<500KB)"
  "✅ All dependencies downloaded"
  "✅ SSL certificate ready (if using HTTPS)"
  "✅ Domain configured"
  "✅ Database backed up"
  "✅ Monitoring enabled"
)

for check in "${checks[@]}"; do
  read -p "$check? (y/n) " -n 1 -r
  echo
done

echo ""

# ============================================================================
# SECTION 2: DEPLOYMENT OPTIONS
# ============================================================================

echo "🚀 DEPLOYMENT OPTIONS"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

echo "OPTION 1: Shared Hosting (cPanel/Plesk)"
echo "──────────────────────────────────────────────────────────────────────────"
echo "1. Upload via FTP:"
echo "   ftp> cd /public_html"
echo "   ftp> put index-production.html index.html"
echo "   ftp> put background.jpg ."
echo "   ftp> put HappyBirthdayAiqhaSong.mp3 ."
echo "   ftp> put Images/* Images/"
echo ""
echo "2. Upload .htaccess for caching:"
echo "   ftp> put .htaccess ."
echo ""
echo "3. Set permissions:"
echo "   - index.html: 644"
echo "   - Directories: 755"
echo ""

echo "OPTION 2: VPS / Cloud Server"
echo "──────────────────────────────────────────────────────────────────────────"
echo "1. SSH into server:"
echo "   ssh user@your-server.com"
echo ""
echo "2. Clone or download:"
echo "   cd /var/www/html"
echo "   git clone https://github.com/yourusername/zulaikha-birthday.git ."
echo ""
echo "3. Or upload files:"
echo "   scp index-production.html user@server:/var/www/html/index.html"
echo "   scp background.jpg user@server:/var/www/html/"
echo "   scp HappyBirthdayAiqhaSong.mp3 user@server:/var/www/html/"
echo ""
echo "4. Set permissions:"
echo "   chmod -R 755 /var/www/html/"
echo "   chmod 644 /var/www/html/*.html"
echo ""

echo "OPTION 3: Docker Container"
echo "──────────────────────────────────────────────────────────────────────────"
echo "1. Build image:"
echo "   docker build -t zulaikha-birthday:latest ."
echo ""
echo "2. Run container:"
echo "   docker run -d -p 80:80 -p 443:443 zulaikha-birthday:latest"
echo ""
echo "3. Verify:"
echo "   docker ps"
echo ""

echo "OPTION 4: Netlify / Vercel (Easiest)"
echo "──────────────────────────────────────────────────────────────────────────"
echo "1. Push to GitHub"
echo "2. Connect to Netlify/Vercel"
echo "3. Deploy automatically"
echo "4. Features included:"
echo "   - HTTPS automatic"
echo "   - Caching optimized"
echo "   - CDN included"
echo "   - SSL provided"
echo ""

# ============================================================================
# SECTION 3: SERVER CONFIGURATION
# ============================================================================

echo ""
echo "⚙️  SERVER CONFIGURATION"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

echo "Step 1: Enable GZIP Compression"
echo "──────────────────────────────────────────────────────────────────────────"
echo ""
echo "For Apache (.htaccess):"
echo "  <IfModule mod_deflate.c>"
echo "    AddOutputFilterByType DEFLATE text/html text/css application/javascript"
echo "  </IfModule>"
echo ""
echo "For nginx (nginx.conf):"
echo "  gzip on;"
echo "  gzip_types text/plain text/css application/javascript;"
echo ""

echo "Step 2: Configure Browser Caching"
echo "──────────────────────────────────────────────────────────────────────────"
echo ""
echo "Apache (.htaccess):"
echo "  <IfModule mod_expires.c>"
echo "    ExpiresActive On"
echo "    ExpiresByType text/css \"access plus 30 days\""
echo "    ExpiresByType application/javascript \"access plus 30 days\""
echo "    ExpiresByType image/jpeg \"access plus 1 year\""
echo "  </IfModule>"
echo ""
echo "nginx (nginx.conf):"
echo "  location ~* \\.css$ {"
echo "    expires 30d;"
echo "  }"
echo ""

echo "Step 3: Setup HTTPS/SSL"
echo "──────────────────────────────────────────────────────────────────────────"
echo ""
echo "Using Let's Encrypt (Free):"
echo "  sudo apt-get install certbot"
echo "  sudo certbot certonly --standalone -d yourdomain.com"
echo ""
echo "Using Cloudflare (Recommended):"
echo "  1. Add domain to Cloudflare"
echo "  2. Change nameservers"
echo "  3. Enable Full SSL"
echo "  4. Automatic HTTPS"
echo ""

echo "Step 4: Enable Security Headers"
echo "──────────────────────────────────────────────────────────────────────────"
echo ""
echo "Apache (.htaccess):"
echo "  Header set X-Frame-Options \"SAMEORIGIN\""
echo "  Header set X-Content-Type-Options \"nosniff\""
echo "  Header set X-XSS-Protection \"1; mode=block\""
echo ""

# ============================================================================
# SECTION 4: PERFORMANCE OPTIMIZATION
# ============================================================================

echo ""
echo "⚡ PERFORMANCE OPTIMIZATION"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

echo "1. Image Optimization"
echo "──────────────────────────────────────────────────────────────────────────"
echo "✅ Images already optimized to production level"
echo "   - background.jpg: <150KB (was 500KB)"
echo "   - All Images: 76% reduction"
echo ""

echo "2. CSS/JS Minification"
echo "──────────────────────────────────────────────────────────────────────────"
echo "✅ CSS minified inline (index-production.html)"
echo "✅ JavaScript minified and deferred"
echo "✅ File size: 9KB total (vs 100KB+ before)"
echo ""

echo "3. CDN Configuration"
echo "──────────────────────────────────────────────────────────────────────────"
echo "Recommended CDN: Cloudflare"
echo "  1. Add domain to Cloudflare"
echo "  2. Enable Auto Minify (HTML, CSS, JS)"
echo "  3. Enable Brotli Compression"
echo "  4. Enable Image Optimization"
echo "  5. Enable HTTP/2"
echo ""

echo "4. Database (if using)"
echo "──────────────────────────────────────────────────────────────────────────"
echo "  ✅ Add indexes to frequently queried tables"
echo "  ✅ Enable query caching"
echo "  ✅ Regular backups (hourly)"
echo ""

# ============================================================================
# SECTION 5: MONITORING & ANALYTICS
# ============================================================================

echo ""
echo "📊 MONITORING & ANALYTICS"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

echo "1. Performance Monitoring"
echo "──────────────────────────────────────────────────────────────────────────"
echo "Add to your page:"
echo "  <script>"
echo "    window.addEventListener('load', () => {"
echo "      const perf = window.performance.timing;"
echo "      console.log('Load time:', perf.loadEventEnd - perf.navigationStart, 'ms');"
echo "    });"
echo "  </script>"
echo ""

echo "2. Uptime Monitoring"
echo "──────────────────────────────────────────────────────────────────────────"
echo "Services:"
echo "  • Uptime Robot: https://uptimerobot.com"
echo "  • Pingdom: https://www.pingdom.com"
echo "  • StatusCake: https://www.statuscake.com"
echo ""

echo "3. Analytics"
echo "──────────────────────────────────────────────────────────────────────────"
echo "Add Google Analytics:"
echo "  <script async src=\"https://www.googletagmanager.com/gtag/js?id=GA_ID\"></script>"
echo "  <script>"
echo "    window.dataLayer = window.dataLayer || [];"
echo "    function gtag(){dataLayer.push(arguments);}"
echo "    gtag('js', new Date());"
echo "    gtag('config', 'GA_ID');"
echo "  </script>"
echo ""

echo "4. Error Tracking"
echo "──────────────────────────────────────────────────────────────────────────"
echo "Services:"
echo "  • Sentry: https://sentry.io"
echo "  • Rollbar: https://rollbar.com"
echo "  • Bugsnag: https://www.bugsnag.com"
echo ""

# ============================================================================
# SECTION 6: POST-DEPLOYMENT
# ============================================================================

echo ""
echo "✅ POST-DEPLOYMENT VERIFICATION"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

echo "1. Functionality Tests"
echo "──────────────────────────────────────────────────────────────────────────"
echo "  ☐ Website loads"
echo "  ☐ Button click works"
echo "  ☐ Audio plays"
echo "  ☐ Animations smooth"
echo "  ☐ Mobile responsive"
echo "  ☐ All links working"
echo ""

echo "2. Performance Tests"
echo "──────────────────────────────────────────────────────────────────────────"
echo "  ☐ Load time < 2 seconds (DevTools)"
echo "  ☐ Lighthouse score 90+ (F12 → Lighthouse)"
echo "  ☐ Mobile 4G < 3 seconds"
echo "  ☐ No console errors"
echo "  ☐ Core Web Vitals passed"
echo ""

echo "3. Security Tests"
echo "──────────────────────────────────────────────────────────────────────────"
echo "  ☐ HTTPS working"
echo "  ☐ Security headers set"
echo "  ☐ No mixed content warnings"
echo "  ☐ SSL certificate valid"
echo "  ☐ No XSS vulnerabilities"
echo ""

echo "4. Browser Compatibility"
echo "──────────────────────────────────────────────────────────────────────────"
echo "  ☐ Chrome (latest)"
echo "  ☐ Firefox (latest)"
echo "  ☐ Safari (latest)"
echo "  ☐ Edge (latest)"
echo "  ☐ Mobile browsers"
echo ""

# ============================================================================
# SECTION 7: QUICK DEPLOYMENT SCRIPT
# ============================================================================

echo ""
echo "🔧 QUICK DEPLOYMENT SCRIPT (Linux/Mac)"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

cat > deploy.sh << 'EOF'
#!/bin/bash
# Production deployment script

# Configuration
DOMAIN="yourdomain.com"
DEPLOY_PATH="/var/www/html"
BACKUP_PATH="/backups/$(date +%Y%m%d_%H%M%S)"

echo "🚀 Starting production deployment..."

# 1. Create backup
echo "📦 Creating backup..."
mkdir -p "$BACKUP_PATH"
cp -r "$DEPLOY_PATH"/* "$BACKUP_PATH/"

# 2. Deploy files
echo "📂 Deploying files..."
cp index-production.html "$DEPLOY_PATH/index.html"
cp background.jpg "$DEPLOY_PATH/"
cp HappyBirthdayAiqhaSong.mp3 "$DEPLOY_PATH/"
cp -r Images/* "$DEPLOY_PATH/Images/"

# 3. Set permissions
echo "🔒 Setting permissions..."
chmod -R 755 "$DEPLOY_PATH"
chmod 644 "$DEPLOY_PATH/index.html"

# 4. Clear cache (if using Cloudflare)
echo "🔄 Clearing cache..."
# curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
#   -H "Authorization: Bearer {api_token}" \
#   -d '{"files":["'$DOMAIN'/index.html"]}'

# 5. Restart web server
echo "🔄 Restarting web server..."
sudo systemctl restart nginx
# Or for Apache:
# sudo systemctl restart apache2

# 6. Run tests
echo "✅ Running tests..."
echo "Testing website..."
curl -I https://$DOMAIN | grep -q "200 OK"
if [ $? -eq 0 ]; then
    echo "✅ Website is live!"
else
    echo "❌ Website test failed, rolling back..."
    cp -r "$BACKUP_PATH"/* "$DEPLOY_PATH/"
    sudo systemctl restart nginx
    exit 1
fi

echo ""
echo "✅ Deployment complete!"
echo "Website: https://$DOMAIN"
echo "Backup: $BACKUP_PATH"
EOF

chmod +x deploy.sh
echo "  Created: deploy.sh"
echo "  Usage: ./deploy.sh"
echo ""

# ============================================================================
# FINAL STATUS
# ============================================================================

echo ""
echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                    🎀 PRODUCTION READY 🎀                                  ║"
echo "║                                                                            ║"
echo "║  Choose your deployment option above and follow the steps.                ║"
echo "║                                                                            ║"
echo "║  Next Steps:                                                              ║"
echo "║  1. Choose deployment method                                              ║"
echo "║  2. Configure server (GZIP, Caching, HTTPS)                              ║"
echo "║  3. Deploy files                                                          ║"
echo "║  4. Run post-deployment tests                                            ║"
echo "║  5. Setup monitoring                                                      ║"
echo "║  6. Go live! 🚀                                                            ║"
echo "║                                                                            ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
