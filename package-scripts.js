const { series } = require('nps-utils');

module.exports = {
    scripts: {
        db: {
            config: {
                script: series('sls export-env', runFast('./src/core/database/ormconfig.ts')),
                description: 'Generates ormconfig.json file',
            },
            sync: {
                script: series('nps db.config', runTypeOrm('schema:sync')),
                description: 'Sync models to database. DO NOT USE IN PRODUCTION.',
            },
            migrate: {
                run: {
                    script: series('nps db.config', runTypeOrm('migration:run')),
                    description: 'Migrates database to newest version',
                },
                revert: {
                    script: series('nps db.config', runTypeOrm('migration:revert')),
                    description: 'Reverts the last migration - Run down() method of migration',
                },
            },
            drop: {
                script: series('nps db.config', runTypeOrm('schema:drop')),
                description: 'Drops the schema of the database',
            },
            setup: {
                script: series('nps db.drop', 'nps db.sync', 'nps db.migrate.run'),
                description: 'Recreates database with no data',
            },
        },
        offline: {
            dev: {
                script: 'sls offline',
                description: 'Start serverless offline on dev env',
            },
            test: {
                script: 'sls offline --stage test',
                description: 'Start serverless offline on test env',
            },
        },
        deploy: {
            dev: {
                script: 'sls deploy',
                description: 'Deploys service on dev env',
            },
            test: {
                script: 'sls deploy --stage test',
                description: 'Deploys service on test env',
            },
            stage: {
                script: 'sls deploy --stage stage',
                description: 'Deploys service on test env',
            },
        },
    },
};

function runTestScript(handler, test) {
    return series(`cd src/api/handlers/${handler}`, 'nps deploy.test', `sls offline --stage test --exec "jest -i ${test}"`, `cd ${__dirname}`);
}

function runFast(path) {
    return `ts-node ${path}`;
}

function runTypeOrm(command) {
    return runFast(`./node_modules/typeorm/cli.js ${command}`);
}

//     scripts: {
//         offline: {
//             dev: {
//                 script: 'sls offline',
//                 description: 'Start serverless offline on dev env',
//             },
//             test: {
//                 script: 'sls offline --stage test --region us-west-1',
//                 description: 'Start serverless offline on test env',
//             }
//         },
//         deploy: {
//             dev: {
//                 script: 'sls deploy',
//                 description: 'Deploys service on dev env',
//             },
//             test: {
//                 script: 'sls deploy --stage test --region us-west-1',
//                 description: 'Deploys service on test env',
//             },
//             stage: {
//                 script: 'sls deploy --stage stage --region us-west-1',
//                 description: 'Deploys service on test env',
//             }
//         },
//         test: {
//             default: {
//                 script: series(
//                     'nps test.user',
//                     'nps test.custom',
//                 ),
//             },
//             user: {
//                 script: series(
//                     'nps deploy.test',
//                     'sls offline --stage test --region us-west-1 --exec "jest -i ./test/e2e/user"',
//                 ),
//                 description: 'Run tests for root serverless.yml',
//             },
//             /*
//                 Used only for demonstration on how to create a script fortesting a service 
//             */
//             custom: {
//                 script: series(
//                     `cd src\\api\\handlers\\TestHandlers`,
//                     'nps deploy.test',
//                     'sls offline --stage test --region us-west-1 --exec "jest -i ./test/e2e/custom"',
//                     `cd ${__dirname}`,
//                 ),
//                 description: 'Run tests for {service} serverless.yml',
//             }
//         }
//     }
// }