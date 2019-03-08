/**
 * Identifies a locally executable tool
 */
export type Tool =
{
    /**
     * The tool's name
     */
    readonly name: string
    
    /**
     * The tool's version
     */
    readonly version: string
    
    /**
     * The fully-qualified path to the tool
     */
    readonly location: string
}

/**
 * Defines a grouping for a related suite of tools
 */
export type Toolset =
{
    /**
     * The toolset name
     */
    readonly name: string

    /**
     * The toolset version
     */
    readonly version: string

    /**
     * The tools that belong to the set
     */
    readonly tools : Tool[]
}


/**
 * Describes a command parameter
 */
export type CmdParamInfo = {
    /**
     * Specifies the name of the parameter
     */
    readonly name: string,

    /**
     * Describes the purpose of the parameter
     */
    readonly help: string

}

/**
 * Describes a tool command
 */
export type CmdInfo = {
    /**
     * Specifies the name of the tool
     */
    readonly tool: string
    
    /**
     * Specifies the name of the tool-relative command
     */
    readonly name: string,

    /**
     * Describes the purpose of the command
     */
    readonly help: string,

    /**
     * Specifies the command's potential parameters
     */
    readonly params?: CmdParamInfo[]

}


/**
 * Specifies an argument
 */
export interface CmdArg<A>
{
    /**
     * Identifies the specified flag
     */
    readonly option: A,
    
    /**
     * Specifies the flag argument, if applicable
     */
    readonly arg?: string
}
    
/**
 * Specifies a command together with its options/arguments
 */
export interface CmdSpec<C,A>
{
    /**
     * The tool-relative command specifier
     */
    readonly command: C
    
    /**
     * The command arguments
     */
    readonly args: CmdArg<A>[]
}

/**
 * Pairs a command together with a tool that can execute it
 */
export interface ToolCmd<C,A>
{
    /**
     * The executor
     */
    readonly tool: Tool
    
    /**
     * The command 
     */
    readonly spec:CmdSpec<C,A>
}