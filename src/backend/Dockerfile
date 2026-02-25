# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

# Installer toutes les dépendances (y compris dev pour build)
RUN npm install

# Copier le code source
COPY src ./src
COPY data ./data

# Générer le client Prisma
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copier package.json pour les dépendances de production
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --production

# Copier les fichiers buildés depuis l'étape de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/data ./data
COPY --from=build /app/prisma ./prisma

# Variables d'environnement par défaut (overridable)
ENV NODE_ENV=production
ENV PORT=3000

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/src/index.js"]
