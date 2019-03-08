import {Func} from "."
import { isSpecified } from "./Demands";
import { Action } from "./Functions";

/**
 * Represents an exclusive choice between two alternatives
 */
export type Either<L,R>
    = L
    | R

/**
 * Constructs a left-valued Either
 * @param left The left value
 */
export const  left = <L,R>(left: L) : Either<L,R> => left

/**
 * Constructs a right-valued Either
 * @param right The right value
 */
export const right = <L,R>(right: R) : Either<L,R> => right

/**
 * Determines whether the either is left-valued
 * @param e The either the evaluate
 * @returns true if the either is left-valued, false otherwise
 */
export const isLeft = <L,R>(e : Either<L,R>) : e is L =>
    isSpecified(<L>e)
    
/**
 * Determines whether the either is right-valued
 * @param e The either the evaluate
 * @returns true if the either is right-valued, false otherwise
 */
export const isRight = <L,R>(e : Either<L,R>) : e is R =>
    isSpecified(<R>e)

/**
 * Defines a right-biased map
 * @param e The either to evaluate
 * @param f The rightward map
 */
export const mapRight = <L,R,Y>(e: Either<L,R>, f : Func<R,Y>) : Either<L,Y> => 
    isRight(e) ? f(e) : e

/** Invokes an action if the either is right
 * @param e The either to evaluate
 * @param f The action to invoke if right
 * */   
export const onRight = <L,R>(e: Either<L,R>, f : Action<R>) => 
{
    if(isRight(e))
        f(e)
}

/** Invokes an action if the either is left
 * @param e The either to evaluate
 * @param f The action to invoke if left
 * */   
export const onLeft = <L,R>(e: Either<L,R>, f : Action<L>) => 
{
    if(isLeft(e))
        f(e)
}
