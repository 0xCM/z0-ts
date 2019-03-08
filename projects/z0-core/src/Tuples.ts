import {Action0} from "."

export type Tuple1<X1> = [X1]

export type Tuple2<X1,X2> = [X1, X2]

export type Tuple3<X1, X2, X3> = [X1, X2, X3]

export type Tuple4<X1, X2, X3, X4> = [X1, X2, X3, X4]

export type Tuple<X1,X2,X3,X4> =
      Tuple1<X1>
    | Tuple2<X1,X2>
    | Tuple3<X1,X2,X3>
    | Tuple4<X1,X2,X3,X4>

export const tuple = <X1,X2,X3,X4>(x1:X1, x2?:X2,x3?:X3,x4?:X4) : Tuple<X1,X2,X3,X4> =>{
    if(x4 != undefined && x3 != undefined && x2 != undefined)
        return [x1,x2,x3,x4]
    else if(x3 != undefined && x2 != undefined)
        return [x1,x2,x3]
    else if(x2 = undefined)
        return [x1,x2]
    else
        return [x1]
}
    
export type ActionProvider = IterableIterator<Tuple2<string,Action0>>
