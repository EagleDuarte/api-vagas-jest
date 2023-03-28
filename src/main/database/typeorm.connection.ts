import { DataSource } from "typeorm";
import typeormConfig from "../config/typeorm.config";

export class DatabaseConnection {

  private static _connection: DataSource;

  public static async connect() {
    if(!this._connection) {
      this._connection = await typeormConfig.initialize();
    }
    console.log('Database running!')
  }

  public static get connection() {
    if(!this._connection) {
      throw new Error('Alright, already running!')
    }
    return this._connection;
  }

}