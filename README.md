# Parallel Handler Fisherman

> Execute the middlewares in parallel, not in chain.
> Copyright © 2017, Simon Sassi

The Parallel Handler can be useful for async stuff that can run in parallel

## Usage

Same as fisherman.use

```javascript
const fisherman = require("fisherman-discord.js")
var bot = new fisherman.Fisherman({ prefixes: ['test!'] })
const ParallelHandling = require("./lib/index")
var parallelHandling = new ParallelHandling()
parallelHandling.use({parallelHandle: function(router, callback){
    if(router.req.isCommand) console.log(router.req)
    callback()
}})
bot.use(parallelHandling)
```

## Creating a middleware compatible with the Parallel Handler

You have to add a function named `parallelHandle` inside your middleware class/object

`parallelHandle` is called with two arguments :

| Argument | Description |
| ---- | ---- |
| router | A router object (see doc below) |
| callback | an async callback (see doc below) |

### router

A simple object, with two properties:

* `req` : The fisherman request
* `res` : The fisherman response

### callback

A function that call back, where you can pass an error with `callback(err)`. You can of course pass `true` if you want to just block the middleware chain and don't trigger any fishercode

### The callback as to be trigerred, else, the middleware loop will be blocked

## Api

### parallelHandling.use(middleware)

Append a middleware to the Parallel Handler

## Badge

It's a simple badge to show that your middleware is compatible with the Parallel Handler
![badge](https://github.com/maxerbox/parallel-handle-fisherman/blob/master/badge.png)