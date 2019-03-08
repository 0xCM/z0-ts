import {FileNav, right,Potential,isSome, FileDrive, DriveLetter, FileKind, FolderPath, FileInfo, FilePath, Seq, Option, Try,notify,error} from "."
import fs from "fs"
import { URL } from "url";
import {map,filter} from "./List"
import { ErrorInfo } from "./Try";

/**
 * Instantiates a local file system navigator
 */
export function local() : FileNav
{
    return {
        drives : () => 
            Seq.empty<FileDrive>(),
        folders : (start,filter,recursive) => 
            Seq.empty<FolderPath>(),
        files : (start,filter,recursive) => 
            Seq.empty<FilePath>()
    }
}

/**
 * Describes a file system object
 * @param location The location of the object
 * @param name The name of the object relative to specified location
 */
const describe = (location : FileDrive | FolderPath, name = "") : Potential<FileInfo> =>
{
    try
    {
        var path = `${location}${name}`        
        const stats = fs.statSync(new URL(path))
        const isFolder = stats.isDirectory()
        return {
            path: isFolder ? FolderPath.make(path) : FilePath.make(path),
            kind: isFolder ? FileKind.Folder : FileKind.File,
            size: stats.size,
            changed: stats.ctime
        }
    }
    catch(e)
    {
    
        notify(error("errors/io/fileinfo",e))
        return undefined;
    }
}

export function folders(root: DriveLetter | FileDrive | FolderPath) 
    {
        const src = root instanceof FolderPath ?  root : 
                    root instanceof FileDrive ? root :
                    new FileDrive(root)
        var url = new URL(src.toString())
        var all = map(fs.readdirSync(url), name =>  describe(src,name))    
        var valid = filter(all, a => isSome(a))
        var values = map(valid, Option.unwrap)                 
        return map(filter(values, item => item.kind == FileKind.Folder), 
            item => <FolderPath> item.path)
    }
    
/**
 * Attempts to read the contents of a text file and returns an R-value on success
 * @param src The path to the file
 * @param encoding The the text encoding
 */
export const read = (src: FilePath, encoding: "utf8" | "ascii" = "utf8") =>
    Try(() => right<ErrorInfo,string>(fs.readFileSync(src.name, encoding)))
