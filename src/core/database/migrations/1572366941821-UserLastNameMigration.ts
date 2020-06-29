import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';
import { User } from '../../../api/models/User';

/**
 * This is an example for a migration
 * It follows TypeOrm's migration schema and uses it's API
*/

export default class UserExampleModelLastNameMigration1572366941821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const hasColumn = await queryRunner.hasColumn(User.TABLE_NAME, 'last_name');
        if (!hasColumn) {
            const column = new TableColumn({
                name: 'last_name',
                type: 'varchar',
                length: '50',
                isNullable: true,
                isUnique: false,
            });
            await queryRunner.addColumn(User.TABLE_NAME, column);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const hasColumn = await queryRunner.hasColumn(User.TABLE_NAME, 'last_name');
        if (hasColumn) {
            await queryRunner.dropColumn(User.TABLE_NAME, 'last_name');
        }
    }

}
