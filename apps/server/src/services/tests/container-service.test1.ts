vi.mock('../../db/db', (importOriginal) => {
  const original = importOriginal<typeof import('../../../../db/db')>()
  return {
    ...original,
    db: vi.fn(),
  }
})
