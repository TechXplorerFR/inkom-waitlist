# Étape 1 : Build de l'application Vite
FROM node:20-alpine AS build
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Build de l'application
RUN npm run build

# Étape 2 : Conteneur Apache pour servir les fichiers statiques
FROM httpd:alpine

# Copier les fichiers buildés vers Apache
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# Configurer Apache pour le routing SPA
RUN echo '<IfModule mod_rewrite.c>' > /usr/local/apache2/htdocs/.htaccess && \
    echo '  RewriteEngine On' >> /usr/local/apache2/htdocs/.htaccess && \
    echo '  RewriteBase /' >> /usr/local/apache2/htdocs/.htaccess && \
    echo '  RewriteRule ^index\.html$ - [L]' >> /usr/local/apache2/htdocs/.htaccess && \
    echo '  RewriteCond %{REQUEST_FILENAME} !-f' >> /usr/local/apache2/htdocs/.htaccess && \
    echo '  RewriteCond %{REQUEST_FILENAME} !-d' >> /usr/local/apache2/htdocs/.htaccess && \
    echo '  RewriteRule . /index.html [L]' >> /usr/local/apache2/htdocs/.htaccess && \
    echo '</IfModule>' >> /usr/local/apache2/htdocs/.htaccess

# Activer mod_rewrite dans Apache
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf

# Exposer le port HTTP
EXPOSE 80

CMD ["httpd", "-D", "FOREGROUND"]
