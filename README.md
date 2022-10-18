# Browser Tools

This repo contains a bunch of tools which run purely on the browser.  
It requires no server, and no installations.  

See [abdealijk.github.io/browser-tools](https://abdealijk.github.io/browser-tools/) to access the tools.

## Setup

To set this up in a local/developer environment:

```
npm install

# For a live server
npm run start
# Open browser at localhost:9000

# For a dev static build
npm run build:dev
# Open browser and navigate to dist/
```

## Objective

Many times, we look for tools online like simple PDF converters, SQL formatters, etc. while
working on our day to day tasks. And we just use the first search result we get for it.

We put in our files (sometimes with sensitive information) without really reviewing whether
that website is saving the information, sending it to a server, etc.

Many of these websites send information to a server and keep track of it.  
Many of them also say they delete the server information every few days.  
But more often than not - there is no clear way to audit these tools.

This project aims to create tools which does not require any server.  
Everything runs on the browser on your computer.  
The code is also open sourced - so it can be audited to chck for security issues.
