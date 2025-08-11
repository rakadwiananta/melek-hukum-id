import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-red-500', 'bg-orange-500', 'bg-blue-500',
    'from-red-600', 'to-rose-600', 'from-red-600/5', 'to-amber-600/5',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
