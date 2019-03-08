import { Claim, point,formatPoint, func,apply, ActionProvider} from "z0-core";

export function* claims() :ActionProvider {
    yield ["functions", () =>{

        const pt4 = point([false,4,"3",7])
        Claim.equal(4, pt4.n)    
        Claim.equal(false, pt4.x1)
        Claim.equal(4, pt4.x2)
        Claim.equal("3", pt4.x3)
        Claim.equal(7, pt4.x4)
    
        const pt3 = point([8,9,10])
        Claim.equal(3, pt3.n)
        Claim.equal(8, pt3.x1)
        Claim.equal(9, pt3.x2)
        Claim.equal(10, pt3.x3)
        
        const fmt = formatPoint(pt3)
        Claim.equal("(8,9,10)",fmt)
            
        const f2  = (x: string, y: string) => x + y
        const p2 = point(["3","7"])
        Claim.equal(2, p2.n)
        Claim.equal("3", p2.x1)
        Claim.equal("7", p2.x2)
        const f2Lift = func(2,f2);
        Claim.equal(2, f2Lift.n)
        Claim.equal("37", apply({n:2,f:f2}, p2))
    }]
}