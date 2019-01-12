export default function({ store }) {
  const breakPoints = { sm: 576, md: 768, lg: 992, xl: 1200 }

  const onResize = () => {
    const { innerWidth: width } = window
    const { sm, md, lg, xl } = breakPoints
    let breakpoint = ''
    if (width <= sm) {
      breakpoint = 'sm'
    } else if (width <= md) {
      breakpoint = 'md'
    } else if (width <= lg) {
      breakpoint = 'lg'
    } else {
      breakpoint = 'xl'
    }

    store.commit('setBreakpoint', breakpoint)
  }

  onResize()
  window.addEventListener('resize', onResize)
}
