import {Predicate, Action, Func,isSome,isNone,some,none} from "."
import {Potential} from "./Option"


/**
 * Filters a stream via a predicate
 * @param items The data source
 * @param predicate The predicate escaping elements must satisfy
 */
export function* filter<X>(items : Iterable<X>, predicate : Predicate<X>)
{
    for (const item of items) 
        if(predicate(item))
            yield item
}

/**
 * Applies a transformation to each element of an input sequence to yield a new sequence
 * @param seq The input sequence
 * @param f The transformation
 */
export function* map<X,Y>(seq : Iterable<X>, f : Func<X,Y>)
{
    for(const item of seq)
        yield f(item);
}

/**
 * Determines the first element, if any, that satisfies the supplied conditions
 * @param seq - The input sequence
 * @param predicate - An option predicate that requires satisfaction if suplied
 * @returns the first element that satisfies the supplied criteria if any; otherwise none
 */
export const first = <X>(seq : Iterable<X>, predicate : Potential<Predicate<X>> = null) : Potential<X> =>
    {
        for(const item of seq)
        {
            if(isSome(predicate))                
                if(predicate(item))
                    return some(item)
            else
                return some(item)                    
        }                

        return none<X>()                                
    }

/**
 * Yields a specified number of items if the exist; othwerwise, all available elements
 * @param stream The stream from which items will be taken
 * @param count The maximum number of items to take
 * @returns the requested number of items or all available items
 */
export function* take<X>(stream : Iterable<X>, count : number)
{
    var taken = 0;
    for(const item of stream)
    {
        if(taken < count)
        {
            yield item
            ++taken
        }
        else
            break    
    }
}

/**
 * Yields the elements (if any) that follow a specified number of elements
 * @param stream The stream to traverse
 * @param count The number of elements to skip
 */
export function* skip<X>(stream : Iterable<X>, count : number)
{
    var skipped = 0
    for(const item of stream)
    {
        if(skipped < count)        
            ++skipped
        else
            yield item;
    }
}

/**
 * Computes an array from a stream
 * @param stream The data source
 * @returns the computed array
 */
export const evaluate = <X>(stream : Iterable<X>) =>
     Array.from(stream);

/**
 * Applies a specified action to each item in the stream
 * @param stream The items to traverse
 * @param action The action to invoke
 */
export const iter = <X>(stream : Iterable<X>, action:Action<X>) => 
    {
        for(const item of stream)
            action(item)
    }            

/**
 * Fully evaluates the stream upon activation and thereafter yields
 * the resulting values in reverse order on demand
 * @param stream The items to traverse in reverse
 */
export function* reverse<X>(stream : Iterable<X>)
{
    for(const item of evaluate(stream).reverse())
        yield item;
}

/**
 * Reduces a stream of streams to a stream of values
 * @param stream the iterables to join
 */
export function* join<X>(stream : Iterable<Iterable<X>>)
{
    for(const it of stream)
        for(const item of it)
            yield item;

}