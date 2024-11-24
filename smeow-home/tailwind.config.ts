import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
        brown: colors.brown,
        bg: {
          l: '#BCB8B1',
          d: '#2D2D2D',
        },
        ebrown: '#85625A',
        darkgray: '#463F3A',
        lightgray1: '#8A817C',
        lightgray2: '#BCB8B1',
        badge: '#F4F3EE',
        epink: '#E0AFA0',
        edarkpink: '#D6927D',
        'ered-100': '#D15E5E',
        eyellow: '#D1B62D',
        egreen: '#32C339',
        eblue: '#2B62C8',
        esky: '#B9CAEB',
      },
      fontSize: {
        title: 'clamp(1.25rem, 2vw + 1rem, 2rem)' /* 20px to 32px */,
        'header-1': 'clamp(1.5rem,2.5vw + 1rem,2.25rem)' /* 24px to 36px */,
        'header-2':
          ' clamp(1.125rem,2vw + 0.875rem,1.75rem)' /* 18px to 28px */,
        'header-3': 'clamp(1rem,1.5vw + 0.875rem,1.5rem)' /* 16px to 24px */,
        subtitle: 'clamp(0.875rem,1.5vw + 0.75rem,1.25rem)' /* 14px to 20px */,
        'body-1':
          'clamp(0.75rem,1.25vw + 0.625rem,1.125rem)' /* 12px to 18px */,
        'body-2': 'clamp(0.625rem, 1vw + 0.5rem, 1rem)' /* 10px to 16px */,
        detail: 'clamp(0.625rem,1vw + 0.5rem,0.875rem)' /* 10px to 14px */,
        'detail-1': 'clamp(0.625rem,1vw + 0.5rem,0.875rem)' /* 10px to 14px */,
        'detail-2': 'clamp(0.5rem, 1vw + 0.5rem, 0.75rem)' /* 8px to 12px */,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
