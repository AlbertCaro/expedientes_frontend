<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-form :disabled="!editMode" @submit.prevent="(editMode) ? saveChanges() : editMode = true">
          <v-card>
            <v-card-title>Datos del usuario</v-card-title>
            <v-card-text>
              <v-progress-circular v-if="loading" indeterminate color="primary"/>
              <UsuarioForm v-else v-model="usuario" :edit-mode="editMode" :password-confirm="passwordConfirm" />
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary" type="submit">
                {{ (editMode) ? 'Guardar' : 'Editar' }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import error from "~/layouts/error.vue";

export default {
  data: () => ({
    usuario: {
      correo: '',
      nombre: ''
    },
    loading: true,
    passwordConfirm: '',
    editMode: false,
  }),

  async beforeMount() {
    await this.getUser()
  },

  methods: {
    async getUser() {
      this.loading = true
      try {
        const response = await this.$axios.get(`/usuarios/${this.$route.params.id}`)
        this.usuario = response.data
        this.usuario.password = ''
        this.loading = false
      } catch (e) {

      }
    },

    async saveChanges() {
      try {
        const response = await this.$axios.put(`/usuarios/${this.$route.params.id}`, this.usuario)
        this.$nuxt.$emit('show-snackbar', 'success', response.data.message)
        this.editMode = false
        await this.getUser()
      } catch (e) {
        this.$nuxt.$emit('show-snackbar', 'error', error.response.data.message)
      }
    }
  }
}
</script>
