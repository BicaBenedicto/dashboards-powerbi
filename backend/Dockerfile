FROM node:16-alpine
COPY --chown=node:node package.json .
RUN npm install
COPY --chown=node:node . .
EXPOSE 4000
USER node
CMD [ "npm", "start" ]
