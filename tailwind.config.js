/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#5599fe',
          green: '#48df7b', 
          purple: '#b56cff',
        },
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        card: 'rgb(var(--card))',
        'card-foreground': 'rgb(var(--card-foreground))',
        popover: 'rgb(var(--popover))',
        'popover-foreground': 'rgb(var(--popover-foreground))',
        primary: 'rgb(var(--primary))',
        'primary-foreground': 'rgb(var(--primary-foreground))',
        secondary: 'rgb(var(--secondary))',
        'secondary-foreground': 'rgb(var(--secondary-foreground))',
        muted: 'rgb(var(--muted))',
        'muted-foreground': 'rgb(var(--muted-foreground))',
        accent: 'rgb(var(--accent))',
        'accent-foreground': 'rgb(var(--accent-foreground))',
        destructive: 'rgb(var(--destructive))',
        'destructive-foreground': 'rgb(var(--destructive-foreground))',
        border: 'rgb(var(--border))',
        input: 'rgb(var(--input))',
        ring: 'rgb(var(--ring))',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #8b5cf6 100%)',
        'brand-gradient-reverse': 'linear-gradient(135deg, #8b5cf6 0%, #10b981 50%, #3b82f6 100%)',
      },
    },
  },
  plugins: [],
}