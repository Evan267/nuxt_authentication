<template>
    <div v-if="user">
      <h1>{{ user.username }}</h1>
      <button @click="deconnect">se deconnecter</button>
    </div>
    <div v-else>
        <NuxtLink to="/login">connexion</NuxtLink>
        <NuxtLink to="/signup">s'inscrire</NuxtLink>
    </div>
</template>
  
<script>
import { useUserStore } from '@/stores/user';

export default {
    props: {
      user: {
        type: Object,
      }
    },
    methods: {
        deconnect () {
            const userStore = useUserStore();
            userStore.deconnect();
            const router = useRouter();
            router.go();
        }
    }
  }
  </script>
  