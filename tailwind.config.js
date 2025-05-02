/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rose-quartz': '#F7CAC9',
        'serenity-blue': '#92A8D1',
        'rose-light': '#FBE4E3',
        'rose-dark': '#D4A6A5',
        'serenity-light': '#C2D1E8',
        'serenity-dark': '#7A8EB1',
        'neutral-50': '#F9FAFB',
        'neutral-100': '#F3F4F6',
        'neutral-200': '#E5E7EB',
        'neutral-300': '#D1D5DB',
        'neutral-400': '#9CA3AF',
        'neutral-500': '#6B7280',
        'neutral-600': '#4B5563',
        'neutral-700': '#374151',
        'neutral-800': '#1F2937',
        'neutral-900': '#111827',
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        'apple': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'apple-md': '0 6px 12px -2px rgba(0, 0, 0, 0.05), 0 3px 6px -2px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'apple': '12px',
      },
    },
  },
  plugins: [],
};