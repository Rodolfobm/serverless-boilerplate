import { join } from 'path';
import __MODELS__ from './Models';
import __MIGRATIONS__ from './Migrations';

export function getOsEnv(key: string): string | undefined {
    return process.env[key];
}

export function getPath(path: string): string {
    return (process.env.NODE_ENV === 'production')
        ? join(process.cwd(), path.replace('src/', 'dist/').slice(0, -3) + '.js')
        : join(process.cwd(), path);
}

export function getPaths(paths: string[]): string[] {
    return paths.map(p => getPath(p));
}

export function getOsPaths(key: string): string[] {
    return getPaths(getOsEnvArray(key));
}

export function getOsEnvArray(key: string, delimiter: string = ','): string[] {
    return process.env[key] && process.env[key].split(delimiter) || [];
}

export function toNumber(value: string): number {
    return parseInt(value, 10);
}

export function toBool(value: string): boolean {
    return value === 'true';
}

export function getOsPath(key: string): string {
    const osEnv = getOsEnv(key);
    return osEnv ? getPath(osEnv) : undefined;
}

export function getOsEnvModels(key: string): (string | Function)[] {
    return getOsEnv('isWebpacked') ? __MODELS__ : getOsPaths(key);
}

export function getOsEnvMigrations(key: string): (string | Function)[] {
    return getOsEnv('isWebpacked') ? __MIGRATIONS__ : getOsPaths(key);
}


export function normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}
