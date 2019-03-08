import {claims} from "./claims"
import {List,iter, Try, notify, error, inform} from "z0-core"

const run = () =>{
    var good = 0
    var bad = 0
    iter(claims(), claim =>{
        const name = claim[0]
        const act = claim[1]
        try
        {
            act()
            notify(inform(`win ${++good}`, `${name}`))
        }
        catch(oopsie)
        {
            notify(error(`fail ${++bad}`, `${name} - ${oopsie.toString()}`))
        }
    })
}

run()

const testtuple = ["abc", () => {}]
const testtuple1 = ["abc", 34]
