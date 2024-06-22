import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'
import favicons from "astro-favicons"

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
	site: 'https://example.me',
	integrations: [
		expressiveCode(expressiveCodeOptions),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon(),
		favicons({
			masterPicture: "./src/icons/favicon.svg",
			// emitAssets: true,
			appName: "",
			appShortName: "",
			appDescription: "",
			// dir:"auto",
			lang: "en-US",
			// display: "standalone",
			// orientation: "any",
			// start_url: "/?homescreen=1",
			background: "#fff",
			theme_color: "#fff",
			faviconsDarkMode: false,
			// appleStatusBarStyle: "black-translucent",
		}),
	],
	markdown: {
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow, noopener, noreferrer']
				}
			]
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: ['']
			}
		}
	},
	prefetch: true,
	output: 'server',
	adapter: vercel({
		webAnalytics: { enabled: true }
	})
})
