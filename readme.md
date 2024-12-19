# APIM Admin Portal

This project using NestJS as backend side, and ReactJS as frontend side.

## Requirement

Before you develop this application, these stacks below needs to be installed on your device:

1. NodeJS 18 or above
2. Docker

## Start Development Environment

Before you start the development server do this below

1. Install dependencies for both backend and frontend service

```
yarn backend && yarn frontend
```

2. Copy .env file from .env.example file for both backend and frontend service

```
cd app/backend && cp .env.example .env
cd ../../
cd app/frontend && cp .env.example .env
cd ../../
```

Once you have done all the points above, you can run the development server

### Without Docker

```
yarn start:all:dev
```

Once all service running, you can open `http://localhost:3000` for frontend service, and `http://localhost:1321` for backend service

### With Docker

When you want to run the project using docker, you will be doing some additional steps

1. Execute this command to build the development docker image

```
yarn docker-compose build admin-portal
```

2. Run the services using this command below

```
yarn docker-compose up -d
```

For the development environment, 2 container should be running: `admin-portal`, `admin-portal-frontend`

3. You can see the service logs using this command

```
yarn docker-compose logs -f
```

## Start Production Environment

### With Docker

We recommend use docker to run the production environment.

1. Execute this command to build the production docker image

```
yarn docker-compose:prod build admin-portal
```

2. Run the services using this command below

```
yarn docker-compose:prod up -d adminportal
```

For the production environment, 1 container should be running: `admin-portal`

3. You can see the service logs using this command

```
yarn docker-compose:prod logs -f
```

## Dependency Used

1. [React Query](https://tanstack.com/query/v3/docs/framework/react/quick-start) for asynchronous state management
2. [Zustand](https://zustand-demo.pmnd.rs) for state management
