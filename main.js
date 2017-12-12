const {
  app,
  BrowserWindow,
  Menu
} = require('electron');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 920,
    height: 700,
    minWidth: 920,
    minHeight: 700,
    icon: `file://${__dirname}/dist/assets/icons/logo.ico`
  });

  console.log(`file://${__dirname}/dist/index.html`);

  win.loadURL(`file://${__dirname}/dist/index.html`);

  // Remove the menu completly
  Menu.setApplicationMenu(null);

  // Open DevTools
  win.webContents.openDevTools();

  // Maximize the window
  //win.maximize();

  // Event when the window is closed.
  win.on('closed', function () {
    win = null;
  })
}
// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});
