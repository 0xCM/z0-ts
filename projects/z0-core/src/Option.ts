import {Action,Func,not} from "."
import { Predicate } from "./Functions";

/**
 * Encapsulates a value, or not
 */
export type Potential<T>
    = T
    | undefined
    | null

/**
 * Determines wheter an option has a value
 * @param p The potential value
 * @returns true if the option is valued, false otherwise
 */
export const isSome = <X>(p: Potential<X>) : p is X =>
    <X>p != null && <X>p != undefined

/**
 * Determines wheter an option has a value
 * @param p The potential value
 * @returns true if the option is non-valued, false otherwise
 */
export const isNone = <X>(p: Potential<X>) => not( isSome(p))

/**
 * Executes an action if an option has a value
 * @param p The potential value
 * @param action The conditional action
 */
export const onSome = <X>(p : Potential<X>, action: Action<X>) => 
        {
            if(isSome(p)) 
                action(p) 
        }

/**
 * Executes an action if an option has no value
 * @param p The potential value
 * @param action The conditional action
 */
export const onNone = <X>(p : Potential<X>, action : () => void) =>
{
    if(isNone(p))
        action()
}

/**
 * Manufactures a valued option
 * @param value - The value injected into the option
 * @returns the valued option 
 */
export const some = <X>(value: X) : Potential<X> => value

/**
 * Manufactures a non-valued option
 */
export const none = <X>() : Potential<X> => undefined

/**
 * Applies a map to an option
 * @param p The potential value
 * @param f 
 */
export function map<X,Y>(p : Potential<X>, f: Func<X,Y>) : Potential<Y>
export function map<X,Y>(p : Potential<X>, f: Func<X,Y>, ifNone: () => Y) : Y
export function map<X,Y>(p : Potential<X>, f: Func<X,Y>, ifNone : any = undefined) : any
    {
        //If the option is valued apply the function
        if(isSome(p))
            return f(p)
        
        //If no default has been provided, return none            
        if(ifNone == undefined)
            return none<Y>()
        
        //Otherwise, return the supplied default
        return (<() =>Y>ifNone)()
    }
    
/**
 * Returns the encapsulated value if it exists; otherwise, raises an exception
 * @param p The potential value
 */
export const unwrap = <X>(p: Potential<X>) =>
    {
        if(isNone(p))
            throw "Option has no value"
        else
            return <X>p            
    }

/**
 * Applies a predicate to a realized value
 * @param p The potential value
 * @param filter The filter to apply if the value exists
 * @returns a valued potential if the source value exists and the predicate holds; none otherwise
 */
export const filter = <X>(p : Potential<X>, filter: Predicate<X>) =>
    isSome(p) && filter(p) ? some(p) : none<X>();        

/**
 * Reduces a 2nd-order potential to a 1rst-order potential
* @param p The potential value
  * */    
export const join = <X>(p : Potential<Potential<X>>) =>
    isSome(p) ? unwrap(p) : none<X>()