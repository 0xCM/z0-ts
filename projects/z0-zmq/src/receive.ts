import * as zmq from "zeromq"
import * as k from "./contracts"

const sources : Map<string, zmq.Socket> = new Map()

const connect = (c : k.Connector)  => {
    const s = zmq.socket("pull")
    s.connect(c.Url)
    return s;

}

export const receive = (c : k.Connector, r : k.Receiver) =>
{    
    const s = sources.has(c.Url)  ? sources.get(c.Url)  
    : connect(c)
    if(s != undefined)
    {
        s.on("message", data =>{
            r({
            Data: data.toString(),
            Channel: c,
            DataType: "text/plain"
                })})

        s.on("unbind", _ =>{
            r({
                Data: "Socket unbound",
                Channel: c,
                DataType: "status/info"
                    })})
                            
    }
}

export const stopReceipt = ()=>{
    for (const s of sources.values()) 
        s.close()
    sources.clear()                
}