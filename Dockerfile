# Use a imagem base oficial do Node.js
FROM node:22.2.0

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Compile o TypeScript
RUN npm run build

# Exponha a porta que o aplicativo irá rodar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
