import Modal from '@/components/base/Modal'
import { mount } from '@vue/test-utils'

const propsData = Object.freeze({
  active: true,
  bodyClass: 'BODY-CLASS',
  closeESc: true,
  closeButton: true,
  duration: 100,
})

const mountModal = (props = {}) => {
  const elem = document.createElement('div')
  document.body.appendChild(elem)
  return mount(Modal, {
    propsData: { ...propsData, ...props },
    attachTo: elem,
  })
}

const expectOpen = (wrapper) => expect(wrapper.vm.$refs.modal).toBeTruthy()
const expectClose = (wrapper) => expect(wrapper.vm.$refs.modal).toBeFalsy()

describe('Modal.vue', () => {
  let wrapper

  describe('active prop', () => {
    it('should be closed', () => {
      wrapper = mountModal({ active: false })
      expectClose(wrapper)
    })
    it('should be open', () => {
      expectOpen(mountModal({ active: true }))
    })

    it('should toggle', async () => {
      wrapper = mountModal({ active: true })
      wrapper.setProps({ active: false })
      await wrapper.vm.$nextTick()
      expectClose(wrapper)
      wrapper.setProps({ active: true })
      await wrapper.vm.$nextTick()
      expectOpen(wrapper)
    })
  })

  describe('close-button prop', () => {
    it('should have close button', () => {
      wrapper = mountModal({ closeButton: true })
      expect(wrapper.vm.$refs.closeButton).toBeTruthy()
    })
    it('should not have close button', () => {
      wrapper = mountModal({ closeButton: false })
      expect(wrapper.vm.$refs.closeButton).toBeFalsy()
    })

    it('should close modal', async () => {
      wrapper = mountModal({ closeButton: true })
      expectOpen(wrapper) // make sure the modal is visible first
      let closeButton = wrapper.findComponent({ ref: 'closeButton' })
      expect(closeButton.exists()).toBeTruthy()

      await closeButton.trigger('click')

      closeButton = wrapper.findComponent({ ref: 'closeButton' })
      expect(closeButton.exists()).toBeFalsy()
    })
  })

  describe('bodyClass prop', () => {
    const bodyClass = 'asdf-asdf-asdf-asdf'

    beforeEach(() => {
      wrapper = mountModal({ bodyClass })
    })

    it('should have bodyClass prop', () => {
      expect(document.body.classList).toContain(bodyClass)
    })

    it('should remove bodyClass prop', async () => {
      expect(document.body.classList).toContain(bodyClass)
      wrapper.setProps({ active: false })
      await wrapper.vm.$nextTick()
      expect(document.body.classList).not.toContain(bodyClass)
    })
  })

  describe('close method', () => {
    beforeEach(async () => {
      wrapper = mount(Modal, {
        propsData: {
          active: true,
        },
        attachTo: document.createElement('div'),
        stubs: {
          transition: true,
        },
      })
      wrapper.vm.close()
      await wrapper.vm.$nextTick()
      wrapper.vm.afterLeave() // transition does not trigger events so it needs to be manually called
      await wrapper.vm.$nextTick()
    })

    it('should emit change', () => {
      expect(wrapper.emitted('change')[0][0]).toBeFalsy()
    })

    it('should be closed', () => {
      expectClose(wrapper)
    })
  })

  describe('mouse and key listeners', () => {
    it('should close on esc', async () => {
      wrapper = mountModal({ closeEsc: true })
      expectOpen(wrapper)
      await wrapper.trigger('keydown.esc')
      expectClose(wrapper)
    })
    it('should not close on esc', async () => {
      wrapper = mountModal({ closeEsc: false })
      expectOpen(wrapper)
      await wrapper.trigger('keydown.esc')
      expectOpen(wrapper)
    })

    it('should close on outside click', async () => {
      const button = document.createElement('button')
      document.body.appendChild(button)
      wrapper = mountModal({ closeClick: true })
      expectOpen(wrapper)
      button.click()
      await wrapper.vm.$nextTick()
      expectClose(wrapper)
    })

    it('should stay open on outside click', async () => {
      const button = document.createElement('button')
      button.id = 'asdf'
      document.body.appendChild(button)
      wrapper = mountModal({ closeClick: false })
      expectOpen(wrapper)
      button.click()
      await wrapper.vm.$nextTick()
      expectOpen(wrapper)
    })
  })
})
