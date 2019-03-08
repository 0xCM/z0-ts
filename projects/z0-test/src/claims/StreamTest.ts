import { take,evaluate,Claim, ActionProvider } from "z0-core";

export function* claims() :ActionProvider {
    yield ["streams/1", () =>{
        const data = ["3","7","1","99","AF"]
        const taken = evaluate(take(data,3))
        Claim.equal(["3","7","1"], taken)
    }]
}