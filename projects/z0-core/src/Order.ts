import { BinaryOp } from "./Functions";

/**
 * Classifies an binary order evaluation in the context of a total order 
 */
export enum Ordering
{
    /**
     * Indicates the left value was less than the right value
     */
    LT = -1,

    /**
     * Indcates the the left and right values were equal
     */
    EQ = 0,

    /**
     * Indicates the left value was greater than the right value
     */
    GT = 1
}

/**
 * Canonical signature for order evaluator
 */
export interface Orderer<X> extends BinaryOp<X,X,Ordering> {
    (x1 : X, x2 : X): Ordering
}