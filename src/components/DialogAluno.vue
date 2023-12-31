<script setup>
import { ref, watch, onMounted } from 'vue';
import http from '@/services/http.js';
import { toast } from 'vue3-toastify';

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

const loading = ref(true);
const httpLoading = ref(false);

onMounted(async () => {
    dialog.value = props.modelValue;
    if (props.id) {
        await getAluno();
    }
    loading.value = false;
});

const addEditAluno = async () => {
    if (valid.value) {
        httpLoading.value = true;
        if (props.id) {
            await http.put(`alunos/${props.id}`, aluno.value)
                .then((response) => {
                    if (response.status === 200) {
                        emit('getAlunos');
                        toast.success('Aluno editado com sucesso')
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
                        toast.success('Aluno adicionado com sucesso')
                        closeDialog();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        httpLoading.value = false;
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

const rulesNome = ref([
    (v) => !!v || 'Campo obrigatório',
]);
const rulesMatricula = ref([
    (v) => !!v || 'Campo obrigatório',
    (v) => /^\d+$/.test(v) || 'A matrícula deve conter apenas números',
]);

const rulesEmail = ref([
    (v) => !!v || 'Campo obrigatório',
    (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
]);

const rulesNota = ref([
    (v) => !!v || 'Campo obrigatório',
    (v) => v >= 0 && v <= 10 || 'A nota deve ser entre 0 e 10',
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
                <v-skeleton-loader v-if="loading" type="article"></v-skeleton-loader>
                <v-form v-else v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field :rules="rulesNome" v-model="aluno.nome" label="Nome" hide-details="auto"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field :rules="rulesMatricula" v-model="aluno.matricula" label="Matrícula" hide-details="auto"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field :rules="rulesEmail" v-model="aluno.email" label="E-mail" hide-details="auto"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field :rules="rulesNota" v-model="aluno.nota" label="Nota" hide-details="auto"
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
            <v-progress-linear v-if="httpLoading" indeterminate color="secondary"></v-progress-linear>
        </v-card>
    </v-dialog>
</template>