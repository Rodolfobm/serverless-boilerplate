
import { Context, Callback } from 'aws-lambda';
import { ProxyResultBuilder } from './ProxyResultBuilder';

export abstract class ServerlessHandler<T, T1> {
    public abstract async onHandleEvent(event: T, context: Context): Promise<T1>;

    public execute(event: T, context: Context, callback: Callback): void {
        this.onHandleEvent(event, context)
            .then((response) => this.onReplyResponse(response, callback))
            .catch((error) => this.onReplyError(error, callback));
    }

    protected onReplyResponse(response: T1, callback: Callback): void {
        callback(undefined, response as any);
    }

    protected onReplyError(error: Error, callback: Callback): void {
        callback(error, new ProxyResultBuilder()
            .status(500)
            .body(error)
            .build());
    }
}
