import {Identifier,concat,blank,isBlank,demand,isNeitherHeadNorTail, textEqual,Computable, Seq} from "."

/**
 * Classifies file system name components/parts
 */
export enum ComponentKind
{
    /**
     * Indicates a folder name
     */
    FolderName = "FolderName",
    /**
     * Indicates a file extension
     */    
    Extension = "ExtensionName",    
    /**
     * Indicates a file name
     */
    Filename = "FileName",
    /**
     * Indicates a fully-resolvable path to a folder
     */
    FolderPath = "FolderPath",
    /**
     * Indicates a fully-resolvable path to a file
     */
    FilePath = "FilePath",
    /**
     * Indicates a folder path that is relative to another file system location
     */
    RelativeFolderPath = "RelativeFolderPath",
    /**
     * Indicates a file path that is relative to another file system location
     */
    RelativeFilePath = "RelativeFilePath",
    /**
     * Indicates a server name
     */
    Server = "Server",
    /**
     * Indicates a local drive
     */
    Drive = "Drive"
}

const Separator  = "/"

/**
 * Defines the set of potential drive letters
 */
export type DriveLetter
    = "" 
    | "a" | "A" | "b" | "B" | "c" | "C" | "d" | "D" | "e" | "E" | "f" | "F"
    | "g" | "G" | "h" | "H" | "i" | "I" | "j" | "J" | "k" | "K" | "l" | "L"
    | "m" | "M" | "n" | "N" | "o" | "O" | "p" | "P" | "q" | "Q" | "r" | "R"
    | "s" | "S" | "t" | "T" | "u" | "U" | "v" | "V" | "w" | "W" | "x" | "X"
    | "y" | "Y" | "z" | "Z"

/**
 * Root path component abstraction
 */
export abstract class FilePathComponent<T extends FilePathComponent<T>> implements Identifier
{
    constructor(name: string, kind : ComponentKind)
    {
        this.name = name
        this.kind = kind;
    }
    
    /**
     * Specifies the path component's name
     */
    readonly name : string
    
    /**
     * Specifies the component's classification
     */
    readonly kind : ComponentKind

    /**
     * Determines whether the component is empty      
     */        
    isEmpty 
        = () => isBlank(this.name)

    toString() 
        {return this.name;}
        
}

/**
 * Represents a local file system drive
 */
export class FileDrive extends FilePathComponent<FileDrive>
{    
    static readonly empty: FileDrive = new FileDrive("")    

    static make
        = (name : DriveLetter) => new FileDrive(name)
                
    constructor(value : DriveLetter)            
    {
        super(value, ComponentKind.Drive)
    }

    letter = () => <DriveLetter>this.name

    append = ( right : FolderName | FileName ) =>
        isFolderName(right) ? FolderPath.make(`${this.name}${Separator}${right}`)
        : FilePath.make(`${this.name}${Separator}${right}`)
                            
    toString()
        {return `file:///${this.name}:/`;}
}
    
/**
 * Represents a file server name
 */
export class FileServer extends FilePathComponent<FileServer>
{
    static readonly empty: FileServer = new FileServer("")
        
    static make
        = (name : string) => new FileServer(name)
                
    constructor(value : string)
        {super(value, ComponentKind.Server)}


    append = (part : FolderName | RelativeFolderPath) => 
        FolderPath.make(`${this.name}${Separator}${part}`)
          
    toString()
        {return `//${this.name}`;}
}

/**
 * Represents the name of a folder
 */
export class FolderName extends FilePathComponent<FolderName>
{
    static readonly empty: FolderName = new FolderName(blank)

    /**
     * Creates folder name from a canonical string representation
     */
    static make
        = (text : string) => new FolderName(text)
             
    constructor(name : string)
        {super(name, ComponentKind.FolderName)}
        
    /**
     * Appends a component to the path
     * @param right The component to append
     */    
    append(right : FileName | FolderName) : RelativePath
    {
        if(isFileName(right))
            return RelativeFilePath.make(`${this.name}${Separator}${right}`)
        else
            return RelativeFolderPath.make(`${this.name}${Separator}${right}`)                                         
    }            
}
    
/**
 * Represents the name of a file extension
 */
export class ExtensionName extends FilePathComponent<ExtensionName>
{
    static readonly empty: ExtensionName = new ExtensionName(blank)

    /**
     * Creates an extension from a canonical string representation
     */
    static make
        = (text : string) =>  
            new ExtensionName(demand(text, t => isNeitherHeadNorTail(t,".")))
             
    constructor(value : string)
        {super(value, ComponentKind.Extension)}    
    
    /**
     * Appends an extension to produce a composite extension
     * @param right The extension to append
     */
    append = (right : ExtensionName) =>    
        ExtensionName.make(`${this.name}.${right.name}`)
    
    /**
     * Specifies whether the exension has more than one component
     */        
    isComposite 
        = () => this.name.includes(".")

    /**
     * Renders the canonical string representation
     */
    toString() 
        {return this.isEmpty() ? "" : `.${this.name}`;}  
}

/**
 * Represents a filename
 */
export class FileName  extends FilePathComponent<FileName>
{
    static readonly empty: FileName = new FileName(blank)

    static make
        = (name : string) => new FileName(name)
    
    constructor(value : string)
        {super(value, ComponentKind.Filename)}

    append = (extension : ExtensionName ) =>
        FileName.make(`${this}${extension}`);        
}
    
/**
 * Represents a fully-resolvable path to a folder
 */
export class FolderPath  extends FilePathComponent<FolderPath>
{
    static readonly empty: FolderPath = new FolderPath("")
    
    static make
        = (name : string) => new FolderPath(name)
                
    constructor(value : string)
        {super(value, ComponentKind.FolderPath)}

    append = (right : FileName | FolderName | RelativeFilePath | RelativeFolderPath) =>
        {
            const rendered = `${this.toString}${right}`
            if(isFileName(right) || isRelativeFilePath(right))
                return FilePath.make(rendered)
            else
                return FolderPath.make(rendered)
        }
    
    toString()
        { return `${this.name}/`}           
}
    
/**
 * Represents a fully-resolvable path to a file
 */
export class FilePath extends FilePathComponent<FilePath>
{
    static readonly empty: FilePath = new FilePath(blank)
            
    static make
        = (name : string) => new FilePath(name)
                
    constructor(value : string)
        {super(value, ComponentKind.FilePath)}
    
}

/**
 * Represents a path to a folder that is relative to some other folder or host
 */
export class RelativeFolderPath extends FilePathComponent<RelativeFolderPath>
{
    static readonly empty: RelativeFolderPath = new RelativeFolderPath("")
            
    static make
        = (...parts: string[]) => new RelativeFolderPath(concat(Separator, parts))
                
    constructor(value : string)
        {super(value, ComponentKind.RelativeFolderPath)}
        
}

/**
 * Represents a path to a file that is relative to some folder or host
 */
export class RelativeFilePath extends FilePathComponent<RelativeFilePath>
{
    static readonly empty: RelativeFilePath = new RelativeFilePath("")

    static make
        = (...parts: string[]) => new RelativeFilePath(concat(Separator, parts))
                
    constructor(value : string)
        {super(value, ComponentKind.RelativeFilePath)}
    
}

export type RelativePath
    = RelativeFilePath
    | RelativeFolderPath

/**
 * Represents an atomic path constituent
 */
export type FileSystemName
    = FolderName 
    | FileName 
    | ExtensionName
    
/**
 * Represents a path formed by a sequence of atomic path constituents
 */
export type FileSystemPath
    = FolderPath 
    | FilePath
    | RelativeFolderPath
    | RelativeFilePath

/**
 * Represents an atomic path root
 */
export type FileHost
    = FileDrive
    | FileServer
    
/**
 * Top-level path component concept
 */
export type PathPart
    = FolderName 
    | FileName 
    | ExtensionName
    | FolderPath 
    | FilePath
    | RelativeFolderPath
    | RelativeFilePath
    | FileDrive
    | FileServer
    
/**
 * Defines a {@link FolderPath} guard
 * @param p The input value subject to narrowing if the guard predicate is satisfied
 */
export const isFolderPath = (p : PathPart) : p is FolderPath => 
    <FolderPath>p != undefined

/**
 * Defines a {@link FilePath} guard
 * @param p The input value subject to narrowing if the guard predicate is satisfied
 */
export const isFilePath = (p : PathPart) : p is FilePath =>
     <FilePath>p != undefined

/**
 * Defines a {@link RelativeFolderPath} guard
 * @param p The input value subject to narrowing if the guard predicate is satisfied
 */
export const isRelativeFolderPath = (p : PathPart) : p is RelativeFolderPath => 
    <RelativeFolderPath>p != undefined

/**
 * Defines a {@link RelativeFilePath} guard
 * @param p The input value subject to narrowing if the guard predicate is satisfied
 */
export const isRelativeFilePath = (p : PathPart) : p is RelativeFilePath => 
    <RelativeFilePath>p != undefined

/**
 * Defines a {@link FolderName} guard
 * @param p The input value subject to narrowing if the guard predicate is satisfied
 */
export const isFolderName = (c : PathPart) : c is FolderName => 
    <FolderName>c != undefined

/**
 * Defines a {@link FileName} guard
 * @param p The input value subject to narrowing if the guard predicate is satisfied
 */
export const isFileName = (c : PathPart) : c is FileName => 
    <FileName>c != undefined

/**
 * Defines a {@link FileExtension} guard
 * @param c The input value subject to narrowing if the guard predicate is satisfied
 */
export const isExtension = (c : PathPart) : c is ExtensionName => <ExtensionName>c != undefined

/**
 * Defines a {@link FileDrive} guard
 * @param p The input value subject to narrowing if the guard predicate is satisfied
 */
export const isDrive = (c : PathPart) : c is FileDrive => <FileDrive>c != undefined

/**
 * Determines whether two drive values refer to the same physical drive
 * @param d1 - The first drive
 * @param d2 - The scond drive
 * */
const sameDrives = (d1 : DriveLetter, d2 : DriveLetter) => 
    textEqual(d1,d2)

/**
 * Defines a {@link FileSystemName} guard
 * @param c The input value subject to narrowing if the guard predicate is satisfied
 */
const isName = (c : PathPart) : c is FileSystemName => 
    <FileSystemName> c != undefined

/**
 * Defines a {@link FileSystemPath} guard
 * @param c The input value subject to narrowing if the guard predicate is satisfied
 */
const isPath = (c : PathPart) :  c is FileSystemPath => 
    <FileSystemPath>c != undefined

/**
 * Defines a {@link FileHost} guard
 * @param c The input value subject to narrowing if the guard predicate is satisfied
 */
const isHost = (c : PathPart) : c is FileHost => 
    <FileHost>c != undefined

/**
 * Defines a {@link FileServer} guard
 * @param c The input value subject to narrowing if the guard predicate is satisfied
 */
export const isServer = (c : PathPart) : c is FileServer => 
    <FileServer>c != undefined

