# Simple Mediator

[![npm version](https://badge.fury.io/js/@virgilioneto/simple-mediator.svg)](https://badge.fury.io/js/simple-mediator)
[![Build Status](https://travis-ci.org/virgilioneto/simple-mediator.svg?branch=master)](https://travis-ci.org/virgilioneto/simple-mediator)
[![codecov](https://codecov.io/gh/virgilioneto/simple-mediator/branch/master/graph/badge.svg)](https://codecov.io/gh/virgilioneto/simple-mediator)

## Overview

This is a simple event stream mediator module.

## Install

```bash
npm install @virgilioneto/simple-mediator
```

## Using

### Simple usage

```javascript
// Load the mediator module
const SimpleMediator = require('@virgilioneto/simple-mediator')
// Get mediator context (use a default context when no context name given)
const defaultContext = SimpleMediator.getContext()

// Bind event on context
defaultContext.on('my-event', data => {
  /* Handle your code here */
})

// Bind once event on context
defaultContext.once('my-event-2', data => {
  /* This event will fire only once */
})

// Emit event to context
defaultContext.emit('my-event', { /* Put your data here */ })

// Emit event to context
defaultContext.emit('my-event-2', { /* Put your data here */ })
// This event will be ignored
defaultContext.emit('my-event-2', { /* Put your data here */ })
```

### Working with multiple contexts

```javascript
// Load the mediator module
const SimpleMediator = require('@virgilioneto/simple-mediator')
// Get mediator contexts
const context1 = SimpleMediator.getContext('context1')
const context2 = SimpleMediator.getContext('context2')

// Bind event on context1
context1.on('my-event', data => {
  /* Handle your code here */
})
// Bind event on context2
context2.on('my-event', data => {
  /* Handle your code here */
})

// Only context1 will be notified
context1.emit('my-event', { /* Put your data here */ })
// Only context2 will be notified
context2.emit('my-event', { /* Put your data here */ })
```


# Docs
[Simple Mediator](https://virgilioneto.github.io/simple-mediator)