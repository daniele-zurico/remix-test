# Introduction

The following repository is the non-js version of Fish Export Service to complaints with the GDS rules.

# Folder Structure

app/
--> components/ - contains all the base components of the app
--> composite-components/ - they usually use a set of base components (non-atomic)
--> helpers/ - contains all the helper functions
--> models/ - contains all the functions to interact with the server (orchestration and/or data-reader)
--> routes/ - contains all the routes of the app (\*)
--> styles/ - contains all the styles of the app (\*\*)
--> utils/ - contains all the utils of the app

(\*) The routes are the entry points of the app. Please use a flat structure when possible. Avoid to use index.tsx when possible
(\*\*) Most of the styles files in this folder are coming from "govuk-frontend" package and are the result of the

```
 "sass": "sass --watch ./node_modules/govuk-frontend/govuk:app/styles"
```

Avoid creating more styles if they already present in the govuk project

### Environment Variables

The environment variables are used to configure the app.

`touch .env`

Add contents of `.envSample` to `.env`

```
example:
LIMIT_ADD_SPECIES=100
```

### Start the application

---

mmo-cc-orchestration-svc
git checkout develop
git pull
npm i
npm run dev:without-auth

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.
