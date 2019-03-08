import os from  "os"
import * as pty from "node-pty"
import * as proc from "process"

var shell = "ghci.exe"
const options : pty.IPtyForkOptions = {
     name:"xterm-color",
     cols:160,
     rows:30     
}
const process = pty.spawn(shell,[], options)
const handler = (data:string) => console.log(data)


process.on('data', handler)
process.write(":help\r")


setTimeout(() => process.write(":quit\r"), 5000);
