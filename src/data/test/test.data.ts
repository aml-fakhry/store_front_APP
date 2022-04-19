import { Database } from '../../server';
import { DataResult } from '../../shared';

export class TestDataAccess {
  /**
   * getData() method to get data.
   * @returns data result.
   */
  static async GetData(): Promise<DataResult> {
    const result: DataResult = {} as DataResult;
    try {
      const query = 'SELECT * FROM test;';
      result.data = await Database.query(query);
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  /*  Get File suffix. */
  static getFileSuffix(filename: string, width: number, height: number) {
    return `${filename}_${width}_${height}`;
  }
}
