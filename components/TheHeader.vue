<template>
    <header class="header">
        <NuxtLink to="/"><img class="header__logo" src="../assets/logo/logo.png" /></NuxtLink>
        <nav>
          <input type="text" name="recherche" id="">
          <NuxtLink to="/Femme">Homme</NuxtLink>
          <NuxtLink to="/Homme">Femme</NuxtLink>
        </nav>
        <div>
          <ClientOnly>
            <button><font-awesome-icon icon="fa-cart-shopping"/></button>
            <button @click="showUser"><font-awesome-icon icon="fa-user" /></button>
            <UserCard v-if="showPopup" :user="user"/>
          </ClientOnly>
        </div>
    </header>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default defineComponent ({
  data() {
    return {
      user: null,
      showPopup: false,
    };
  },
  methods: {
    showUser () {
      const runtimeConfig = useRuntimeConfig();
      const userStore = useUserStore();
      if (!this.user && !userStore.user) {
        userStore.loadUser(runtimeConfig.public.api).then(response => {
          if (response) {
            this.user = response.data;
            this.userLoad = true;
          }
        })
        .catch(err => {
          console.log("error");
        });
      }
      else if (userStore.user) {
        this.user = userStore.user;
      }
      this.showPopup = !this.showPopup;
    }
  }
})
</script>
