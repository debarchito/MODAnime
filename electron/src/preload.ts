import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
	send(channel: string, data: string): void {
		ipcRenderer.send(channel, data);
	}
});
