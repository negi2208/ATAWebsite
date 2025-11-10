/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
    
      colors: {
        primary: {
          50:  '#fef2f2',  
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#e3010f',  // ← MAIN RED (buttons, links, accents)
          600: '#dc0d1a',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        secondary: {
          50:  '#f0fdf4',
          500: '#10b981',  
          700: '#047857',
          800: '#FACC15',
        },
        neutral: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#eff4f7',
          500: '#6b7280',
          700: '#374151',
          900: '#111827',
        },
      },

      fontFamily: {
        sans:    ['"Open Sans"', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        inter:   ['Inter', 'sans-serif'],
      },

      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1rem' }],
        sm:   ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem',     { lineHeight: '1.5rem' }],
        lg:   ['1.125rem', { lineHeight: '1.75rem' }],
        xl:   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem',  { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem',  { lineHeight: '2.5rem' }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};