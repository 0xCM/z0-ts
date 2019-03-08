/**
 * Defines the structure of a 2-tuple
 */
export interface P2<X1,X2,X3,X4>
{
    n: 2 , x1: X1, x2: X2, x3?:X3, x4?:X4
}    

/**
 * Defines the structure of either a 3-tuple
*/
export interface P3<X1,X2,X3,X4>
{
    n: 3, x1: X1, x2: X2, x3: X3, x4?:X4
}    

/**
 * Defines the structure of a 4-tuple
 */
export interface P4<X1,X2,X3,X4>
{
    n: 4, x1: X1, x2: X2, x3: X3, x4: X4
}    

/**
 * Defines the structure of a 5-tuple
 */
export interface P5<X1,X2,X3,X4,X5>
{
    n: 4, x1: X1, x2: X2, x3: X3, x4: X4, x5 : X5
}    

/**
 * Represents a point in generic n-space where n = 1 | 2 ... | 4
 **/    
 export type Point<X1, X2, X3, X4> =
        P4<X1, X2, X3, X4>     
      | P3<X1, X2, X3, X4>
      | P2<X1, X2, X3, X4>

/**
 * Constructs a tagged point
 * @param x1 The first coordinate, if specified
 * @param x2 The second coordinate, if specified
 * @param x3 The third coordiante, if specified
 * @param x4 The fourth coordinate, if specified
 */
export const point = <X1, X2, X3, X4>
    (x : [X1 , X2] | [X1 , X2 , X3] | [X1 , X2 , X3 , X4] ) : Point<X1, X2, X3, X4> =>
    x.length == 2 ? {n:2, x1 : x["0"], x2: x["1"]} :
    x.length == 3 ? {n:3, x1 : x["0"], x2: x["1"], x3: x["2"]} :
        {n:4, x1 : x["0"], x2: x["1"], x3: x["2"], x4: x["3"]}            

export const formatPoint = <X1,X2,X3,X4>(p: Point<X1,X2,X3,X4>) =>
{
    switch(p.n)
    {
        case 2:
            return `(${p.x1},${p.x2})`
        case 3:
            return `(${p.x1},${p.x2},${p.x3})`
        case 4:
            return `(${p.x1},${p.x2},${p.x3},${p.x4})`
    }
}