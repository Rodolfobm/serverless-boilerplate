import * as dotenv from 'dotenv';
dotenv.config();

import * as path from 'path';
import * as jsonfile from 'jsonfile';
import connectionOpt from './ConnectionOptions';

const content = { ...connectionOpt };
const filePath = path.join(process.cwd(), 'ormconfig.json');

jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
    if (err === null) {
        process.exit(0);
    } else {
        console.error('Failed to generate the ormconfig.json', err);
        process.exit(1);
    }
});
