import {Seq,blank, Claim, ActionProvider } from "z0-core"

export function* claims() : ActionProvider{
    yield ["seq/1", () =>{

        const items = [1,2,3,4,5]
        const  seq = Seq.make(items);
        var counter = 0
        var text = blank
        for(const item of seq) 
        {
            text += item.toString()
            ++counter;
        }
    
        Claim.equal(5, counter)
        Claim.equal("12345", text)
    }]
}