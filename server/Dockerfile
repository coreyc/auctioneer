FROM node:16.0.0
EXPOSE 3001

RUN mkdir -p /usr/src/app && chown node: /usr/src/app

USER node

WORKDIR /usr/src/app

# Configure the node environment to be configured at build-time
# NOTE: we override this in our docker-compose.yml
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Cache the dependency list independently of source code
COPY ./package.json /usr/src/app/
COPY ./package-lock.json /usr/src/app/

# Install dependencies based on the build-time
# configured NODE_ENV (i.e. w/ or w/o devDependencies)
RUN npm install

# Add the rest of the source code
COPY . /usr/src/app/

# Default to the production init script
# NOTE: we override this in our docker-compose.yml
CMD ["node", "npm start"]
