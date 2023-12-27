// @ts-check

// CTRL+F for "set this" to find all the fields with placeholder values.
// For other configuration options,
// see: https://docusaurus.io/docs/api/themes/configuration

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Interactive Presentation Template',  // set this
    favicon: 'img/favicon.ico',

    // The url for your site: <url>/<baseUrl>/
    url: 'https://gvarnavi.github.io',  // set this
    baseUrl: '/interactive-presentation-template/',  // set this

    // Author, affiliation, and bit.ly links (and any other custom fields you want)
    customFields: {
      author: "Dr. Georgios Varnavides", // set this
      affiliation: "UCB, LBNL", // set this
      bitly: "bit.ly/interactive-template", //set this
    },

    // (optional) GitHub pages deployment config.
    organizationName: 'gvarnavi',  // set this – GitHub Org or Username
    projectName: 'interactive-presentation-template',  // set this – repo name
    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
		    path: 'slides/',
          	    routeBasePath: 'slides/',
		    breadcrumbs: false,
                    sidebarPath: './sidebars.js',
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
		blog: false,
                theme: {
                    customCss: './src/css/custom.scss',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // set this - Replace with your project's social card
            image: 'img/logo.svg',
            docs: {
                sidebar: {
                    hideable: true,
	  	    autoCollapseCategories: false,
                }
            },
            navbar: {
                title: 'Interactive Presentation Template | bit.ly/interactive-template',  // set this
                logo: {
                    alt: 'Slides',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        to: 'slides/outline/',
                        position: 'left',
                        label: 'Slides',
                    },
                ],
            },
            footer: {
                style: 'light',
                copyright: `Copyright © ${new Date().getFullYear()} Georgios Varnavides`,
            },
            prism: {
                theme: prismThemes.github,
            },
	    colorMode: {
		defaultMode: 'light',
		disableSwitch: true,
	    },
        }),

    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],

    plugins: [
        'docusaurus-plugin-sass',
        async function disableUsedExports() {
            return {
                name: 'disable-used-exports',
                configureWebpack() {
                    return {
                        optimization: {
                            usedExports: false
                        }
                    }
                }
            }
        },
    ],

    themes: ['@docusaurus/theme-live-codeblock'],
    
};

export default config;
