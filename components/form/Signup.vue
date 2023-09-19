<template>
    <form @submit.prevent="verifPassword" method="POST" name="signUpForm">
        <div class="authform__part demi">
            <label>Nom</label>
            <input type="text" v-model="form.Name" placeholder="Nom" required aria-required="true" pattern="[A-Z,a-z,-]{1,}"/>
            <span class="error_message"></span>
        </div>
        <div class="authform__part demi">
            <label>Prénom</label>
            <input type="text" v-model="form.First_Name" placeholder="Prénom" required aria-required="true" pattern="[A-Z,a-z,-]{1,}" />
            <span class="error_message"></span>
        </div>
        <div class="authform__part__sex authform__part">
            <label class="authform__part_sex--label">Sexe</label>
            <div class="authform__radio">
                <input type="radio" v-model="form.Sex" value="Homme" required aria-required="true">
                <label for="Homme">Homme</label>
            </div>
            <div class="authform__radio">
                <input type="radio" v-model="form.Sex" value="Femme" required aria-required="true">
                <label for="Femme">Femme</label>
            </div>
        </div>
        <div class="authform__part">
            <label>Date de naissance</label>
            <input type="date" v-model="form.Birthdate" placeholder="Prénom" required aria-required="true"/>
            <span class="error_message"></span>
        </div>
        <div class="authform__part">
            <label>Adresse mail</label>
            <input type="email" v-model="form.email" placeholder="Email" required aria-required="true"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
            <span class="error_message" id="email_error"></span>
        </div>
        <div class="authform__part">
            <label>Mot de passe</label>
            <input type="password" v-model="form.password" placeholder="Mot de passe" required aria-required="true" pattern="(?=.*\d)(?=.*[!@#$&*])(?=.*[a-z])(?=.*[A-Z]).{6,}" />
            <span class="error_message"></span>
        </div>
        <div class="authform__part">
            <label>Confirmation du mot de passe</label>
            <input type="password" v-model="form.confirm" placeholder="Confirmation du mot de passe" required aria-required="true"/>
            <span class="error_message" id="error_password"></span>
        </div>
        <div class="authform__btn">
            <button class="authform__submit-btn" type="submit">Inscription</button>
            <NuxtLink to="/login" class="authform__link">Connexion</NuxtLink>
        </div>
    </form>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default defineComponent({
    data () {
        return {
            form: {
                username: "",
                email: "",
                password: "",
                confirm: "",
                Name: "",
                First_Name: "",
                Sex: "Homme",
                Birthdate: "",
            },
            error: {
                passwordNotDiff: false,
            },
        }
    },
    mounted () {
        this.validate();
    },
    methods: {
        async verifPassword () {
            if (this.form.confirm == this.form.password) {
                this.submitForm();
            } else {
                const passwordError = document.getElementById("error_password");
                if (this.form.confirm.length == 0) {
                    passwordError.textContent = "Veuillez renseigner le champ";
                } else {
                    passwordError.textContent = "Le mot de passe de confirmation est different du mot de passe";
                }
            }
        },
        async submitForm () {
            const runtimeConfig = useRuntimeConfig();
            const userStore = useUserStore();
            userStore.register({
                email: this.form.email,
                password: this.form.password,
                lastName: this.form.Name,
                firstName: this.form.First_Name,
                sex: this.form.Sex,
                birthdate: this.form.Birthdate,
            }, runtimeConfig.public.api);
        },
        async validate () {
            let formhtml = document.forms['signUpForm'];
            let formLength = formhtml.elements.length - 1;
            let errorMessage = [
                "Ce champ ne doit comporter que des lettres ou des tirets. Ex: Griezmann, Pogba...",
                "Ce champ ne doit comporter que des lettres ou des tirets. Ex: Eric, Adeline...",
                "",
                "",
                "Ce champ doit respecter le fomat suivant: JJ/MM/AAAA.",
                "Ce champ doit respecter le format des adresses mails. Ex: exemple@gmail.com...",
                "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et au moins 6 caractères."
            ];

            for(let i = 0; i < formLength; i++){
                let element = formhtml.elements[i];
                let missValue = element.parentNode.querySelector("span");
                element.onchange = function(e) {
                    if (i < 2 || i > 3)
                    {
                        e.preventDefault();
                        missValue.textContent = '';
                        if (!e.target.validity.valid) {
                            if (e.target.value.length == 0) {
                                missValue.textContent = "Veuillez renseigner le champ";
                            } else {
                                missValue.textContent = errorMessage[i];
                            }
                        }
                    }
                };
                element.oninvalid = function(e) {
                    e.preventDefault();
                    missValue.textContent = '';
                    if (!e.target.validity.valid) {
                        if (e.target.value.length == 0) {
                            missValue.textContent = "Veuillez renseigner le champ";
                        } else {
                            missValue.textContent = errorMessage[i];
                        }
                    }
                }
            }
        }
    }
})
</script>