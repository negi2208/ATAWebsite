/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // Include all JS/TS files in src
    "./public/index.html",          // Include HTML files
    // Add other paths as needed for your project
  ],
  theme: {
    extend: {
      // Custom color palette inspired by Ignavo (clean, modern, WooCommerce-style)
      colors: {
        primary: {
          50: '#eff6ff',   // Very light blue (for backgrounds)
          100: '#dbeafe',
          500: '#3b82f6',  // Main brand blue (buttons, links)
          600: '#2563eb',
          700: '#1d4ed8',  // Darker blue for hover states
          900: '#1e3a8a',  // Deep navy (headings, accents)
        },
        secondary: {
          50: '#f0fdf4',   // Light green (success, sale tags)
          500: '#10b981',  // Vibrant green for CTAs
          700: '#047857',  // Darker green for hover
        },
        neutral: {
          50: '#f9fafb',   // Off-white background
          100: '#f3f4f6',  // Light gray (cards, borders)
          500: '#6b7280',  // Medium gray (body text)
          700: '#374151',  // Darker gray (subheadings)
          900: '#111827',  // Almost black (main dark mode bg)
        },
        // Add more custom colors if needed (e.g., warning, error)
      },

      // Custom font families matching Ignavo's typography
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],     // Body text
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],   // Headings (bold, modern)
        // Replace with 'Poppins' or 'Roboto' if used in Ignavo
      },

      // Optional: Fine-tune font sizes for better responsiveness
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      },
    },
  },
  plugins: [
    // Optional: Add Tailwind Typography plugin for rich text styling
    require('@tailwindcss/typography'),
    // Add forms, aspect-ratio, etc. if needed
  ],
};