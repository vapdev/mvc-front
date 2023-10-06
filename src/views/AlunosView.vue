<script setup>
import { ref, onMounted } from 'vue';
import DialogAluno from '@/components/DialogAluno.vue';
import http from '@/services/http.js';

onMounted(() => {
  getAlunos();
});

const headers = [
  { title: 'Nome', align: 'start', key: 'nome' },
  { title: 'Matricula', align: 'start', key: 'matricula' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Nota', align: 'start', key: 'nota' },
  { title: 'Ações', align: 'end', key: 'acoes' },
];

const itemsPerPage = ref(10);
const search = ref('');
const dialogAluno = ref(false);
const alunos = ref([]);
let idAluno = null;

const getAlunos = async () => {
  const { data } = await http.get('alunos');
  alunos.value = data;
};

const abrirDialogEdicaoAluno = async (aluno) => {
  idAluno = aluno.selectable.id;
  dialogAluno.value = true;
};
</script>

<template>
  <main class="pa-4">
    <div class="d-flex">
      <h2 class="pa-2">Alunos</h2>
      <v-text-field class="ml-4 pb-2" v-model="search" append-icon="mdi-magnify" label="Pesquisar aluno" density="compact"
        single-line hide-details></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="dialogAluno = true">
        Adicionar Aluno
      </v-btn>
      <DialogAluno @getAlunos="getAlunos" @close="idAluno = null" v-if="dialogAluno" :id="idAluno" v-model="dialogAluno">
      </DialogAluno>
    </div>
    <v-data-table v-model:items-per-page="itemsPerPage" :search="search" :headers="headers" :items="alunos"
      item-value="name" class="elevation-1">
      <template v-slot:item.acoes="{ item }">
        <v-btn icon="mdi-pencil" @click="abrirDialogEdicaoAluno(item)"></v-btn>
      </template>
    </v-data-table>
  </main>
</template>
