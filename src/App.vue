<script setup>
import { RouterView, useRoute } from 'vue-router'
import LoginView from './views/LoginView.vue'
let route = useRoute()

function logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.reload();
}
</script>

<template>
  <v-layout v-if="route.path !== '/login'" class="rounded rounded-md">
    <v-app-bar title="MVC Ambiente do Professor"></v-app-bar>

    <v-navigation-drawer
        permanent
      >
        <v-list nav>
          <v-list-item prepend-icon="mdi-account-group" title="Alunos" value="alunos"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="Professores" value="professores"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-4">
            <v-btn @click="logout" icon="mdi-logout" color="red"></v-btn>
          </div>
        </template>
      </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
  <LoginView v-else />
</template>
<style scoped></style>
