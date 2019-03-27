# Prisma Functions

## Install

```
$ yarn global add prisma apollo
```

## Admin

```
$ export SECRET=<secret>
$ prisma admin
```

## Develop

```
$ yarn build:watch
```

### Development server

```
$ yarn start
```

## Firebase Config

```
$ yarn firebase functions:config:set prisma.secret="prisma-service-secret"
```

## Deploy

```
$ deploy
```

## Deploy Prisma

```
$ prisma login
$ export SECRET=<secret>
$ prisma deploy
```
