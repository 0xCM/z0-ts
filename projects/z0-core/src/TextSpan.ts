/**
 * Defifines a rectangular boundary that contains a block of text
 */
export interface TextSpan
{
    /**
     * Specifies the 1-based and inclusive row number on which the span begins
     */
    RowMin : number

    /**
     * Specifies the 1-based and inclusive column number on which the span begins
     */
    ColMin : number
    /**
     * Specifies the 1-based and inclusive row number on which the span ends
     */
    RowMax : number

    /**
     * Specifies the 1-based and inclusive column number on which the span ends
     */
    ColMax : number
}
