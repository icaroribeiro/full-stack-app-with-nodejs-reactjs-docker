import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { UserFactory } from '../../../../factories/helpers/user.factory'
import { HttpTestFactory } from '../../../../factories/http.factory'

describe('User component (HTTP)', async () => {
  const factory: HttpTestFactory = new HttpTestFactory()
  const userFactory = new UserFactory()

  beforeAll(async () => {
    await factory.prepareAll()
  }, factory.beforeAllTimeout)

  afterEach(async () => {
    await factory.closeEach()
  })

  afterAll(async () => {
    await factory.closeAll()
  })

  describe('GET /users (empty)', async () => {
    it('should succeed and return an empty list', async () => {
      await expect(factory.getTableRowCount('users')).resolves.toEqual(0)
    })
  })
})
