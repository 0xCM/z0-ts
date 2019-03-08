import * as fw from "chokidar"

const folders = ["C:/Dev/Tools/VsCode/data/user-data/logs"]
const watcher = fw.watch(folders).on("all", (event,path) =>{
    console.log(event,path)
})
