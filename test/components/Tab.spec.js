import Tab from '@/components/base/Tab'
import Tabs from '@/components/base/Tabs'
import { shallowMount } from '@vue/test-utils'

describe('Tab', () => {
  it('should throw error', async () => {
    const testMount = () =>
      shallowMount(Tab, {
        propsData: {
          name: 'name',
        },
      })
    expect(testMount).toThrow(Error)
  })
})
