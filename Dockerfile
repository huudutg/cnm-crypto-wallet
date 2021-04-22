FROM node:12.6.0-alpine
WORKDIR /app

# install packages
COPY package.json package-lock.json ./
RUN npm ci --no-optional

# build app
COPY next.config.js next-env.d.ts tsconfig.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm run build

# remove source code
RUN rm -rf ./src

CMD npm start