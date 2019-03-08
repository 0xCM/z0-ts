
export type Zero = "0"

export const zero 
    = () : Digit => "0"

export type One = "1"

export const one
    = () : Digit => "1"

export type Two = "2"

export const two
    = () : Digit => "2"

export type Three = "3"

export const three
    = () : Digit => "3"

export type Four = "4"

export const four
    = () : Digit => "4"

export type Five = "5"

export const five
    = () : Digit => "5"

export type Six = "6"

export const six
    = () : Digit => "6"

export type Seven = "7"

export const seven
    = () : Digit => "7"

export type Eight = "8"

export const eight
    = () : Digit => "8"

export type Nine = "9"

export const nine
    = () : Digit => "9"

export type Digit = Zero | One | Two | Three | Four | Five | Six | Seven | Eight | Nine

export type Sign = "-" | "+"

export function digit(x : number) : Digit;
export function digit(x : string) : Digit;
export function digit(x : any) : Digit
{
    switch(x)
    {
        case 0: 
        case "0":
            return zero()
        
        case 1: 
        case "1": 
            return one()
        
        case 2: 
        case "2": 
            return two()
        case 3: 
        case "3": 
            return three()
        
        case 4: 
        case "4": 
            return four()
        
        case 5:
        case "5":  
            return five()
        
        case 6: 
        case "6":
            return six()
        
        case 7:
        case "7": 
            return seven()
        
        case 8: 
        case "8": 
            return eight()
        
        case 9: 
        case "9": 
            return nine()
        
        default:
            throw `The number ${x} is not a digit`
    }
}

export type UInt = 
      [Digit]
    | [Digit, Digit]
    | [Digit, Digit, Digit]
    | [Digit, Digit, Digit, Digit]
    | [Digit, Digit, Digit, Digit, Digit]
    | [Digit, Digit, Digit, Digit, Digit, Digit]
    | [Digit, Digit, Digit, Digit, Digit, Digit, Digit]
    | [Digit, Digit, Digit, Digit, Digit, Digit, Digit, Digit]
        
export const add =
    (x : Digit, y : Digit) : UInt =>{

        const val = (x + y).toString()
        return uint(val);
    }

export const uint = (n : number | string) : UInt =>
{
    const val = n.toString();
    switch(val.length)
    {
        case 1:
            return [ digit(val[0])]
        case 2:
            return [digit(val[0]), digit(val[1])]      
        case 3:
            return [digit(val[0]), digit(val[1]), digit(val[2])]
        case 4:
            return [digit(val[0]), digit(val[1]), digit(val[2]), digit(val[3])]
        case 5:
            return [digit(val[0]), digit(val[1]), digit(val[2]), digit(val[3]), digit(val[4])]
        case 6:
            return [digit(val[0]), digit(val[1]), digit(val[2]), digit(val[3]), digit(val[4]), digit(val[5])]
        case 7:
            return [digit(val[0]), digit(val[1]), digit(val[2]), digit(val[3]), digit(val[4]), digit(val[5]), digit(val[6])]
        case 8:
            return [digit(val[0]), digit(val[1]), digit(val[2]), digit(val[3]), digit(val[4]), digit(val[5]), digit(val[6]), digit(val[7])]

    }
    throw  `The value ${val} overflowed`
}

export class CalendarDate 
{
    constructor(year : UInt, month: UInt, day: UInt)
    {
        this.year = year;
        this.month = month
        this.day = day;
    }
    
    year: UInt
    
    month: UInt
    
    day: UInt

}

export const date = (year : UInt, month : UInt, day : UInt ) => 
    new CalendarDate(year,month,day)

