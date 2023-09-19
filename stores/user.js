import { defineStore } from 'pinia';
import { getCurrentInstance } from 'vue';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    error: null,
  }),
  actions: {
    async printUser() {
      console.log("user =" + this.user)
    },
    setUser(newUser) {
      this.user = newUser
    },
    setError(error) {
      this.error = error
    },
    async deconnect () {
      localStorage.removeItem('jwt');
    },
    async loadUser (api) {
      const token = localStorage.getItem('xsrf_token');
      if (token){
        if (token) {
          const request = new Request(
            api + "/auth/me",
            {
              mode: "cors",
              headers: {
                'x-xsrf-token': token,
              },
              credentials: 'include',
            }
          );
          const response = await fetch(request)
          if (response.ok) {
            const data = await response.json();
            this.user = data;
            return {data};
          }
        }
      }
      else {
        return (0);
      }
    },
    async login (formData, api, check) {
      const request = new Request(
        api + "/auth/login",
        {
          method:  "POST",
          mode: "cors",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        }
      );
      const response = await fetch(request);
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        if (check)
          localStorage.setItem('xsrf_token', data.csrf_token);
        else
          sessionStorage.setItem('xsrf_token', data.csrf_token);
        this.user = data.user;
      } else {
        this.error = data.message[0].messages[0].message;
      }
    },
    async register (formData, api) {
      const router = useRouter();
      const request = new Request(
        api + "/auth/signup",
        {
          method:  "POST",
          mode: "cors",
          headers: {
            'credentials': 'include',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        }
      );
      const response = await fetch(request);
      const data = await response.json();
      console.log(res)
      if (response.ok) {
        localStorage.setItem('xsrf_token', data.csrf_token);
        this.user = data.user;
        router.push({ path: "/" });
      } else {
        document.getElementById('email_error').textContent = "L'email est dejà pris";
      }
    },
    async send_email_confirmation(email, api) {
      const request = new Request(
        api + "/auth/send-email-confirmation",
        {
          method: "POST",
          mode: "cors",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(email)
        }
      )
      const response = await fetch(request);
      if (!response.ok) {
        console.log("echec");
      }
    }
  },
})
