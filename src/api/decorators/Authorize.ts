
import { APIGatewayEvent } from 'aws-lambda';
import { UnauthorizedError } from '../errors/UnauthorizedError';

/**
 * 
 * @param role The required role to access the endpoint
 *              Can be changed to an enum instead of string
 * This authorization can be used at serverless handlers that were authorized by cognito
 * It will extract attributes from cognito's jwt bearer token 
 * and check if they match the required role to access the endpoint
 * If not it will return 401 - Unauthorized
 */

export function Authorize(role: string): any {

    return (_: object, __: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const originalValue = descriptor.value;
        const customRole = 'custom:' + role;

        descriptor.value = async function(...args: any[]): Promise<any> {
            const claims = (args[0] as APIGatewayEvent).requestContext.authorizer.claims;
            if (claims[customRole] === 'true') {
                return await originalValue.apply(this, args);
            }
            throw new UnauthorizedError();
        };
        return descriptor;
    };
}