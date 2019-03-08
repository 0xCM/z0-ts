import {isSome, some, Claim, isNone, none, Option, ActionProvider} from "z0-core"

export function* claims():ActionProvider {
    yield ["options/1", () =>{
        const value = some(3);
        const result = Option.map(value, x => x*3)
        Claim.isTrue(isSome(result))
        Claim.isFalse(isNone(result))
        Claim.equal(result, some(9))
    }]

    yield ["options/2", () =>{
        const value  = none<string>()
        const result = Option.map(value, x => x + "xyz")
        Claim.isTrue(isNone(result))
        Claim.isFalse(isSome(result))
    }]

    yield ["options/3", () =>{
        const value  = some(["a","b","c"])    
        const result = Option.map(value, x => [x[0] + "b", x[1] + "c", x[2] + "d"]);
        Claim.equal(result, some(["ab", "bc", "cd"]))        
    }]
    
    yield ["options/4", () =>{
        const value = none<string>()
        const result = Option.map(value, x => x + "aa", () => "bb")
        Claim.equal(result, "bb")
    }]
}