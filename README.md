# Functions

## Config

```
$ yarn firebase functions:config:set prisma.secret="prisma-service-secret"
```

## Develop

```
$ firebase functions:config:get > .runtimeconfig.json
$ yarn firebase serve --only functions
```

## Deploy

```
$ yarn firebase deploy --only functions
```

## Deploy Rrisma

```
$ prisma login
$ prisima deploy
```
