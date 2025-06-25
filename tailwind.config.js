// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'inset-shadow-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'inset-shadow-red-500': 'inset 0 0 10px theme("colors.red.500")',
                'inset-shadow-orange-500': 'inset 0 0 10px theme("colors.orange.500")',
                'inset-shadow-amber-500': 'inset 0 0 10px theme("colors.amber.500")',
                'inset-shadow-yellow-500': 'inset 0 0 10px theme("colors.yellow.500")',
                'inset-shadow-lime-500': 'inset 0 0 10px theme("colors.lime.500")',
                'inset-shadow-green-500': 'inset 0 0 10px theme("colors.green.500")',
                'inset-shadow-emerald-500': 'inset 0 0 10px theme("colors.emerald.500")',
                'inset-shadow-cyan-500': 'inset 0 0 10px theme("colors.cyan.500")',
                'inset-shadow-blue-500': 'inset 0 0 10px theme("colors.blue.500")',
                'inset-shadow-indigo-500': 'inset 0 0 10px theme("colors.indigo.500")',
                'inset-shadow-sky-500': 'inset 0 0 10px theme("colors.sky.500")',
                'inset-shadow-violet-500': 'inset 0 0 10px theme("colors.violet.500")',
                'inset-shadow-pink-500': 'inset 0 0 10px theme("colors.pink.500")',
                'inset-shadow-rose-500': 'inset 0 0 10px theme("colors.rose.500")',

                'shadow-red-500/50': '0 4px 6px -1px rgba(239, 68, 68, 0.5)',
                'shadow-green-500/50': '0 4px 6px -1px rgba(34, 197, 94, 0.5)',
                'shadow-blue-500/50': '0 4px 6px -1px rgba(59, 130, 246, 0.5)',
                'shadow-violet-500/50': '0 4px 6px -1px rgba(139, 92, 246, 0.5)',
                'shadow-orange-500/50': '0 4px 6px -1px rgba(249, 115, 22, 0.5)',
                'shadow-amber-500/50': '0 4px 6px -1px rgba(245, 158, 11, 0.5)',
                'shadow-cyan-500/50': '0 4px 6px -1px rgba(6, 182, 212, 0.5)',
                'shadow-emerald-500/50': '0 4px 6px -1px rgba(16, 185, 129, 0.5)',
                'shadow-pink-500/50': '0 4px 6px -1px rgba(236, 72, 153, 0.5)',
                'shadow-rose-500/50': '0 4px 6px -1px rgba(244, 63, 94, 0.5)',
                'shadow-indigo-500/50': '0 4px 6px -1px rgba(99, 102, 241, 0.5)',
                'shadow-sky-500/50': '0 4px 6px -1px rgba(14, 165, 233, 0.5)',
            },
            backgroundColor: theme => ({
                'bg-blue-500': theme('colors.blue.500'),
                'bg-red-500': theme('colors.red.500'),
                'bg-green-500': theme('colors.green.500'),
                'bg-violet-500': theme('colors.violet.500'),
                'bg-orange-500': theme('colors.orange.500')
            }),
            textColor: theme => ({
                'text-blue-500': theme('colors.blue.500'),
                'text-red-500': theme('colors.red.500'),
                'text-green-500': theme('colors.green.500'),
                'text-violet-500': theme('colors.violet.500'),
            }),
        },
    },
    safelist: [
        'inset-shadow-sm',
        {
            pattern: /inset-shadow-(red|blue|green|yellow|purple|pink|orange|teal|cyan|lime|amber|emerald|fuchsia|rose|sky|violet|gray|slate|zinc|neutral|stone|indigo)-(500)/
        },
        {
            pattern: /bg-(red|blue|green|yellow|purple|pink|orange|teal|cyan|lime|amber|emerald|fuchsia|rose|sky|violet|gray|slate|zinc|neutral|stone|indigo)-500/
        },
        {
            pattern: /shadow-(red|blue|green|yellow|purple|pink|orange|teal|cyan|lime|amber|emerald|fuchsia|rose|sky|violet|gray|slate|zinc|neutral|stone|indigo)-500\/50/,
        }
    ],
    plugins: [],
};