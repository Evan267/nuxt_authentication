<template>
    <div class="authform">
        <h1>Inscription</h1>
        <FormSignup></FormSignup>
    </div>
</template>

<script setup>
import '@/assets/sass/main.scss';

definePageMeta({
    head: {
      script: [
        {
          src: 'https://www.google.com/recaptcha/api.js',
          async: true,
          defer: true
        }
      ]
    },
    layout: 'auth-layout',
});
</script>