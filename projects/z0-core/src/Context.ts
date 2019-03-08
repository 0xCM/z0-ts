import { Computable } from "./Seq";
import { Potential} from "./Option";
import * as Option from "./Option"
import {List,Seq,Stream,Func,Predicate,isOf} from "."

export type Context<X> =
    | {data: X[]}
    | {data: Computable<X>}
    | {data: Iterable<X>}
    | {data: Potential<X>}

export interface Transformer<X,Y> {
    (context : Context<X>) : Context<Y>
}

export const map = <X,Y>(c: Context<X>, f : Func<X,Y>) : Context<Y> =>
    isOf<X[]>(c.data) ? {data: List.map(c.data,f)} :
    isOf<Computable<X>>(c.data) ? {data: Seq.map(c.data, f)} :
    isOf<Iterable<X>>(c.data) ? {data: Stream.map(c.data,f)} :
    {data: Option.map(c.data,f)}

export const filter = <X>(c: Context<X>, p : Predicate<X>) =>
    isOf<X[]>(c.data) ? {data: List.filter(c.data,p)} :
    isOf<Computable<X>>(c.data) ? {data: Seq.filter(c.data,p)} :
    isOf<Iterable<X>>(c.data) ? {data: Stream.filter(c.data,p)} :
    {data: Option.filter(c.data, p)}

export const join = <X>(c: Context<Context<X>>) =>
    isOf<X[][]>(c.data) 
        ? {data: List.join(c.data)} :
    isOf<Computable<Computable<X>>>(c.data) 
        ? {data: Seq.join(c.data)} :
    isOf<Iterable<Iterable<X>>>(c.data) 
        ? {data: Stream.join(c.data)} :                    
    {data: Option.join(c.data)}
            