/** @type {import('tailwindcss').Config} */
export default {
  // content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  // These paths are just examples, customize them to match your project structure
  // purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': 'repeat(6, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-1.5': 'span 3 / span 3',
      },
    }
  },
  plugins: []
}
