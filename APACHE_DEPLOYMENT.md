# Apache Deployment Guide for Inkom Waitlist

## Overview
This project is a React Single Page Application (SPA) that uses client-side routing. When deployed on Apache, special configuration is needed to ensure all routes work correctly.

## The Problem
- Routes like `/privacy`, `/terms`, `/legal` work in development but return 404 errors on Apache
- This happens because Apache tries to find actual files at these paths, but they don't exist
- The routing is handled by React Router on the client side

## The Solution
The `.htaccess` file in the root directory contains the necessary Apache configuration to:
1. Redirect all non-file requests to `index.html`
2. Let React Router handle the client-side routing
3. Improve performance with compression and caching
4. Add security headers

## Deployment Steps

### 1. Build the Frontend
```bash
cd src/frontend
npm run build
```

### 2. Deploy to Apache
1. Copy the contents of `src/frontend/dist/` to your Apache web directory
2. Copy the `.htaccess` file to the same directory
3. Ensure Apache has the following modules enabled:
   - `mod_rewrite` (required)
   - `mod_deflate` (optional, for compression)
   - `mod_expires` (optional, for caching)
   - `mod_headers` (optional, for security headers)

### 3. Enable Apache Modules (if needed)
```bash
# On Ubuntu/Debian
sudo a2enmod rewrite
sudo a2enmod deflate
sudo a2enmod expires
sudo a2enmod headers
sudo systemctl restart apache2

# On CentOS/RHEL
# These are usually enabled by default, but check your httpd.conf
```

### 4. Verify Deployment
After deployment, test the following URLs:
- `https://yourdomain.com/` (should work)
- `https://yourdomain.com/privacy` (should now work)
- `https://yourdomain.com/terms` (should now work)
- `https://yourdomain.com/legal` (should now work)

## Directory Structure After Deployment
```
/var/www/html/ (or your web root)
├── .htaccess          # Apache configuration
├── index.html         # Main SPA entry point
├── assets/            # Built CSS, JS, and other assets
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── images/
├── vite.svg
├── robots.txt
└── sitemap.xml
```

## Troubleshooting

### Routes Still Return 404
1. Check if `.htaccess` file is in the correct directory (same as `index.html`)
2. Verify that `mod_rewrite` is enabled on Apache
3. Check Apache error logs for any configuration issues
4. Ensure `AllowOverride All` is set in your Apache virtual host configuration

### Files Not Loading
1. Check file paths in the browser developer tools
2. Verify all files were copied from the `dist` directory
3. Check Apache access logs for 404 errors on static assets

### Performance Issues
1. Verify compression is working (check response headers for `Content-Encoding: gzip`)
2. Check caching headers are being set correctly
3. Monitor Apache access logs for repeated requests for the same assets

## Security Considerations
The `.htaccess` file includes basic security headers. For production environments, consider:
- Setting up HTTPS (SSL/TLS certificates)
- Implementing Content Security Policy (CSP)
- Regular security updates for Apache and server OS
- Using a Web Application Firewall (WAF)

## Support
If you encounter issues:
1. Check Apache error logs: `sudo tail -f /var/log/apache2/error.log`
2. Check Apache access logs: `sudo tail -f /var/log/apache2/access.log`
3. Test with browser developer tools to see network requests