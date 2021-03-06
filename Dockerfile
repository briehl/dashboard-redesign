# For installing npm dependencies and building static css/js
FROM node:10-alpine
COPY ./webpack.config.js ./tsconfig.json ./package.json yarn.lock /app/
COPY src /app/src
WORKDIR /app

# Install npm dependencies and build static css/js
ENV PRODUCTION=true
RUN yarn run build && rm -rf node_modules

# Set up python
FROM python:3.7-alpine
# FROM kbase/kb_python:python3
COPY --from=0 /app /app
COPY requirements.txt /app
WORKDIR /app

RUN apk add --no-cache openssl

RUN apk --update add --virtual build-dependencies python3-dev build-base && \
    pip install --upgrade pip && \
    pip install --upgrade --no-cache-dir -r requirements.txt && \
    apk del build-dependencies

ENV PYTHONPATH=/app

CMD ["python", "/app/src/server.py"]
