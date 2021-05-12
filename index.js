/* eslint-disable-next-line import/no-extraneous-dependencies */
const { BrowserWindow, Menu, Tray, app } = require('electron');
const path = require('path');

// Set a variable when the app is quitting.
let isQuiting = false;
let win;
let tray;

app.on('ready', () => {
  tray = new Tray(path.join(__dirname, 'icon.png'));

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Show App',
        click() {
          win.show();
        },
      },
      {
        label: 'Quit',
        click() {
          isQuiting = true;
          app.quit();
        },
      },
    ])
  );

  win = new BrowserWindow();

  // Load ibroadcast web player
  win.loadURL('https://media.ibroadcast.com');
  // Maximize window
  win.maximize();

  // On close, minimize and don't quit
  win.on('close', (evt) => {
    if (!isQuiting) {
      evt.preventDefault();
      win.hide();
    }
  });

  win.on('minimize', (evt) => {
    evt.preventDefault();
    win.hide();
  });
});

app.on('before-quit', () => {
  isQuiting = true;
});

// Clicking on dock shows the application
app.on('activate', () => {
  win.show();
});
