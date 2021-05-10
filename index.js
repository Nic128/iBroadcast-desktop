// In the main process.
const { BrowserWindow, app } = require('electron')

// Set a variable when the app is quitting.
let isQuiting = false;
let tray;
let win;

app.on('ready', () => {
  win = new BrowserWindow()

  // Load ibroadcast web player
  win.loadURL('https://media.ibroadcast.com')
  // Maximize window
  win.maximize()

  // On close, minimize and don't quit
  win.on('close', function (evt) {
    if (!isQuiting) {
      evt.preventDefault();
      win.hide()
    }
  });
});

app.on('before-quit', function (evt) {
  isQuiting = true;
});

// Clicking on dock shows the application
app.on('activate', function (evt) {
  win.show()
});
