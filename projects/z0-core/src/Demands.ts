import {Predicate} from "."

/**
 * Defines a guard that succeeds if a value is well-defined
 * @param x The guarded value
 */
export const isSpecified
    = <X>(x : X) : x is X=> x != undefined && x != null

/**
 * Defines a guard that succeeds if a value is not well-defined
 * @param x The guarded value
 */
export const isUnspecifed 
    = <T>(subject: T) => subject == undefined || subject == null


/**
 * Determines whether a value satisfies a predicate and, if so, passes
 * the value through; otherwise, raises an exception
 * @param p 
 * @param value 
 */
export const demand 
    =  <X>(value : X, p : Predicate<X>) =>
{
    if(isUnspecifed(value))
        throw `A required value does not exist`

    if(p(value))
        return value;
    
    throw `The value ${value} does not satisfy a required predicate`;
}
