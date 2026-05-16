import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brutal': {
          yellow: '#FDE047',
          pink: '#F472B6',
          cyan: '#67E8F9',
          lime: '#A3E635',
          orange: '#FB923C',
          violet: '#A78BFA',
          black: '#000000',
          white: '#FFFFFF',
          gray: '#F1F5F9',
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-xl': '12px 12px 0px 0px #000000',
      },
      fontFamily: {
        'brutal': ['var(--font-space-grotesk)', 'Inter', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}

export default config
