import {Claim, ActionProvider,readYaml, FilePath, isRight, inform, notify, onRight, readText, fileExists} from "z0-core"
import * as Env from "../environs.json"

export function* claims(): ActionProvider {
    yield ["yaml/read-1", () =>{
                
        var yamlFile = FilePath.make(`${Env.AssetLocation}\\YamlTest.yaml`)
        Claim.isTrue(fileExists(yamlFile), `The file ${yamlFile} does not exist`)
        var yaml = readYaml(yamlFile)        
        Claim.isTrue(isRight(yaml))
        onRight(yaml, data => notify(inform("yaml-data", data)))
    }]
}
