# Production Deployment Configuration

## .htaccess (Apache Server)
# Place in root directory for production server

```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain text/html text/xml
  AddOutputFilterByType DEFLATE text/css text/javascript
  AddOutputFilterByType DEFLATE application/xml application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching for static assets
<IfModule mod_expires.c>
  ExpiresActive On
  
  # HTML - Cache for 1 hour
  ExpiresByType text/html "access plus 1 hour"
  
  # CSS & JS - Cache for 30 days
  ExpiresByType text/css "access plus 30 days"
  ExpiresByType application/javascript "access plus 30 days"
  ExpiresByType text/javascript "access plus 30 days"
  
  # Images - Cache for 1 year
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  
  # Fonts - Cache for 1 year
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  
  # Audio - Cache for 30 days
  ExpiresByType audio/mpeg "access plus 30 days"
  ExpiresByType audio/mp3 "access plus 30 days"
</IfModule>

# Add Cache-Control headers
<IfModule mod_headers.c>
  # Cache HTML for 1 hour
  <FilesMatch "\.html?$">
    Header set Cache-Control "max-age=3600, public"
  </FilesMatch>
  
  # Cache CSS/JS for 30 days
  <FilesMatch "\.(js|css)$">
    Header set Cache-Control "max-age=2592000, public"
  </FilesMatch>
  
  # Cache images for 1 year
  <FilesMatch "\.(jpg|jpeg|png|gif|webp)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
  
  # Cache fonts for 1 year
  <FilesMatch "\.(ttf|otf|woff|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
  
  # Cache audio for 30 days
  <FilesMatch "\.(mp3|wav)$">
    Header set Cache-Control "max-age=2592000, public"
  </FilesMatch>
  
  # Add security headers
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Enable mod_rewrite for clean URLs
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Remove .html extension
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)\.html$ /$1 [L,R=301]
  
  # Redirect to .html if exists
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
</IfModule>

# Deny access to sensitive files
<FilesMatch "^\.(git|env|htaccess)">
  Order allow,deny
  Deny from all
</FilesMatch>

# Enable HTTPS redirect
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

## nginx Configuration (Alternative)

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    root /var/www/html;
    
    # SSL Configuration
    ssl_certificate /etc/ssl/certs/your_cert.pem;
    ssl_certificate_key /etc/ssl/private/your_key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/rss+xml application/javascript;
    gzip_min_length 1000;
    
    # Browser caching
    location ~* \.(jpg|jpeg|png|gif|ico|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location ~* \.(css|js)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
    
    location ~* \.(ttf|otf|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location ~* \.(mp3|wav)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
    
    # HTML caching
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    # Main entry
    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}

# HTTP redirect to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## Docker Configuration (Optional)

```dockerfile
FROM nginx:alpine

# Copy optimized files
COPY index-production.html /usr/share/nginx/html/index.html
COPY background.jpg /usr/share/nginx/html/
COPY Images/ /usr/share/nginx/html/Images/
COPY HappyBirthdayAiqhaSong.mp3 /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
```

## Cloudflare Configuration (Recommended)

For best performance, enable in Cloudflare:

1. **Caching Rules:**
   - HTML: Cache for 1 hour
   - Images: Cache for 1 year
   - CSS/JS: Cache for 30 days

2. **Performance:**
   - Auto Minify: HTML, CSS, JS
   - Brotli Compression: Enabled
   - Image Optimization: Enabled
   - Rocket Loader: Enabled

3. **Security:**
   - Always Use HTTPS: On
   - SSL/TLS: Full Strict
   - Min TLS: 1.2

4. **Workers (Optional):**
   Create cache buster for deployments

## Performance Checklist

- [ ] GZIP compression enabled
- [ ] Browser caching configured
- [ ] Security headers set
- [ ] HTTPS enabled
- [ ] Image optimization applied
- [ ] CSS/JS minified
- [ ] Audio compressed
- [ ] .htaccess deployed
- [ ] CDN configured (if using)
- [ ] Monitoring enabled

## Deployment Steps

1. **Prepare Server:**
   ```bash
   sudo apt-get update
   sudo apt-get install nginx certbot python3-certbot-nginx
   ```

2. **Deploy Files:**
   ```bash
   cp index-production.html /var/www/html/index.html
   cp background.jpg /var/www/html/
   cp HappyBirthdayAiqhaSong.mp3 /var/www/html/
   cp Images/* /var/www/html/Images/
   sudo chmod -R 755 /var/www/html/
   ```

3. **Setup SSL:**
   ```bash
   sudo certbot certonly --nginx -d yourdomain.com
   ```

4. **Enable HTTPS:**
   Update nginx config with SSL paths

5. **Restart Service:**
   ```bash
   sudo systemctl restart nginx
   ```

## Monitoring

Add to your monitoring:
- Page load time (target: <2s)
- Lighthouse score (target: 90+)
- Core Web Vitals
- Error rates
- Uptime percentage

## Rollback Plan

If issues occur:
```bash
# Revert to previous version
cp index-old.html /var/www/html/index.html
sudo systemctl restart nginx
```

---

**Production Status: READY FOR DEPLOYMENT** ✅
