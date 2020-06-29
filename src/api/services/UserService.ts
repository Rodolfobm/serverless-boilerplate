import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { Connection } from 'typeorm';

export class UserService {

    private userRepository: UserRepository;

    constructor(conn: Connection) {
        this.userRepository = conn.getCustomRepository<UserRepository>(UserRepository);
    }

    public async insert(user: User): Promise<User> {
        console.log(`UserService: insert - ${JSON.stringify(user)}`);

        return await this.userRepository.save(user);
    }
}
