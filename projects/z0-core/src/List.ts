import {Predicate, Additive, Action, Stream, not,Func} from ".";
import {Potential} from "./Option"

/**
 * Constructs the empty list over X
 */    
export const empty = <X>() : X[] => 
    []

/**
 * Constructs a list from an iterable
 * @param items The data source
 */
export const make = <X>(items : Iterable<X>) =>
    Array.from(items);

/**
 * Determines whether all items satisfy a given predicate
 * @param items The items to evaulate
 * @param predicate The evaluating predicate
 * @returns true if the predicate evaluates to true for each item, false otherwise
 */
export const all = <X>(items : X[], predicate : Predicate<X>) =>
    {
        for (const item of items) 
            if(not(predicate(item)))
                return false;                    
        return true;            
    }

/**
 * Determines whether at least one item satisfies a given predicate
 * @param items The items to evaluate
 * @param predicate The predicate to apply
 * @returns true if an item satisfies the predicate, false otherwise
 */
export const any = <X>(items : X[], predicate : Predicate<X>) =>
    {
        for (const item of items) 
            if(predicate(item))
                return true;                    
        return false;            
    }

/**
 * Returns the subset of items for which a predicate holds
 * @param items The items to evaluate
 * @param predicate The predicate to apply
 */
export const where = <X>(items : X[], predicate : Predicate<X>)  =>
        Array.from(Stream.filter(items,predicate))
        
/**
 * Determines the first element, if any, that satisfies the supplied conditions
 * @param seq - The input sequence
 * @param predicate - An option predicate that requires satisfaction if suplied
 * @returns the first element that satisfies the supplied criteria if any; otherwise none
 */
export const first = <X>(items : X[],predicate : Potential<Predicate<X>> = null) =>
    Stream.first(items,predicate);    

/**
 * Folds a nonempty array using a specified combiner
 * @param items The items that will be folded
 * @param combine The combiner that effects the fold
 */
export const fold = <X>(items : X[], combine: Additive<X>) =>
    {    
        var accum = items[0]
        for(const item of items.slice(1))
            accum = combine(accum, item)
        return accum
    }

/**
 * Creates a new array by transforming each element of an existing array via a supplied 
 * function
 * @param items The item to transform
 * @param f The transformation to apply
 * @returns The transformed data
 */
export const map = <X,Y>(items : X[], f : Func<X,Y>) =>
    make(Stream.map(items,f));

/**
 * Filters an array via a predicate to create a new array
 * @param items The source array
 * @param predicate The predicate that items in the new array must satisfy
 * @returns A new array containing only those elements that satisfy the predicate
 */
export const filter = <X>(items: X[], condition: Predicate<X>) =>
    make(Stream.filter(items,condition))

/**
 * Reduces a list of lists to a list of values
 * @param items 
 */
export const join = <X>(items : X[][]) =>
    make(Stream.join(items))

/**
 * Creates a new array by extracting the first n elements of a source array
 * if the lenth of the source array m does not exceed n; oterwise creates
 * a new array from the m available elements
 * @param source The source array
 * @param n The (maximim) number of elements to take from the source array
 */
export const take = <X>(source: X[], n : number) =>
    make(Stream.take(source,n))