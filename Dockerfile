FROM node:latest
WORKDIR '/app'

COPY package.json .
RUN npm install
RUN npm install -g expo-cli
COPY . .

ADD f9c7f8757d3c194a.crt /app/xekappcert.crt
RUN chmod 644 /app/xekappcert.crt && update-ca-certificates

RUN expo build:web
CMD ["expo", "start", "--web"]
