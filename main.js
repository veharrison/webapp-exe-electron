const fs = require('fs')
const os = require('os')
const path = require('path')
const electron = require('electron')
const http = require('http')
const ipc = electron.ipcMain
const {app, BrowserWindow, globalShortcut, dialog} = electron
const options = {extraHeaders: 'pragma: no-cache\n'}
const autoUpdater = require("electron-updater").autoUpdater

function sendStatusToWindow(text) {
  win.webContents.send('message', text);
}

function createWindow () {
    // Create the browser window
    win = new BrowserWindow({width: 800, height: 600})
    win.maximize();

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`, options)

    const ses = win.webContents.session;

    ses.clearCache(function(){
        console.log('Cache Cleared.');
    });

    ses.clearHostResolverCache(function(){
        console.log('Cache Cleared.');
    })

    const ret = globalShortcut.register('CommandOrControl+Shift+J', () => {
        win.webContents.openDevTools();
    })

    if (!ret) {
        console.log('Debugger Registration failed.');
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        ses.clearCache(function(){
            console.log('Cache Cleared.');
        });

        ses.clearHostResolverCache(function(){
            console.log('Cache Cleared.');
        });

        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

      autoUpdater.checkForUpdates();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  sendStatusToWindow('Download progress...');
})
autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
});

autoUpdater.on('update-downloaded', (ev, info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  setTimeout(function() {
    autoUpdater.quitAndInstall();  
  }, 5000)
})
