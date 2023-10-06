<script setup>
import { ref } from 'vue';
import DialogAluno from '@/components/DialogAluno.vue';
const headers = [
  { title: 'Nome', align: 'start', key: 'nome' },
  { title: 'Matricula', align: 'start', key: 'matricula' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Nota', align: 'start', key: 'nota' },
  { title: 'Ações', align: 'end', key: 'acoes' },
];
const alunos = [
  {
    nome: 'Joao Bezerra',
    matricula: '2019000001',
    email: 'email@email.com',
    nota: 10,
    acoes: 'Ações',
  },
];
const itemsPerPage = ref(10);
const dialogAluno = ref(false);
const editAluno = ref(false);

const abrirDialogEdicaoAluno = (aluno) => {
  editAluno.value = true;
  dialogAluno.value = true;
};

</script>

<template>
  <main class="pa-4">
    <div class="d-flex">
      <h2 class="pa-2">Alunos</h2>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="dialogAluno = true">
          Adicionar Aluno
      </v-btn>
      <DialogAluno @close="editAluno = false" v-if="dialogAluno" :edit="editAluno" v-model="dialogAluno"></DialogAluno>
    </div>
    <v-data-table 
      v-model:items-per-page="itemsPerPage" 
      :headers="headers" 
      :items="alunos" 
      item-value="name"
      class="elevation-1">
      <template v-slot:item.acoes="{ item }">
        <v-btn icon="mdi-pencil" @click="abrirDialogEdicaoAluno(item)"></v-btn>
      </template>
    </v-data-table>
  </main>
</template>
