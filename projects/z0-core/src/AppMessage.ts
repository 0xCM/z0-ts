/**
 * Defines the structure of an application message
 */
export interface AppMessage<X> 
{
    readonly id : string
    readonly content: X
    readonly severity: "verbose" | "info" | "warning" | "error"
}

/**
 * Creates an app message with verbose severity
 * @param msgid The message identifier
 * @param content The message data
 */
export const babble = <X>(msgid: string, content: X): AppMessage<X> =>  
    ({ 
        id : msgid, 
        content : content, 
        severity : "info"
    })

/**
 * Creates an app message with default severity
 * @param msgid The message identifier
 * @param content The message data
 */
export const inform = <X>(msgid: string, content: X): AppMessage<X> =>  
    ({ 
        id : msgid, 
        content : content, 
        severity : "info"
    })
    
/**
 * Creates an app message with warning severity
 * @param msgid The message identifier
 * @param content The message data
 */
export const warn = <X>(msgid: string, content: X): AppMessage<X> =>  
    ({ 
        id : msgid, 
        content : content, 
        severity : "warning"
    })

/**
 * Creates an app message with error severity
 * @param msgid The message identifier
 * @param content The message data
 */
export const error = <X>(msgid: string, content: X): AppMessage<X> =>  
    ({ 
        id : msgid, 
        content : content, 
        severity : "error"
    })
