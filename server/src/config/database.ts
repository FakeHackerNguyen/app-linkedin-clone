import mongoose from 'mongoose';

class Database {
  private uri: string = '';
  private options?: mongoose.ConnectOptions = {};

  constructor(uri: string, options?: mongoose.ConnectOptions) {
    this.uri = uri;
    this.options = options;
  }

  public async connect(): Promise<void> {
    await mongoose.connect(this.uri, this.options);
    console.log(
      `Connected to database: ${mongoose.connection.db?.databaseName}`,
    );
  }

  public async disconect(): Promise<void> {
    await mongoose.disconnect();
    console.log(
      `Disconnected from database: ${mongoose.connection.db?.databaseName}`,
    );
  }
}

export default Database;
