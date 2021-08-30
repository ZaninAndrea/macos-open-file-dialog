const util = require("util")
const exec = util.promisify(require("child_process").exec)

async function openFile(prompt, allowedTypes) {
    let script
    if (allowedTypes) {
        const parsedTypes = allowedTypes.map((type) => `"${type}"`).join(",")
        script = `osascript -e 'tell application (path to frontmost application as text)
set myFile to choose file with prompt "${prompt}" of type {${parsedTypes}}
POSIX path of myFile
end'`
    } else {
        script = `osascript -e 'tell application (path to frontmost application as text)
set myFile to choose file with prompt "${prompt}"
POSIX path of myFile
end'`
    }

    const { stdout, stderr } = await exec(script)
    if (stderr !== "") throw new Error(stderr)

    return stdout.slice(0, stdout.length - 1)
}

// Not working because only the first file path is returned
async function openMultipleFiles(prompt, allowedTypes) {
    let script
    if (allowedTypes) {
        const parsedTypes = allowedTypes.map((type) => `"${type}"`).join(",")
        script = `osascript -e 'tell application (path to frontmost application as text)
set myFiles to choose file with prompt "${prompt}" of type {${parsedTypes}} with multiple selections allowed

repeat with myFile in myFiles
  copy POSIX path of myFile to stdout
end repeat

end'`
    } else {
        script = `osascript -e 'tell application (path to frontmost application as text)
set myFiles to choose file with prompt "${prompt}" with multiple selections allowed

repeat with myFile in myFiles
  copy POSIX path of myFile to stdout
end repeat

end'`
    }

    const { stdout, stderr } = await exec(script)
    console.log(stdout)
    if (stderr !== "") throw new Error(stderr)

    return stdout.slice(0, stdout.length - 1)
}

async function openFolder(prompt) {
    const { stdout, stderr } =
        await exec(`osascript -e 'tell application (path to frontmost application as text)
set myFile to choose folder with prompt "${prompt}"
POSIX path of myFile
end'`)
    if (stderr !== "") throw new Error(stderr)

    return stdout.slice(0, stdout.length - 1)
}

module.exports = { openFile, openFolder }
