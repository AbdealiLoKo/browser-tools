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

Many of these websites send information to a server.  
Some of them mention that the server info is deleted periodically in their privacy policy.  
Few of them are open source and can be reviewed.  
But more often than not - there is no clear way to audit these tools.

This project aims to create tools which does not require any server.  
Everything runs on the browser, on your computer.  
The code is also open sourced - so it can be audited to chck for security issues.

This project also tries to see to what level can we run things purely on a browser.  
With new technologies like webasm, rust, etc. which allow non-javascript code to be
run in a browser easily now - we try to see how many tools can be purely run on a
browser and what limitations exist.
