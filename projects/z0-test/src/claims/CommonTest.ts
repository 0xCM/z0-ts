import {Claim, isSpecified, isUnspecifed,ActionProvider } from "z0-core";

export function* claims() : ActionProvider {
    yield ["common/isSpecified", () =>{

        const value : Uint8Array | undefined = Uint8Array.from([1,2,3,4,5])
        Claim.isTrue(isSpecified(value))
    
        var nonValue : Uint8Array | undefined = undefined
        Claim.isTrue(isUnspecifed(nonValue))    
    }]    
}