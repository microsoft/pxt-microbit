const {app, BrowserWindow, Menu} = require('electron')
const pxt = require('pxt-core')
const path = require('path')

let win

const cliPath = path.join(process.cwd(), "node_modules/pxt-microbit") 

function startServerAndCreateWindow() {
  pxt.mainCli(cliPath, ["serve", "-no-browser"])
  createWindow()
}

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "code the micro:bit"
  })
  Menu.setApplicationMenu(null)
  win.loadURL(`file://${__dirname}/index.html#local_token=${pxt.globalConfig.localToken}`)
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', startServerAndCreateWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
