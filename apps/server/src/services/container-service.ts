import { container, DependencyContainer } from 'tsyringe'

import {
  HealthCheckService,
  IHealthCheckService,
} from '../api/components/health-check'
import {
  IUserRepository,
  IUserService,
  UserRepository,
  UserService,
} from '../api/components/user'
import { config } from '../config/config'
import { DBService, IDBService } from '../services/db-service'

class ContainerService {
  private readonly _container: DependencyContainer = container

  constructor() {
    this.registerDatabaseContainer()
    this.registerRepositoryContainer()
    this.registerServiceContainer()
  }

  public get container(): DependencyContainer {
    return this._container
  }

  private registerDatabaseContainer() {
    const dbService = new DBService()
    dbService.connectDatabase(config.getDatabaseURL())
    this._container.register<IDBService>('DBService', {
      useValue: dbService,
    })
  }

  private registerRepositoryContainer() {
    this._container.register<IUserRepository>('UserRepository', {
      useValue: new UserRepository(
        this._container.resolve<DBService>('DBService'),
      ),
    })
  }

  private registerServiceContainer() {
    this._container.register<IHealthCheckService>('HealthCheckService', {
      useValue: new HealthCheckService(
        this._container.resolve<DBService>('DBService'),
      ),
    })
    this._container.register<IUserService>('UserService', {
      useValue: new UserService(
        this._container.resolve<UserRepository>('UserRepository'),
      ),
    })
  }
}

export { ContainerService }