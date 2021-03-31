const tiers = require('./components/misc/Tiers/tiers.json')

const safelist = []
tiers.forEach((tier) => {
  safelist.push('bg-' + tier.color)
  safelist.push('text-' + tier.color)
})

module.exports = {
  exposeConfig: true,
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: '#222222',
        smoke: '#f2f2f2',
        dark: '#181818',
      },
      minWidth: {
        128: '32rem',
      },
      boxShadow: {
        '3xl': '0px 10px 35px 2px rgba(0,0,0,0.45)',
      },
      maxHeight: {
        inherit: 'inherit',
      },
      maxWidth: {
        inherit: 'inherit',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['dark', 'hover'],
      display: ['children'],
      height: ['children'],
      margin: ['children', 'last', 'important'],
      padding: ['important'],
      scale: ['group-hover'],
      transform: ['group-hover'],
      transitionProperty: ['group-hover'],
      transitionTimingFunction: ['group-hover'],
      transitionDuration: ['group-hover'],
      transitionDelay: ['group-hover'],
      width: ['children'],
    },
  },
  plugins: [
    require('tailwind-percentage-heights-plugin')(),
    require('@neojp/tailwindcss-important-variant'),
    require('tailwindcss-children'),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    options: {
      safelist,
    },
  },
}
