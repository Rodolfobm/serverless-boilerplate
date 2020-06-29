import { ServerlessHandler } from '../../../core/ServerlessHandler';
import { APIGatewayEvent, ProxyResult, Context, Callback, Handler } from 'aws-lambda';
import { ProxyResultBuilder } from '../../../core/ProxyResultBuilder';

/*
Used only for example on integration testing 2+ services at once.
Check package-scripts.js for testing scripts
*/
class TestHandler extends ServerlessHandler<APIGatewayEvent, ProxyResult> {

    public async onHandleEvent(_: APIGatewayEvent, __: Context): Promise<ProxyResult> {
        console.log('TESTING HANDLER');

        return new ProxyResultBuilder()
            .status(200)
            .body({ custom: 'Success' })
            .build();
    }
}

export const handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const mHandler = new TestHandler();
    mHandler.execute(event, context, cb);
};
