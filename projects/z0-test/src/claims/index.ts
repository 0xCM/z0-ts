import * as CT from "./CommonTest"
import * as FST from "./FileSystemTest"
import * as FT from "./FunctionTest"
import * as OT from "./OptionTest"
import * as PT from "./PrimitiveTest"
import * as ST from "./SeqTest"
import * as STRT from "./StreamTest"
import * as TT from "./TextTest"
import * as YT from "./YamlTest"

export function* claims(){
    
    for(const c of CT.claims())
        yield c

    for(const c of FST.claims())
        yield c

    for(const c of FT.claims())
        yield c
    
    for(const c of OT.claims())
        yield c
    
    for(const c of PT.claims())
        yield c

    for(const c of TT.claims())
        yield c

    for(const c of STRT.claims())
        yield c

    for(const c of ST.claims())
        yield c        

    for(const c of YT.claims())
        yield c        

}


