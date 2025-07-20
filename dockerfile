# espcificando a imagem do Node.js
FROM node:22.16.0

# especificando diretório de trabalho
WORKDIR /Minha-RotinaApp

# qual pasta deve copiar para as dependências do projeto
COPY package*.json ./
#comando para instalar dependências do projeto
RUN npm install

#copianod restate do projeto
COPY . .

# porta do projeto
EXPOSE 5173

# comando para inicar o projeto
CMD ["npm", "run", "dev"]

