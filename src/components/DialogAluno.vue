<script setup>
import { ref, watch, onMounted } from 'vue';

onMounted(() => {
    dialog.value = props.modelValue;
});

const addAluno = () => {
    if (valid.value) {
        const aluno = {
            nome: nome.value,
            matricula: matricula.value,
            email: email.value,
            nota: nota.value,
        };
        console.log(aluno);
        // closeDialog();
    } 
};

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    edit: Boolean,
});

const emit = defineEmits(['update:modelValue', 'close']);

const closeDialog = () => {
    emit('update:modelValue', false);
    emit('close')
    dialog.value = false;
};

const dialog = ref(false);

watch(dialog, (value) => {
    if (!value) {
        emit('update:modelValue', value);
        emit('close')
    }
});

const rules = ref([
    (v) => !!v || 'Campo obrigatório',
]);

const valid = ref(true);
const nome = ref('');
const matricula = ref('');
const email = ref('');
const nota = ref('');
</script>

<template>
    <v-dialog width="600" v-model="dialog">
        <v-card>
            <v-card-title>
                <div class="pa-4 pb-0"><span v-if="edit">Editar</span><span v-else>Adicionar</span> Aluno</div>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field :rules="rules" v-model="nome" label="Nome" hide-details="auto" required></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field :rules="rules" v-model="matricula" label="Matrícula" hide-details="auto" required></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field :rules="rules" v-model="email" label="E-mail" hide-details="auto" required></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field :rules="rules" v-model="nota" label="Nota" hide-details="auto" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="secondary" @click="closeDialog">Cancelar</v-btn>
                <v-btn color="primary" @click="addAluno">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>