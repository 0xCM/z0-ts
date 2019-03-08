import * as zmq from "zeromq"
import * as k from "./contracts"

const sinks : Map<string,zmq.Socket> = new Map()

const connect = (c : k.Connector)  => {
    const s = zmq.socket("push")
    s.bind(c.Url)
    sinks.set(c.Url, s)
    return s;

}

export const dispatch = (msg : k.Message) =>
{
    const s = sinks.has(msg.Channel.Url)  ? sinks.get(msg.Channel.Url)  
        : connect(msg.Channel)
    if(s != undefined)
        s.send(msg.Data)
    
}


export const stopDispatch = ()=>{
    for (const s of sinks.values())     
            s.close()
    
    sinks.clear()                        
}