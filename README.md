# MacOS Open File Dialog

To install the utility use npm

```
npm i macos-open-file-dialog
```

You can then import and use the async utilities:

```javascript
const { openFile, openFolder } = require("macos-open-file-dialog")

const filePath = await openFile("Select a file")
const imagePath = await openFile("Select a photo", ["jpg", "jpeg", "png"])

const folderPath = await openFolder("Select a folder")
```
