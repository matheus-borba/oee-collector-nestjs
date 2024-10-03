# Use a imagem Node.js 20.17.0
FROM node:20.17.0

# Define o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY ./oee-data-collector-nodejs/package.json ./oee-data-collector-nodejs/package-lock.json ./
RUN npm install

COPY ./next-app .

# Construa o projeto Next.js
RUN npm run build

# Exponha a porta que o Next.js usará
EXPOSE 3000

# Comando para iniciar o Next.js
CMD ["npm", "start"]
