#imagem base do Node
FROM node:20

#cria diretório de trabalho
WORKDIR /app

#copia td
COPY . .

#instala dependencias
RUN npm install

#render no html a partir do seu yaml
RUN node bin/moo.js render

#abre porta 3000
EXPOSE 3000

#Comando para iniciar o servidor
RUN npm run dev
