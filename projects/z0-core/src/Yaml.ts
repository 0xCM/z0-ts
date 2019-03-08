import { FilePath, mapRight} from ".";
import * as fr from "./FileRead"
import { Try, ErrorInfo } from "./Try";
import { Either } from "./Either";

export const readYaml = (location: FilePath) : Either<ErrorInfo,string> =>
    Try(() => mapRight(fr.readText(location, "utf8"), data => data))
