import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{ts,tsx}"],
	// The theme toggle sets .dark on <html>; without this, `dark:` utilities
	// would follow the OS setting instead and silently do nothing.
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
				pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
			},
			colors: {
				// Alpha-capable: /70 modifiers resolve against the raw oklch triple.
				background: "oklch(var(--base-oklch) / <alpha-value>)",
				foreground: "oklch(var(--fg-oklch) / <alpha-value>)",
				// Pre-mixed tokens — no alpha modifier, they already carry one.
				border: "var(--border)",
				accent: "var(--accent)",
				ring: "var(--ring)",
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [],
} satisfies Config;
