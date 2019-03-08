import {comma,pipe,replace,Claim, concat, ActionProvider} from "z0-core"

export function* claims() :ActionProvider {
    yield ["text/concat-1", () =>{
        const joined = concat(comma,3,4,5,6)
        Claim.equal(joined, "3,4,5,6")
    }]

    yield ["text/concat-2", () =>{
        const joined = concat(pipe,3,4,5,6)
        Claim.equal(joined,"3|4|5|6")
    }]

    yield ["text/replace-1", () =>{
        const input = "ab8xl391398cd7"
        const expect = "ab8xl000398cd7"
        const actual = replace(input, "391", "000")
        Claim.equal(expect, actual)
    }]    

    yield ["text/replace-1", () =>{
        const input = "ab8xl391398cd7"
        const expect = "ab8xlH91H98cd7"
        const actual = replace(input, "3", "H")
        Claim.equal(expect, actual)
    }]    

    yield ["text/replace-3", () =>{
        const input = "003238003384933"
        const expect = "0030380008490" 
        const actual = replace(input, ["33","2"], "0")
        Claim.equal(expect, actual)
    }]
}