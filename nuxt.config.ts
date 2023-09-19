import sass from 'sass';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
    app: {
        head: {
            title: 'site test',
            meta: [
              { name: 'description', content: 'site test Connexion/inscription' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
    modules: [
        '@nuxtjs/strapi',
        '@pinia/nuxt',
    ],
    build: {
        loaders: {
            scss: {
                implementation: sass,
                additionalData: '@import "@/assets/sass/variables.scss";',
              },
        },
    },
    plugins: [
        { src: '~/plugins/pinia.js', mode: 'client' },
      ],
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        '@/assets/sass/main.scss',
        '@/assets/fonts/Arimo/Arimo-VariableFont_wght.ttf',
        '@/assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf'
    ],
    runtimeConfig: {
        //Les clés privées sont disponible uniquement coté serveur
        public: {
            api: process.env.API_BASE_URL,
            //Les clés publics sont disponible également coté client
            recaptcha_site_key: process.env.RECAPTCHA_SITE_KEY
        }
    }
})
