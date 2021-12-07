import { app, BrowserWindow, ipcMain } from 'electron';
import { resolve } from 'path';
import server from './server.js';

const production = process.env.NODE_ENV === 'production';

class MODAnime {
  public modanime: BrowserWindow;
  constructor() {
    this.modanime = new BrowserWindow({
      icon: './frontend/static/favicon.png',
      backgroundColor: '#1A202C',
      width: 800,
      height: 600,
      minWidth: 600,
      minHeight: 600,
      show: false,
      frame: production ? false : true,
      webPreferences: {
        contextIsolation: true,
        preload: resolve(resolve(), './electron/dist/preload.js')
      }
    });
    if(production) this.modanime.setMenu(null);
    this.modanime.loadURL('http://localhost:40072');
  }

  minimize(): void {
    this.modanime.minimize();
  }

  resize(): void {
    if(this.modanime.isMaximized()) this.modanime.unmaximize();
    else this.modanime.maximize();
  }

  destroy(): void {
    this.modanime.destroy();
  }

  ready(func: () => void): void {
    this.modanime.once('ready-to-show', (): void => {
      this.modanime.show();
      func();
    });
  }
}

app.whenReady().then(() => {
  const modanime = new MODAnime();
  modanime.ready(() => {
    ipcMain.on('titlebar', (_, command: string): void => {
      if(command === 'destroy') {
        modanime.destroy();
        app.quit();
      }
      else if(command === 'minimize') modanime.minimize();
      else if(command === 'resize') modanime.resize();
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('quit', () => {
  if (server) server.kill('SIGINT');
});
