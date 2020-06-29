import { ProxyResultBuilder } from '../../core/ProxyResultBuilder';


export class UnauthorizedError extends ProxyResultBuilder {

    constructor() {
        super();
        super.status(401).body({ message: 'Unauthorized!' });
    }
}
