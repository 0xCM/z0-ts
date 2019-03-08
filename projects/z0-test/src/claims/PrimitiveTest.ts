import {uint, Claim, List,UInt, ActionProvider} from "z0-core"

const format = (i: UInt) => 
    List.fold(List.map(i, x => x.toString()), (x,y) => x + y)

export function* claims() : ActionProvider{
    yield ["primitives/1", () =>{

        const value = uint(3469)
        Claim.equal(4,value.length)
        const text = format(value)
        Claim.equal("3469", text)
    }]
}