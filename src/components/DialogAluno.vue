<script setup>
import { ref, watch, onMounted } from 'vue';
import http from '@/services/http.js';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    id: {
        type: Number,
        default: null,
    },
});

const emit = defineEmits(['update:modelValue', 'close', 'getAlunos']);

onMounted(() => {
    if (props.id) {
        getAluno();
    }
    dialog.value = props.modelValue;
});

const addEditAluno = async () => {
    if (valid.value) {
        if (props.id) {
            await http.put(`alunos/${props.id}`, aluno.value)
                .then((response) => {
                    if (response.status === 200) {
                        emit('getAlunos');
                        closeDialog();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            return;
        } else {
            const { data } = await http.post('alunos', aluno.value)
                .then((response) => {
                    if (response.status === 201) {
                        emit('getAlunos');
                        closeDialog();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};

const getAluno = async () => {
    const { data } = await http.get(`alunos/${props.id}`);
    aluno.value = data;
};

const dialog = ref(false);
const closeDialog = () => {
    emit('update:modelValue', false);
    emit('close')
    dialog.value = false;
};

const aluno = ref({
    nome: '',
    matricula: '',
    email: '',
    nota: '',
});
const valid = ref(true);
const rules = ref([
    (v) => !!v || 'Campo obrigatório',
]);

watch(dialog, (value) => {
    if (!value) {
        emit('update:modelValue', value);
        emit('close')
    }
});
</script>

<template>
    <v-dialog width="600" v-model="dialog">
        <v-card>
            <v-card-title>
                <div class="pa-4 pb-0"><span v-if="id">Editar</span><span v-else>Adicionar</span> Aluno</div>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field :rules="rules" v-model="aluno.nome" label="Nome" hide-details="auto"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field :rules="rules" v-model="aluno.matricula" label="Matrícula" hide-details="auto"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field :rules="rules" v-model="aluno.email" label="E-mail" hide-details="auto"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field :rules="rules" v-model="aluno.nota" label="Nota" hide-details="auto"
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="secondary" @click="closeDialog">Cancelar</v-btn>
                <v-btn color="primary" @click="addEditAluno">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>