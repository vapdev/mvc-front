<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-layout class="rounded rounded-md">
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
            <v-btn icon="mdi-logout" color="red"></v-btn>
          </div>
        </template>
      </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
