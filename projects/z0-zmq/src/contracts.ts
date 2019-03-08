export type ContentType =
     "text/plain"
    |"application/json"
    | "text/code"
    | "code/cpp"
    | "code/csharp"
    | "code/haskell"
    | "status/error"
    | "status/info"

export interface Message
{
    readonly Channel : Connector
    readonly DataType : ContentType
    readonly Data : string
}

export interface Connector
{
    Url : string
    App : string     
}

export interface Receiver
{
    (msg : Message) : void
}

export interface Emitter
{
    (msg : Message) : void
}