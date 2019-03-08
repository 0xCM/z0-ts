export type TableName 
    = {
        TableName: string, 
        Connector: string
      }

export interface ITableStore
{
    Tables : Iterator<TableName>    
    
    /** Yields the data held in an identified table
     * @param table - The name of the source table
     * @returns - An iterator that yields the table row values
     */
    Data<T>(table: TableName) : Iterator<T>
}