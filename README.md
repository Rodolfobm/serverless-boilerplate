**Serverless Template**

Built using Serverless framework with node.js/Typescript inside AWS' infrastructure.

Strongly influenced by [w3tecch's typescript boilerplate](https://github.com/w3tecch/express-typescript-boilerplate) 

**Pre-Requisites**


*  First need to install serverless framework globally. to do so, run this following command on terminal:

    `npm i -g serverless`


*  Install aws-cli, follow the [official guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

*  Setup Serverless with [aws-cli](https://serverless.com/framework/docs/providers/aws/guide/credentials#setup-with-the-aws-cli)

*  Then install project dependencies: 

    `npm i`


**How to Run**

**AWS Env**

After all pre-requisites are fulfilled, run the following command from terminal inside the handlers folder you want to deploy, replacing [stage] for a value that matches your aws' stage.

`sls deploy --stage [stage]`

If completed succesfully, the endpoints uploaded will be shown in your terminal, user a tool like *curl* or *Postman* to test them.
You can also check the stack status inside AWS' console at *CloudFormation* service.

**Local Env**

To run a microservice locally just run the following command inside the handler folder of the service:

`sls offline`

In case you want to run more than one microservice at once, you'll need to specify a port for each:

`sls offline --port [port]`


**Folder Structure**

* **/resources**: this folder contains .yml files responsible for declaring the infrascture as code, all aws' infra. used by the system shall be declared here.

* **/src/core**: This folder contains some generic and shared classes.

* **/src/env**: This folder have an env.ts file. Inside this file all the env variables are imported from proccess.env to a **const** that can be easily imported through all system.

Inside *src/api*:

*  **handlers**: Inside handlers folder, are all of the microservices available for this system, all separated in it's own folder. e.g.: UserHandlers, TransactionHandler, etc. In each of these folders, you'll find one file per function and a single serverless.yml file describing how they shall be deployed. A handler is responsible for parsing and extracting relevant information from the event, to direct it to the correct service and to parse the response sent.

* **models**: Inside models folder, are all entities mapped by the system. Each one in it's own file. These are used by TypeOrm to map DB relations and to build the database through it's decorators.

* **services**: A Service is responsible for the business logic and is the only one to have access to a repositorie's methods. 

* **repositories**: A Repository is responsible for all operations made inside the database and is only accessible via service. For the operations, TypeOrm provides generic classes for commom functionsa and an API for custom ones.

* **dtos**: DTOs (data transfer object) are the objects received by a function, which need to be mapped to an entity in order to work TypeOrm, also the responses sent by the functions shall also be mapped to a dto.
    * **dtos/requests/**: All objects received by a function shall be mapped in this folder and shall end it's name with Req.ts. e.g UserReq.ts, TransactionReq.ts
    * **dtos/responses/**: All objects return by a function shall be mapped in this folder and shal end it's name with Res.ts. e.g UserRes.ts, TransactionRes.ts

* **mappers**: Mapper is a class responsible for mapping a request dto to an Entity and an Entity to a response dto. An generic Mapper already exists and other mappers should extend it.

* **errors**: All custom errors shall be defined here. AWS-lambda expects the response to be a ProxyResult type - A ProxyResultBuilder is available inside *src/core*.


## **Database/TypeOrm Scripts**
As the project grows further, database tends to have changes and to grow, in these situations we use migrations to keep track of the changes. [TypeOrm](https://typeorm.io/#/) provides us
with a cli to manage our database changes and an [API](https://typeorm.io/#/migrations/using-migration-api-to-write-migrations) to change our schema programatically without the need to run native queries.
Our migrations are located inside: *src/core/database/migrations*.

**OBS:** All commands cited bellow are wrapped using *npm* and *nps*, for the real commands, check *package-scripts.js* file.

### **Setup Database**
The database creation is already covered by serverless.yml's resources but to update it to the latest schema, you need to run the following command:

`npm run setup`

**OBS:** if you already have a schema filled with data, this command will erase it all, recreate the schema and run all migrations available.

### **Create a new migration**
To create a new migration, run the following command:

`npm run migration-create -- -n [MigrationName]`

**E.g**: `npm run migration-create -- -n UserLastNameMigration`

This will only generate a migration file, which implements a *MigrationInterface* that requires the implementation of 2 methods *up* and *down*.

***up*** represents the changes the migration must do when ran.

***down*** represents the changes the migration must do when reverted.

**OBS:** The migration API does not validate automatically the existence or non-existence of tables, columns, FKs, etc. This must be done manually.


### **Run Migrations**
When you execute the migrations, all migrations that were not ran until this moment will be executed. TypeOrm controls this through a table named *migrations*.

To run migrations, run the following command:

`npm run migrate`

### **Revert Migrations**
When you revert a migration, only the last migration will be reverted.

To revert a migration, run the following command:

`npm run revert`


