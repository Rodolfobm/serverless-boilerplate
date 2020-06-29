import { Context, Callback } from 'aws-lambda';
import { Connection } from 'typeorm';
import { ServerlessHandler } from './ServerlessHandler';
import Database from './database/Database';

export abstract class DatabaseServerlessHandler<T, T1> extends ServerlessHandler<T, T1> {

    public connection: Connection;

    public execute(event: T, context: Context, callback: Callback): void {
        this.executeInternal(event, context)
            .then((response) => this.onReplyResponse(response, callback))
            .catch((error) => this.onReplyError(error, callback));
    }

    public abstract initializeDependencies?(): void;

    private async executeInternal(event: T, context: Context): Promise<T1> {
        const database = new Database();
        try {
            await database.connect();
            this.connection = database.connection;
            if (this.initializeDependencies) {
                this.initializeDependencies();
            }
            const result = await this.onHandleEvent(event, context);
            await database.disconnect();
            return result;
        } catch (e) {
            await database.disconnect();
            throw e;
        } finally {
            await database.disconnect();
        }
    }
}
