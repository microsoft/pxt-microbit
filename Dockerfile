FROM node:10

COPY package.json .
RUN npm install
COPY . .
RUN node node_modules/pxt-core/built/pxt.js staticpkg -m
RUN npm install -g http-server
RUN cd built/packaged && ln -s docs/static static
CMD ["http-server", "-c-1", "built/packaged"]
