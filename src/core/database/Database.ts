import 'pg';
import {createConnection, Connection} from 'typeorm';
import connectionOpt from './ConnectionOptions';

export default class Database {

    public connection: Connection;

    public async connect(): Promise<void> {
        this.connection = await createConnection(connectionOpt);
    }

    public async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
        }
    }
}
