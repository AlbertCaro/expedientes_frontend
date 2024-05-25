<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col>
                <v-form 
                    v-model="formularioValido"
                    ref="form"
                    :disabled="!modoEdicion" 
                    @submit.prevent="(modoEdicion) ? guardarCambios() : activarEdicion()"
                >
                    <v-card>
                        <v-card-title>Datos del usuario</v-card-title>
                        <v-card-text>
                            <v-alert
                                v-show="showPasswordError" 
                                type="error"
                            >Las contraseñas no coinciden</v-alert>
                            <v-progress-circular v-if="loading" color="primary" :size="70" :width="7" indeterminate/>
                            <UsuariosForm 
                                v-else
                                v-model="usuario"
                                :modoEdicion="modoEdicion"
                                :validarPassword="validarPassword"
                            >
                                Contenido dentro del slot default
                                <template #top="{ usuario }">
                                    {{ usuario.nombre }}
                                </template>
                            </UsuariosForm> 
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary" type="submit">
                                {{ (modoEdicion) ? "Guardar" : "Editar" }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import UsuariosForm from "@/components/UsuariosForm.vue"

export default {
    components: {
        UsuariosForm
    },

    head: {
        title: "Visualizar usuario"
    },

    async asyncData({ $axios, route }) {
        const id = route.params.id
        const response = await $axios.get(`/usuarios/${id}`)

        return {
            usuario: response.data
        }
    },

    data: () => ({
        loading: false,
        validarPassword: '',
        formularioValido: false,
        modoEdicion: false,
        showPasswordError: false
    }),

    methods: {
        activarEdicion() {
            this.$store.commit('cambiarTitulo', "Editar usuario")
            this.modoEdicion = true
        },

        async obtenerUsuario() {        
            this.$store.commit('cambiarTitulo', "Visualizar usuario")
            this.loading = true
            const id = this.$route.params.id

            try {
                const response = await this.$axios.get(`/usuarios/${id}`)

                this.usuario = response.data
                this.loading = false
            } catch (error) {
                
            }
        },

        
        async guardarCambios() {
            this.showPasswordError = false
            const id = this.$route.params.id

            this.$refs.form.validate()

            if (!this.formularioValido) {
                return;
            }

            // if (this.validarPassword !== this.usuario.password) {
            //    this.showPasswordError = true;
            //    return;
            // } 

            try {
                const response = await this.$axios.put(`/usuarios/${id}`, this.usuario)

                console.log(response)

                this.obtenerUsuario()
                this.modoEdicion = false
                this.validarPassword = ''
                this.$nuxt.$emit('show-snackbar', 'success', response.data.message)
            } catch (error) {
                this.$nuxt.$emit('show-snackbar', 'error', error.response.data.message)
            }
        },
    }
}
</script>