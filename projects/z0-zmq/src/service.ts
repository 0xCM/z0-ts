
import {dispatch,stopDispatch} from "./dispatch"
import {receive,stopReceipt} from "./receive"
import * as k from "./contracts"
const read = require("readline")


const send = (data:string, connector : k.Connector) =>
{

    receive(connector, msg => console.log(msg.Data))
    dispatch({
        Channel: connector,
        Data: data,
        DataType: "text/plain"
    })
    
}

const main = () =>{

    const connector = {
        App: "tsclient",
        Url: `tcp://127.0.0.1:3549`
    }

    
    const timer = setInterval( () => 
        send("Hello, Socket World " + Date.now().toString(), connector), 500)



    const rl = read.createInterface({
    input: process.stdin,
    output: process.stdout
    })

    rl.question("Hit enter to quit", () =>{
        clearInterval(timer)
        stopReceipt()
        stopDispatch()
        rl.close()
        process.stdin.destroy()
        process.exit(0)

        
    })
}

main();
