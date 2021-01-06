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
}
