# webapp-exe-electron
Helper for electron app generations with auto update

# pos-web-electron

To create electron exe with auto update, do the following steps:

1. Add given main.js file to your project.
2. Create package.json and add following lines

  ```
{
  name": "<Project Name>",
  "productname": "<Project Name>",
  "version": "<v2.0.0>",
  "author": " ",
  "description": " ",
  "main": "main.js",
  "scripts": {
    "start": "electron main.js",
    "build": "electron-builder . --win --x64 --ia32",
    "pack": "electron-builder . --dir",
    "dist": "electron-builder . --win --x64 --ia32 --publish always"
  },
  "build": {
    "appId": "com.electron.<Project Name>",
    "compression": "maximum",
     "publish": [
      {
        "provider": "generic",
        "url": "<URI of file server eg https://127.0.0.1:8080/ >"
      }
    ]
  }
}
```

3. Add electron builder(v 19.45.5) to developer Dependencies

```
yarn add electron-builder --dev
```

4. Add electron-updater (v ^2.16.1) as dependency

```
yarn add electron-updater
```

5. To publish, goto the corresponding root folder and type
```
yarn dist
```

6. Copy the files in dist/ directory to your webserver root directory

Note: 1. Following script can be included in frontend scripts to view update process in console

      ``` html
      <script>
			// Display the current version
			var version = window.location.hash.substring(1);
			const {ipcRenderer} = require('electron');
			ipcRenderer.on('message', function(event, text) {
				console.log(text);
				console.log('Updater Message');
			})
		</script>
      ```
      
      2. increasing version in package.json is necessary for update.
      
      3. Debugger can be called in build by pressing Ctrl+shift+J
    
      
     


