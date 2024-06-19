# navngiv første stage så vi kan referere til den længere nede
FROM node AS build

RUN mkdir /app
WORKDIR /app

# tilføj filer krævet for at installere dependencies
ADD angular.json /app
ADD tsconfig.app.json /app
ADD tsconfig.json /app
ADD package.json /app
ADD package-lock.json /app

# installer alle dependencies
RUN npm ci

# tilføj app'ens kildekode
ADD src/ /app/src
ADD public/ /app/public

# compile app'en. output bliver gemt i /app/dist
RUN npm run build

# start på ny fra en blank nginx image
FROM nginx

COPY --from=build /app/dist/frontend/browser/ /www
ADD nginx.conf /etc/nginx/conf.d/default.conf
