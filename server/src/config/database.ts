import mongoose from 'mongoose';
import AppError from '../api/v1/utils/appError';

class Database {
  private uri: string = '';
  private options?: mongoose.ConnectOptions = {};

  constructor(uri: string, options?: mongoose.ConnectOptions) {
    this.uri = uri;
    this.options = options;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri, this.options);
      console.log(
        `Connected to database: ${mongoose.connection.db?.databaseName}`,
      );
    } catch (error) {
      if (error instanceof Error) throw new AppError(error.message, 500);

      throw new AppError(
        'Unknown error occurred during database connection',
        500,
      );
    }
  }

  public async disconect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log(
        `Disconnected from database: ${mongoose.connection.db?.databaseName}`,
      );
    } catch (error) {
      if (error instanceof Error) throw new AppError(error.message, 500);

      throw new AppError(
        'Unknown error occurred during database disconnection',
        500,
      );
    }
  }
}

export default Database;
