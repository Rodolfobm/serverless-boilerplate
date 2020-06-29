import { ProxyResult } from 'aws-lambda';

export class ProxyResultBuilder {

    protected response: Partial<ProxyResult> = {};

    constructor() {
        this.response.headers = {};
    }

    public status(status: number): ProxyResultBuilder {
        this.response.statusCode = status;
        return this;
    }

    public body(body: string | object): ProxyResultBuilder {
        if (typeof body === 'string') {
            this.response.body = body;
        } else if (typeof body === 'object') {
            this.response.body = JSON.stringify(body);
            this.header('Content-Type', 'application/json');
        }

        return this;
    }

    public header(headerKey: string, headerValue: string): ProxyResultBuilder {
        this.response.headers[headerKey] = headerValue;
        return this;
    }

    public build(): ProxyResult {
        if (this.response.statusCode) {
            this.response.headers['Access-Control-Allow-Origin'] = '*';
            this.response.headers['Access-Control-Allow-Credentials'] = 'true';
            return this.response as ProxyResult;
        }

        throw new Error('Missing status code');
    }
}
