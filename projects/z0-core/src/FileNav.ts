import {FileDrive, FolderPath, FilePath, Computable} from "."

export interface FileNav
{
    /**
     * Computes the file system drives
     */
    drives : () => Computable<FileDrive>   
    
    /**
     * Computes the folders that satify supplied criteria
     * @param start The folder or drive at which the search is rooted
     * @param filter The match criteria, if specified
     * @param recursive Whether the search computation should recurse folders below the root
     */
    folders : (start: FileDrive | FolderPath, filter?: string, recurive?: boolean) => Computable<FolderPath>
    
    files: (start: FileDrive | FolderPath, filter?: string, recurive?: boolean) => Computable<FilePath>
}
 
/**
 * Classifies a file system object
 */
export enum FileKind
{
    File,
    Folder
}

/**
 * Describes a file system object
 */
export interface FileInfo
{
    /**
     * The path the the represented file system object
     */
    path : FilePath | FolderPath

    /**
     * The object's classification
     */
    kind: FileKind
    
    /**
     * The date of the most recent modification
     */
    changed: Date    

    /**
     * The number of bytes consumed by the object, if applicable
     */
    size?: number
    
}