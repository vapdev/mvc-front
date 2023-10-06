<script setup>
import { ref } from 'vue';
import http from '@/services/http.js';
import {useAuth} from '@/stores/auth.js';
import {useRouter} from 'vue-router';
import {toast} from 'vue3-toastify';

const router = useRouter();

const auth = useAuth();

const loading = ref(false);

async function login(){
  try {
    loading.value = true;
    const {data} = await http.post('/login', user.value);
    auth.setToken(data.access_token);
    auth.setUser(data.user);
    router.push('/');
  } catch (error) {
    toast.error('Usuário ou senha inválidos');
    loading.value = false;;
  }
}

const user = ref({
    email: '',
    password: '',
});

const rulesEmail = ref([
    (v) => !!v || 'Campo obrigatório',
    (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
]);

const rulesSenha = ref([
    (v) => !!v || 'Campo obrigatório',
    (v) => v.length >= 6 || 'A senha deve ter no mínimo 6 caracteres',
]);

const valid = ref(true);
</script>

<template>
  <main class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card style="width: 20vw;">
      <v-card-title class="text-center">
        <div class="pt-2">Login do professor</div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field :rules="rulesEmail" v-model="user.email" label="E-mail" hide-details="auto" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field type="password" :rules="rulesSenha" v-model="user.password" label="Senha" hide-details="auto"
                  required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" @click="login">Entrar</v-btn>
      </v-card-actions>
      <v-progress-linear v-if="loading" indeterminate color="secondary"></v-progress-linear>
    </v-card>
  </main>
</template>

<style></style>
