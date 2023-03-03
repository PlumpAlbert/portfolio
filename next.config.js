/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: false,
	experimental: {
		fontLoaders: [
			{
				loader: "@next/font/google",
				options: {
					subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
				},
			},
		],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		})

		return config
	},
}

module.exports = nextConfig
