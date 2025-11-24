import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');
const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
		'./node_modules/streamdown/dist/*.js'
	],
	theme: {
    	transparent: 'transparent',
    	current: 'currentColor',
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			warning: {
    				DEFAULT: 'hsl(var(--warning))',
    				foreground: 'hsl(var(--warning-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			mutedgray: {
    				DEFAULT: 'hsl(var(--mutedgray))',
    				foreground: 'hsl(var(--mutedgray-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			tremor: {
    				brand: {
    					faint: '#eff6ff',
    					muted: '#bfdbfe',
    					subtle: '#60a5fa',
    					DEFAULT: '#3b82f6',
    					emphasis: '#1d4ed8',
    					inverted: '#ffffff'
    				},
    				background: {
    					muted: '#f9fafb',
    					subtle: '#f3f4f6',
    					DEFAULT: '#ffffff',
    					emphasis: '#374151'
    				},
    				border: {
    					DEFAULT: '#e5e7eb'
    				},
    				ring: {
    					DEFAULT: '#e5e7eb'
    				},
    				content: {
    					subtle: '#9ca3af',
    					DEFAULT: '#6b7280',
    					emphasis: '#374151',
    					strong: '#111827',
    					inverted: '#ffffff'
    				}
    			},
    			'dark-tremor': {
    				brand: {
    					faint: 'hsl(var(--background))',
    					muted: 'hsl(var(--muted))',
    					subtle: '#1e40af',
    					DEFAULT: '#3b82f6',
    					emphasis: '#60a5fa',
    					inverted: 'hsl(var(--muted))'
    				},
    				background: {
    					muted: 'hsl(var(--muted))',
    					subtle: 'hsl(var(--muted))',
    					DEFAULT: 'hsl(var(--background))',
    					emphasis: '#d1d5db'
    				},
    				border: {
    					DEFAULT: 'hsl(var(--border))'
    				},
    				ring: {
    					DEFAULT: 'hsl(var(--muted))'
    				},
    				content: {
    					subtle: '#4b5563',
    					DEFAULT: '#6b7280',
    					emphasis: '#e5e7eb',
    					strong: '#f9fafb',
    					inverted: '#000000'
    				}
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		boxShadow: {
    			'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    			'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    			'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    			'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    			'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    			'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    			shine: '0_2px_3px_0_theme(colors.black/65%),0_0_0_1px_theme(colors.white/10%),0_-1px_0_0_theme(colors.white/15%)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)',
    			'tremor-small': '0.375rem',
    			'tremor-default': '0.5rem',
    			'tremor-full': '9999px'
    		},
    		fontSize: {
    			'tremor-label': '0.75rem',
    			'tremor-default': [
    				'0.875rem',
    				{
    					lineHeight: '1.25rem'
    				}
    			],
    			'tremor-title': [
    				'1.125rem',
    				{
    					lineHeight: '1.75rem'
    				}
    			],
    			'tremor-metric': [
    				'1.875rem',
    				{
    					lineHeight: '2.25rem'
    				}
    			]
    		},
    		fontFamily: {
    			sans: [
    				'var(--font-sans)',
                    ...fontFamily.sans
                ]
    		},
    		keyframes: {
    			'border-beam': {
    				'100%': {
    					'offset-distance': '100%'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			slide: {
    				to: {
    					transform: 'translate(calc(100cqw - 100%), 0)'
    				}
    			},
    			grid: {
    				'0%': {
    					transform: 'translateY(0)'
    				},
    				'100%': {
    					transform: 'translateY(-50%)'
    				}
    			},
    			meteor: {
    				'0%': {
    					transform: 'rotate(215deg) translateX(0)',
    					opacity: '1'
    				},
    				'70%': {
    					opacity: '1'
    				},
    				'100%': {
    					transform: 'rotate(215deg) translateX(-500px)',
    					opacity: '0'
    				}
    			},
    			shimmer: {
    				from: {
    					backgroundPosition: '0 0'
    				},
    				to: {
    					backgroundPosition: '-200% 0'
    				}
    			},
    			orbit: {
    				'0%': {
    					transform: 'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)'
    				},
    				'100%': {
    					transform: 'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)'
    				}
    			},
    			marquee: {
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(calc(-100% - var(--gap)))'
    				}
    			},
    			'marquee-vertical': {
    				from: {
    					transform: 'translateY(0)'
    				},
    				to: {
    					transform: 'translateY(calc(-100% - var(--gap)))'
    				}
    			},
    			'subtle-movement': {
    				'0%': {
    					transform: 'translate(0, 0)'
    				},
    				'10%': {
    					transform: 'translate(2px, -2px)'
    				},
    				'20%': {
    					transform: 'translate(-2px, 2px)'
    				},
    				'30%': {
    					transform: 'translate(1px, -1px)'
    				},
    				'40%': {
    					transform: 'translate(-1px, 1px)'
    				},
    				'50%': {
    					transform: 'translate(2px, 2px)'
    				},
    				'60%': {
    					transform: 'translate(-2px, -2px)'
    				},
    				'70%': {
    					transform: 'translate(1px, 2px)'
    				},
    				'80%': {
    					transform: 'translate(-1px, -2px)'
    				},
    				'90%': {
    					transform: 'translate(2px, -1px)'
    				},
    				'100%': {
    					transform: 'translate(0, 0)'
    				}
    			}
    		},
    		animation: {
    			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			slide: 'slide var(--speed) ease-in-out infinite alternate',
    			'meteor-effect': 'meteor 5s linear infinite',
    			shimmer: 'shimmer 2s linear infinite',
    			orbit: 'orbit calc(var(--duration)*1s) linear infinite',
    			marquee: 'marquee var(--duration) linear infinite',
    			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
    			'subtle-movement': 'subtle-movement 8s infinite',
    			grid: 'grid 30s ease-in-out infinite'
    		}
    	}
    },
	safelist: [
		{
			pattern:
				/^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected']
		},
		{
			pattern:
				/^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected']
		},
		{
			pattern:
				/^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected']
		},
		{
			pattern:
				/^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
		},
		{
			pattern:
				/^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
		},
		{
			pattern:
				/^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
		}
	],
	plugins: [
		require('@tailwindcss/forms'),
		require('tailwindcss-animate'),
		require('@headlessui/tailwindcss'),
		require('@tailwindcss/typography')
	]
};
export default config;
