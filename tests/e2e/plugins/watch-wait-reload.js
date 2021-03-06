const delay = require('delay')
const WebSocket = require('ws')
const { join } = require('path')

// https://github.com/websockets/ws#simple-server
// create socket even if not watching files to avoid
// tripping up client trying to connect
const wss = new WebSocket.Server({ port: 8765 })
let client // future Cypress client

// watch files using chokidar
const chokidar = require('chokidar')
const { debounce } = require('debounce')
const cypressJson = require(join(process.cwd(), 'cypress.json'))
const options = cypressJson['cypress-watch-and-reload']
let watchPathOrPaths = options && options.watch

// utils to check type of options.watch
const isWatchPathString = typeof watchPathOrPaths === 'string'
const isWatchPathArray = Array.isArray(watchPathOrPaths) && watchPathOrPaths.length
const isWatchPathStringOrArray = (isWatchPathString || isWatchPathArray)

if (isWatchPathStringOrArray) {
  if (isWatchPathArray) {
    watchPathOrPaths = options.watch
      .map(path => `"${path}"`)
      .join(', ')
  } else { watchPathOrPaths = `"${watchPathOrPaths}"` }

  console.log('will watch %s', watchPathOrPaths)

  wss.on('connection', function connection (ws) {
    console.log('new socket connection 🎉')
    client = ws

    console.log('starting to watch file' + options.watch)
    // TODO clear previous watcher
    chokidar.watch(options.watch)
      .on('raw', debounce(
        async (event, path, details) => { // internal
          console.log('Raw event info:', event, path, details)
          if (options.delay) {
            await delay(options.delay)
          }
          if (client) {
            const text = JSON.stringify({
              command: 'reload',
              filename: path,
            })
            client.send(text)
          }
        },
        1500,
      ))
  })
} else {
  console.log(
    'nothing to watch. Use cypress.json to set "cypress-watch-and-reload" object',
  )
  console.log('see https://github.com/bahmutov/cypress-watch-and-reload#use')
}

exports.reload = function () {
  if (client) {
    const text = JSON.stringify({
      command: 'reload',
    })
    client.send(text)
  }
}
