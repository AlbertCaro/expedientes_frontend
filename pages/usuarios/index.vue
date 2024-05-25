<template>
    <v-container>
        <v-col>
            <v-card>
                <v-card-title>
                    <v-spacer/>
                    <v-btn color="primary" @click="goToCreate">
                        <v-icon left>
                            mdi-plus
                        </v-icon>
                        Crear
                    </v-btn>
                    <v-btn color="green" @click="cargarLista" class="ml-2">
                        <v-icon left>
                            mdi-refresh
                        </v-icon>
                        Cargar
                    </v-btn>
                </v-card-title>
                <v-card-subtitle>
                    <v-data-table
                        :items="usuarios"
                        :headers="headers"
                        :loading="loading"
                    >
                        <template v-slot:item.actions={item}>
                            <v-icon color="primary" @click="$router.push(`/usuarios/${item.idUsuarios}`)">mdi-pencil</v-icon>
                            <v-icon color="red" @click="activarEliminar(item)">mdi-delete</v-icon>
                        </template>
                    </v-data-table>
                </v-card-subtitle>
            </v-card>
            <v-dialog
                v-model="mostrarDialogoEliminar"
                persistent
                max-width="500"
                >
                <v-card>
                    <v-card-title class="text-h5">
                        ¿Está seguro de continuar?
                    </v-card-title>
                    <v-card-text>Usted está a punto de eliminar el usuario, está acción es irreversible.</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        @click="mostrarDialogoEliminar = false"
                    >
                        Cerrar
                    </v-btn>
                    <v-btn
                        color="red"
                        text
                        @click="eliminarUsuario"
                    >
                        Eliminar
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
        </v-col>
    </v-container>
</template>

<script>
export default {
    name: "UsuariosIndex",

    data: () => ({
        usuarios: [],
        usuarioEliminar: null,
        mostrarDialogoEliminar: false,
        loading: false,
        headers: [
            {
               text: 'Correo electrónico',
               align: 'start',
               sortable: true,
               value: 'correo'
            },
            {
               text: 'Nombre',
               align: 'start',
               sortable: true,
               value: 'nombre'
            },
            {
               text: 'Acciones',
               align: 'center',
               sortable: false,
               value: 'actions'
            },
        ]
    }),

    async beforeMount() {
        this.$store.commit('setTitle',"Usuarios");
        await this.cargarLista()
    },

    methods: {
        goToCreate() {
            this.$router.push('/usuarios/create')
        },

        activarEliminar(usuario) {
            this.usuarioEliminar = usuario.idUsuarios
            this.mostrarDialogoEliminar = true
        },

        async eliminarUsuario () {
            try {
                const response = await this.$axios.delete(`/usuarios/${this.usuarioEliminar}`)

                this.mostrarDialogoEliminar = false
                this.cargarLista()
            } catch (error) {

            }
        },

        async cargarLista() {
            this.loading = true
            const response = await this.$axios.get('/usuarios')

            this.usuarios = response.data
            this.loading = false
        }
    },
}
</script>
