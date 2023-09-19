<template>
    <div class="authform">
        <p>Un email de confirmation a été envoyé à votre adresse mail </p>
        <button @click="sendEmail">Renvoyer</button>
    </div>
</template>

<script>
import '@/assets/sass/main.scss';
import { useUserStore } from '@/stores/user';

export default  {
    layout: 'auth-layout',
    methods: {
        async sendEmail() {
            const userStore = useUserStore();
            const runtimeConfig = useRuntimeConfig();
            const route = useRoute();
            userStore.send_email_confirmation({ email: route.params.email }, runtimeConfig.public.api_strapi)
                .then(res => console.log('ok'))
        }
    },
};
</script> 