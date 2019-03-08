import assert from "assert"
import * as Option from "./Option"

/**
 * Asserts the claim that the supplied values are equivalent
 * @param x1 The first value 
 * @param x2 The second value
 * @param msg An optional message to display if the claim does not hold
 */
export const equal = <X>(expect: X, actual: X, msg?:string) => 
    assert.deepEqual(actual, expect, msg)

/**
 * Asserts the claim that a supplied value is true
 * @param x The value to examine
 * @param msg An optional message to display if the claim does not hold
 */
export const isTrue = (x : boolean, msg?:string) => 
    assert.equal(x, true, msg)
        
/**
 * Asserts the claim that a specified value is false
 * @param x The value to examine
 * @param msg An optional message to display if the claim does not hold
 */
export const isFalse = (x : boolean, msg?:string) => 
    assert.equal(x, false, msg)    

/**
 * Asserts the claim that a specified value is nonzero
 * @param x The value to examine
 */
export const nonzero = (x : number) => 
    assert.equal(x > 0, true, `The value ${x} was either negative or 0`)
    
/**
 * Asserts the claim that one value is smaller than another
 * @param x The value to examine
 */
export const lessThan = (x : number, y : number) =>
    assert.equal(x < y, true, `The value ${x} was not less than ${y}`)

/**
 * Asserts the claim that an option is valued
 * @param x The option to examine
 */
export const some = <X>(x : Option.Potential<X>) =>
    assert.equal(Option.isSome(x), true, `The option had no value`)
