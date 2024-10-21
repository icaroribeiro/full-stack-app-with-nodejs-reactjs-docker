import * as schemas from '@db/schemas'
import { count, desc, eq } from 'drizzle-orm'

import { DBService } from '../../../services'
import { withPagination } from '../../utils'
import { UserMapper } from './user-mapper'
import { User, UserList } from './user-models'

interface IUserRepository {
  createUser(user: User): Promise<User>
  readUserList(): Promise<UserList>
  readAndCountUsers(page: number, limit: number): Promise<[UserList, number]>
  readUser(userId: string): Promise<User>
  updateUser(userId: string, user: User): Promise<User>
  deleteUser(userId: string): Promise<User>
}

class UserRepository implements IUserRepository {
  constructor(private dbService: DBService) {}

  async createUser(user: User): Promise<User> {
    const rawUserData = UserMapper.toPersistence(user)
    const result = await this.dbService.db
      .insert(schemas.usersTable)
      .values(rawUserData)
      .returning()
    return result.map((u) => UserMapper.toDomain(u))[0]
  }

  async readUserList(): Promise<UserList> {
    const result = await this.dbService.db.select().from(schemas.usersTable)
    return result.map((u) => UserMapper.toDomain(u))
  }

  async readAndCountUsers(
    page: number,
    limit: number,
  ): Promise<[UserList, number]> {
    const userListQuery = this.dbService.db.select().from(schemas.usersTable)
    const paginatedRecordsResult = await withPagination(
      userListQuery.$dynamic(),
      desc(schemas.usersTable.createdAt),
      page,
      limit,
    )
    const totalRecordsResult = await this.dbService.db
      .select({ count: count() })
      .from(schemas.usersTable)
    return [
      paginatedRecordsResult.map((u) => UserMapper.toDomain(u)),
      totalRecordsResult[0].count,
    ]
  }

  async readUser(userId: string): Promise<User> {
    const result = await this.dbService.db
      .select()
      .from(schemas.usersTable)
      .where(eq(schemas.usersTable.id, userId))
    return result.map((u) => UserMapper.toDomain(u))[0]
  }

  async updateUser(userId: string, user: User): Promise<User> {
    const result = await this.dbService.db
      .update(schemas.usersTable)
      .set({ name: user.name, email: user.email })
      .where(eq(schemas.usersTable.id, userId))
      .returning()
    return result.map((u) => UserMapper.toDomain(u))[0]
  }

  async deleteUser(userId: string): Promise<User> {
    const result = await this.dbService.db
      .delete(schemas.usersTable)
      .where(eq(schemas.usersTable.id, userId))
      .returning()
    return result.map((u) => UserMapper.toDomain(u))[0]
  }
}

export { IUserRepository, UserRepository }
