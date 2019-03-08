
/**
 * Inverts a boolean value
 * @param x The value to invert
 */
export const not = (x : boolean) => !x;

/**
 * Specifies a semantic identity
 */
export interface Identifier {
    /**
     * Confers identity to an element relative to some context
     */
    readonly name: string
    
}

/**
 * Determines whther the identifer is anonymous
 * @param id The identifier to evaluate
 */
export const isEmpty = (id : Identifier) => 
    id.name == "" || id.name == null || id.name == undefined

/**
 * Type guard for any source/target that succeeds when the source
 * can be coerced to the target
 * @x The source value
 * 
 * */    
export const isOf = <X>(x : any) : x is X =>
    <X>x !== undefined

