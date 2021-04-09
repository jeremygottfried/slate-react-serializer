import getSerializer from '.'

const serializer = getSerializer()

describe('Serializer', () => {
  it('is truthy', () => {
    expect(serializer).toBeTruthy()
  })
})
