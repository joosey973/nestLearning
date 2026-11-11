import { Module } from '@nestjs/common';
import { BlockUserController } from './block-user.controller';
import { BlockUserRepository } from './block-user.repository';
import { BlockUserService } from './block-user.service';
import { Pool } from 'pg';

@Module({
     controllers: [BlockUserController],
        providers: [BlockUserRepository, BlockUserService,
            {
                provide: Pool,
                useFactory: () => {
                    return new Pool({
                        host: "localhost",
                        user: "myuser",
                        password: "mypassword",
                        database: "app",
                    })
                }
            },
        ],
})
export class BlockUserModule {
    
}
