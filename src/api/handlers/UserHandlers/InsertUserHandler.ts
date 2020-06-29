import { DatabaseServerlessHandler } from '../../../core/DatabaseServerlessHandler';
import { APIGatewayEvent, ProxyResult, Context, Handler, Callback } from 'aws-lambda';
import { ProxyResultBuilder } from '../../../core/ProxyResultBuilder';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';

/*
 * This Class is meant to be used only as an Example
 * It is composed by a Class, which is responsible for executing all logic (with it's services and repositories)
 * And an exported handler, which exports all our logic to the format required by AWS-lambda

 * The Class extends a Generic DatabaseHandler, which already has all the flow required by Aws-Lambda
 * When we extend some of those abstract classes, we need to implement some functions:
 * {onHandleEvent} => Works as an Controller, receives the event, maps it and directs it to the service responsible for it
 * {initializeDependencies} => Due to serverless nature, at any function call, we need to open and close a database connection.
 *  This is done already by DatabaseServerlessHandler, but our services will, in most cases, need to receive this connection which is not
 *  promptly available. So, in that function we will initialize all our services which need the connection instance, this method is already called 
 *  by DatabaseServerlessHandler
*/

class InsertUserHandler extends DatabaseServerlessHandler<APIGatewayEvent, ProxyResult> {

    private userService: UserService;

    constructor() {
        super();
    }

    public initializeDependencies(): void {
        this.userService = new UserService(this.connection);
    }

    public async onHandleEvent(event: APIGatewayEvent, __: Context): Promise<ProxyResult> {
        const user = new User();
        const userReq = (JSON.parse(event.body) as User)
        user.name = userReq.name;
        user.lastName = userReq.lastName;
        const respose = await this.userService.insert(user);

        return new ProxyResultBuilder()
            .status(200)
            .body(respose)
            .build();
    }
}

export const handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const mHandler = new InsertUserHandler();
    mHandler.execute(event, context, cb);
};
