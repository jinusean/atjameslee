import Modal from '@/components/base/Modal'
import { shallowMount } from '@vue/test-utils'

describe('Modal', () => {
  let wrapper

  it('is open', async () => {
    wrapper = shallowMount(Modal, {
      propsData: {
        active: true,
      },
    })

    expect(wrapper.find('#modal').exists()).toBeTruthy()
    expect(wrapper.find('#modal').exists()).toBeTruthy()
  })
})
