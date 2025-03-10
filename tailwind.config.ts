import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	container: {
		padding: {
		  DEFAULT: "1rem",
		  sm: "2rem",
		  lg: "4rem",
		  xl: "5rem",
		  "2xl": "6rem",
		},
	  },
  	extend: {
		backgroundImage: {
			'custom-gradient': 'linear-gradient(-14deg, #FFFFFF 0%, #F5CAAB 100%)',
			'box-total-products': 'linear-gradient(-40deg, #ffffff 0%, #5bae3d 100%)',
			'box-total-revenue': 'linear-gradient(135deg, #a98563 0%, #ffffff 100%);',
			'box-total-orders': ' linear-gradient(135deg, #f2b78d 0%, #ffffff 100%);',
		  'box-total-customer': ' linear-gradient(135deg, #c9abf5 0%, #ffffff 100%);'
		},
  		colors: {
			main : {
				primary : "#F3F3F3",
				secondary : "#181818",
				text : "#4d4e4f",
                muted : "#F9F9F9",
                accent : "#FFB540",
                destructive : "#FF0000",
                border : "#E5E5E5",
				
			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
