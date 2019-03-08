import { isOf } from "./Primops";
import * as Point from "./Point"

export interface Action0
{
    () : void
}

/**
 * The canonical signature for a function
 */
export interface Func<X,Y> {(x : X) : Y}

/**
 * Canonical type for a one-parameter function
 */
export type F1<X1,X2> = (x1: X1) => X2

/**
 * Canonical type for a two-parameter function
 */
export type F2<X1,X2,X3> = (x1: X1,x2: X2) => X3

/**
 * Canonical type for a two-parameter function
 */
export type F3<X1,X2,X3,X4> = (x1: X1,x2: X2, x3: X3) => X4

export type F<X1,X2,X3,X4> =
    | {n: 1, f: F1<X1,X2>}
    | {n: 2, f: F2<X1,X2,X3>}
    | {n: 3, f: F3<X1,X2,X3,X4>}

export const func = <X1,X2,X3,X4>(n : 1 | 2 | 3, f: F1<X1,X2> | F2<X2,X2,X3> | F3<X1,X2,X3,X4>) : F<X1,X2,X3,X4> =>
{
  
    switch(n)
    {
        case 1:
        if(isOf<F1<X1,X2>>(f))
            return  {n: 1, f: f} 
        case 2:
        if(isOf<F2<X1,X2,X3>>(f))
            return {n: 2, f: f}
        case 3:            
        if(isOf<F3<X1,X2,X3,X4>>(f))
            return  {n: 3, f: f} 
    }          
    throw "Should never happen"
}

/**
 * Applies a function to a point
 * @param f The function to apply
 * @param p The point of application
 */    
export const apply = <X1,X2,X3,X4> (f : F<X1,X2,X3,X4>, p : Point.Point<X1,X2,X3,X4>) =>
        {

            if(f.n == 2 && p.n >= 2)
                return f.f(p.x1, p.x2) 
            
            if (f.n == 3 && p.n >= 3 && p.x3 != undefined)
                return f.f(p.x1, p.x2, p.x3) 

            throw `Argument mismatch: f.n=${f.n}, p.n=${p.n}, p.x1=${p.x1}, p.x2=${p.x2}, p.x3=${p.x3}` 
        }    
    
/**
 * The canonical signature for an action
 */
export interface Action<X> {(x: X) : void}

/**
 * The canonical signature for a predicate
 */
export interface Predicate<X> { (x : X) :boolean}

/**
 * The canonical signature for a binary operator
 */
export interface BinaryOp<X,Y,Z> { (x : X, y : Y) : Z}

/**
 * The canonical signature for a boolean binary operator
 */
export interface BooleanOp<X,Y> {(x : X, y : Y) : boolean}

/**
 * The canonical signature for an additive operator
 */
export interface Additive<X> {(x1 : X, x2 : X) : X} 

/**
 * The canonical signature for a multiplicative operator
 */
export interface Multiplicative<X> {(x1 : X, x2 : X) : X} 

/**
 * The canonical signature for a data emitter
 */
export interface Source<X>{() : Iterable<X>}

/**
 * The canonical signature for a data receiver
 */
export interface Sink<X> extends Action<Iterable<X>> 
    {(items : Iterable<X>) : void}
