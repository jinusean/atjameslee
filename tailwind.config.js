module.exports = {
  exposeConfig: true,
  theme: {
    extend: {
      colors: {
        slate: '#222222',
      },
      minWidth: {
        128: '32rem',
      },
    },
  },
  variants: {
    margin: ['children', 'responsive', 'last', 'important'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    padding: ['responsive', 'important'],
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
    transform: ['responsive', 'group-hover'],
    transitionProperty: ['responsive', 'group-hover'],
    transitionTimingFunction: ['responsive', 'group-hover'],
    transitionDuration: ['responsive', 'group-hover'],
    transitionDelay: ['responsive', 'group-hover'],
  },
  plugins: [
    require('tailwind-percentage-heights-plugin')(),
    require('@neojp/tailwindcss-important-variant'),
    require('tailwindcss-children'),
  ],
}
