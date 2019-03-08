import {Either,right,left} from "."

/**
 * Describes an error
 */
export interface ErrorInfo
{    
    description: string
}

/**
 * Invokes a supplied function, returning an R-value if successful
 * and an L-value otherwise
 * @param f The function to invoke
 */
export const Try = <X>(f:(() => X)) : Either<ErrorInfo,X> =>
{
    try
    {
        return right(f())
    }
    catch(oopsie)
    {
        return left(({description:oopsie.toString()}))
    }
}
