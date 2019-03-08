import * as os from "os"
import { not,List } from ".";


/**
 * Specifies the end-of-line marker
 */
export const eol = os.EOL

/**
 * Specifies the empty character type
 */
export const blank = ""

/**
 * Specifies the ' ' character type
 */
export const space = " "

/**
 * Specifies the '+' character type
 */
export const plus = "+"

/**
 * Specifies the '-' character type
 */
export const minus = "-"

/**
 * Specifies the '(' character type
 */
export const lparen = "("

/**
 * Specifies the ')' character type
 */
export const rparen = ")"

/**
 * Specifies the '[' character type
 */
export const lbracket = "["

/**
 * Specifies the ']' character type
 */
export const rbracket = "]"

/**
 * Specifies the '|' character type
 */
export const pipe = "|"

/**
 * Specifies the '!' character type
 */
export const bang = "!"

/**
 * Specifies the '#' character type
 */
export const pound = "#"

/**
 * Specifies the '/' character type
 */
export const fslash = "/"

/**
 * Specifies the '\' character
 */
export const bslash = "\\"

/**
 * Specifies the '%' character
 */
export const percent = "%"

/**
 * Specifies the '$' character
 */
export const dollar = "$"

/**
 * Specifies the '@' character
 */
export const amp = "@"

/**
 * Specifies the '^' character
 */
export const exp = "^"

/**
 * Specifies the '&' character
 */
export const and = "&"

/**
 * Specifies the '*' character
 */
export const star = "&"

/**
 * Specifies the '.' character
 */
export const dot = "."

/**
 * Specifies the ',' character type
 */
export const comma = ","

/**
 * Specifies the single-quote character type
 */
export const squote = "'"

/**
 * Specifies the double-quote character type
 */
export const dquote = "\""

/**
 * Specifies the '>' character type
 */
export const gt = ">"

/**
 * Specifies the '=' character type
 */
export const eq = "="

/**
 * Specifies the '<' character type
 */
export const lt = "<"

/**
 * Classifes a subset of the ascii character set as symbolic
 */
export enum AsciiSymbol
{
    bang, at, pound, dollar, percent,
    exp, and, star, lbracket, rbracket,
    lparen, rparen, fslash, bslash,
    dot, comma,squote,dquote,
    gt,lt,eq
}
    

/**
 * Determines whether the first string is the same as the second string
 * @param s1 The first string
 * @param s2 The second string
 * @param ignoreCase Whether casing is ignored
 */
export const textEqual 
    = (s1: string, s2: string, ignoreCase = true) => 
        ignoreCase ? toLower(s1) == toLower(s2) : s1 == s2

/**
 * Encloses content between left/right markers
 * @param left The left marker
 * @param content The bounded content
 * @param right The right marker
 */
export const fence
    = (left : any, content : any, right: any) =>`${left}${content}${right}`

/**
 * Fences content between a left-bracket and a right-bracket
 * @param content The content to enclose
 */
export const bracket
    = (content : any) => fence(lbracket, content, rbracket)

/** Converts text to lowercase
 * @param subject - The text to transform
 * @returns the transformed text
 */
export const toLower
    = (subject : string) => subject.toLowerCase()


/** Converts text to uppercase
 * @param s - The text to transform
 * @returns the transformed text
 */
export const toUpper
    = (s : string) => s.toUpperCase();
    
/** Determines whether a string begins with a specified pattern
 * @param s - The text to test
 * @param pattern - The pattern to match
 * @param ignoreCase - Whether text casing should be ignored
 * @returns true if test succeeds, false otherwise
 */
export const isHead 
    = (s: string, pattern: string, ignoreCase = true) => 
        ignoreCase ? s.toLowerCase().startsWith(toLower(pattern))
            : s.startsWith(pattern);

/** Determines whether a string fails to begin with a specified pattern
 * @param subject - The text to test
 * @param pattern - The pattern to match
 * @param ignoreCase - Whether text casing should be ignored
 * @returns true if test succeeds, false otherwise
 */
export const isNotHead
    = (subject: string, pattern: string, ignoreCase = true) =>
        not(isHead(subject,pattern,ignoreCase));
    
/** Determines whether a string terminates with a specified pattern
 * @param s - The text to test
 * @param pattern - The pattern to match
 * @param ignoreCase - Whether text casing should be ignored
 * @returns true if test succeeds, false otherwise
 */
export const isTail
    = (s: string, pattern: string, ignoreCase = true) => 
        ignoreCase ? s.toLowerCase().endsWith(toLower(pattern))
            : s.endsWith(pattern);

/** Determines whether a string fails to terminate with a specified pattern
 * @param s - The text to test
 * @param pattern - The pattern to match
 * @param ignoreCase - Whether text casing should be ignored
 * @returns true if test succeeds, false otherwise
 */
export const isNotTail
    = (s: string, pattern: string, ignoreCase = true) => 
        not(isTail(s,pattern,ignoreCase))

/**
 * Determines whether a substring matches the beginning or end of the subject
 * @param s - The text to test
 * @param pattern - The pattern to match
 * @param ignoreCase - Whether text casing should be ignored
 * @returns true if the subject neither begins nor ends with a specified pattern
 */
export const isNeitherHeadNorTail
    = (s: string, pattern: string, ignoreCase = true) => 
        isNotHead(s,pattern,ignoreCase) 
        && isNotTail(s,pattern,ignoreCase)

/** Determines whether a string contains a specified pattern
 * @param s - The text to test
 * @param pattern - The pattern to match
 * @param ignoreCase - Whether text casing should be ignored
 * @returns true if test succeeds, false otherwise
 */
export const contains
    = (s: string, pattern: string, ignoreCase = true) => 
    ignoreCase ? s.toLowerCase().includes(toLower(pattern))
        : s.includes(pattern);

/**
 * Implements string.replace the way it shold be implemented in the first place
 * See https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
 * for the reference implementation and explanation for this nonsense
 * In what idiotic world does "replace" mean only the first occurrence? Javascript, of course
 * @param s The source string 
 * @param match 
 * @param replacement 
 * 
 */
const replaceOccurrences 
    = (s : string, match : string, replacement : string) => 
    {
        const escape
            = (s : string) =>
                s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    
        return s.replace(new RegExp(escape(match), 'g'), replacement);
    }
        
/** Replace the occurrences of specified substrings with a substitute value
 * @param s - The soure text
 * @param match - The text to match
 * @param replacement - The replacement text
 * @param ignoreCase - Whether text casing should be ignored
 * @returns The transformed text
 */
export const replace 
    = (s: string, match: string | string[], replacement : string) =>    
    {
        if(typeof match == "string")
            return replaceOccurrences(s, match, replacement)
        else
        {
            var result = s;
            for (const pattern of match) 
                result = replaceOccurrences(result, pattern, replacement)            
            return result
        }       
    }
                
/**
 * Concatenates the textual representation of an arbibrary number of terms interspersed
 * with a specified delimiter
 * @param delimiter The delimiter to intersperse
 * @param terms The terms to concatenate
 */
export const concat
    = (delimiter : string, ...terms: any[]) =>
    {
        var result = ""
        for(var i = 0; i< terms.length; i++)
        {
            result += `${terms[i]}`
            if(i < terms.length - 1)
                result += delimiter
        }
        return result
    };

/**
 * Extracts the characters positioned to the right of, but not including,
 * a specified index
 * @param s The source string
 * @param i The index marker
 */
export const rightOf
    = (s : string, i : number)  =>
    {
        if(i >= s.length -1)
            return blank
        else
            return s.slice(i)
    }

/** 
 * Determines whether a supplied string is blank/empty
 * @param s The source string
*/
export const isBlank
    = (s: string) => s == undefined || s == blank;

/**
 * Replaces the occurrence of any substring with a blank
 * @param s The source string
 * @param matches The substrings to match
 * @returns the string obtained by replacing occurrences of the pattern with a blank
 */
export const removeAny = 
    (s: string, matches: string[]) =>
        replace(s, matches, blank)

/**
 * Replaces the occurrence of a substring with a blank
 * @param s The source string
 * @param match The substring to match
 * @returns the string obtained by replacing occurrences of the pattern with a blank
 */
export const remove 
    = (s: string, match: string) =>
        replace(s, match, blank)

/** Determines whether a string contains any of a specified set of patterns
 * @param s - The text to test
 * @param pattern - The pattern to match
 * @param ignoreCase - Whether text casing should be ignored
 * @returns true if test succeeds, false otherwise
 */
export const containsAny
    = (s: string, patterns: string[], ignoreCase = true) => 
        List.any(patterns, pattern => contains(s, pattern,ignoreCase))
