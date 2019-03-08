import {Claim, FileName, ExtensionName, FileDrive, ActionProvider} from "z0-core"

export function* claims() : ActionProvider {
    yield ["files/filename construction", () =>{    
        const fn = FileName.make("File1")
        const ext = ExtensionName.make("txt")
        const fnext = fn.append(ext)
        Claim.equal(fnext.toString(), "File1.txt")        
    }]

    yield ["files/drivename construction", () =>{
        const drive = FileDrive.make("C")
        Claim.equal("file:///C:/", `${drive}`)        
    }]
}