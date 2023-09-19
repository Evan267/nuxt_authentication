<template>
    <form @submit.prevent="submitForm" method="POST">
        <div class="authform__error cache" id="error_mess">Votre email ou votre mot de passe est invalide</div>
        <div class="authform__part">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" @input="changeEmail" required aria-required="true"/>
        </div>
        <div class="authform__part">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" @input="changePassword" required aria-required="true"/>
        </div>
        <div class="authform__last">
            <div>
                <label>
                    <input type="checkbox" ref="checkbox" v-model="check" value="true"/>Se souvenir de moi
                </label>
            </div>
            <NuxtLink to="/">Mot de passe oublié</NuxtLink>
        </div>
        <div class="authform__btn">
            <button :disabled="!password || !email" class="authform__submit-btn" type="submit">se connecter</button>
            <NuxtLink to="/signup" class="authform__link">S'incrire</NuxtLink>
        </div>
    </form>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default defineComponent ({
    setup () {
        const runtimeConfig = useRuntimeConfig();
        const userStore = useUserStore();
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const check = ref(true);

        const checkboxValue = () => {
            return check.value;
        }

        const showError = () => {
            password.value = "";
            const input_email = document.getElementById("email");
            const input_password = document.getElementById("password");
            const error_message = document.getElementById('error_mess');
            input_email.classList.add('error');
            input_password.classList.add('error');
            error_message.classList.toggle('cache');
        }

        const submitForm = () => {
            userStore.login({ email: email.value, password: password.value }, runtimeConfig.public.api, checkboxValue())
                .then(r => {
                    router.push('/');
                })
                .catch(e => {
                    showError();
                })
        };

        const changeEmail = () => {
            const input_email = document.getElementById("email");
            input_email.classList.remove("error");
        }

        const changePassword = () => {
            const input_password = document.getElementById("password");
            input_password.classList.remove("error");
        }

        return { email, password, check, submitForm, changeEmail, changePassword }
    },
})
</script>