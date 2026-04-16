# Imagem base
FROM node:20-alpine AS base
WORKDIR /app

# Estágio 1: Instalação de todas as dependências
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Estágio 2: Ambiente de Desenvolvimento (Hot Reload)
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Estágio 3: Dependências apenas de produção
FROM base AS production-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Estágio 4: Build da aplicação
FROM base AS build
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Estágio 5: Runner de Produção
FROM base AS runner
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["npm", "run", "start"]
