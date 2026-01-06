import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        azure: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        brand: {
          hero: {
            bg: '#ffffff',
            primary: '#f97316', // Orange 500
            secondary: '#ec4899', // Pink 500
            tertiary: '#8b5cf6', // Violet 500
          },
          origin: {
            bg: '#fafaf9', // Stone 50
            text: '#44403c', // Stone 700
            accent: '#a8a29e', // Stone 400
          },
          solution: {
            bg: '#f0fdfa', // Teal 50
            text: '#0f766e', // Teal 700
            accent: '#2dd4bf', // Teal 400
          },
          impact: {
            bg: '#ffffff', // White
            text: '#4338ca', // Indigo 700
            accent: '#6366f1', // Indigo 500
          },
          beneficiaries: {
            bg: '#fff7ed', // Orange 50
            text: '#9a3412', // Orange 800
            accent: '#fb7185', // Rose 400
          },
          feedback: {
            bg: '#f8fafc', // Slate 50
            text: '#334155', // Slate 700
            accent: '#94a3b8', // Slate 400
          }
        },
        harama: {
          // Deep Intelligence Palette - Legacy (Keeping for safety, but overriding in usage)
          bg: {
            primary: '#020617', // Slate 950
            secondary: '#0f172a', // Slate 900
          },
          text: {
            primary: '#f8fafc', // Slate 50
            secondary: '#94a3b8', // Slate 400
          },
          accent: '#38bdf8', // Sky 400 (Electric Azure)
          border: '#1e293b', // Slate 800
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-glow': 'radial-gradient(circle at center, rgba(15, 23, 42, 1) 0%, rgba(2, 6, 23, 1) 100%)',
        'hero-gradient': 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config