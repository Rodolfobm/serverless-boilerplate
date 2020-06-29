import { ProxyResultBuilder } from '../../core/ProxyResultBuilder';

export default function CatchError(): any {

    return (_: object, __: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const originalValue = descriptor.value;
        descriptor.value = async function(...args: any[]): Promise<any> {
            try {
                return await originalValue.apply(this, args);
            } catch (error) {
                if (error.status) {
                    return (error as ProxyResultBuilder).build();
                }
                throw error;
            }
        };
        return descriptor;
    };
}
