import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
			},
			colors: {
				background: "hsl(var(--bg))",
				raised: "hsl(var(--raised))",
				line: {
					DEFAULT: "hsl(var(--line))",
					strong: "hsl(var(--line-strong))",
				},
				foreground: "hsl(var(--fg))",
				muted: "hsl(var(--fg-muted))",
				subtle: "hsl(var(--fg-subtle))",
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-fg))",
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
