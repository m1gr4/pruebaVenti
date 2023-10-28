# pruebaVenti
# Utilizando docker
## command:
docker-compose up -d

## se crearan 3 contenedores:
## contenedor server_mongo
## contenedor frontend
## contenedor backend

# sin docker

## levantar los dos servicio:
## command:
cd frontend &&
npm i &&
npm run dev

## command:
cd backend &&
npm i &&
npm run dev

## Tiene que estar levantada la base de datos mongodb
## el servicio backend automaticamente genera el schema para la base de datos
