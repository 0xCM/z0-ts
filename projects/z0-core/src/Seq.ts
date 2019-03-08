import { Predicate, Stream, not, Func, Seq} from ".";

/**
 * Encapsulates a lazy computation
 */
export class Computable<X> 
{    
    constructor(seq : Iterable<X>)
    {
        this.seq = seq;
    }

    private seq : Iterable<X>

    *items()
    {
        for(const item of this.seq)
            yield item;
    }

    [Symbol.iterator]()
        {return this.items()}        
}

/**
 * Creates a new sequence by appying a predicate to an existing sequence
 * @param seq The sequence to filter
 * @param predicate The adjudicating predicate
 */
export const filter = <X>(seq : Computable<X>, predicate : Predicate<X>) => 
        make(Stream.filter(seq,predicate));    

/**
 * Constructs a sequence from an iterable
 * @param seq The data source
 */
export const make = <X>(seq: Iterable<X>) =>
        new Computable(seq);

/**
 * Evaluates the sequence to an array
 * @param seq The sequence to evaluate
 * @returns the evaluated sequence
 */
export const toArray = <X>(seq : Computable<X>) => 
    Array.from(seq);

/**
 * Constructs the empty sequence over X
 */    
export const empty = <X>() => 
    new Computable<X>([])
 
/**
 * Applies a transformation to each element of the input sequence 
 * to yield a new sequence
 * @param seq The input sequence
 * @param f The transformation
 */
export const map = <X,Y>(seq : Computable<X>, f: Func<X,Y>) =>
    make(Stream.map(seq,f))

/**
 * Fully evaluates the computation upon activation and thereafter yields
 * the resulting values in reverse order on demand
 * @param seq The items to traverse in reverse
 */
export const reverse = <X,Y>(seq : Computable<X>) =>
    make(Stream.reverse(seq))

/**
 * Reduces a sequnce of sequences to a sequence of values
 * @param seq 
 */
export const join = <X>(seq : Computable<Computable<X>>) =>
    make(Stream.join(seq))
