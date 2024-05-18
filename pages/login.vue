<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-form @submit.prevent="login">
          <v-card>
            <v-card-title>Iniciar sesión</v-card-title>
            <v-card-subtitle>
              <v-text-field v-model="loginData.correo" label="Usuario"/>
              <v-text-field v-model="loginData.password" type="password" label="Contraseña"/>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer/>
              <v-btn type="submit">Iniciar sesión</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  auth: false,

  layout: 'login',

  data: () => ({
    loginData: {
      correo: "",
      password: ""
    }
  }),

  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.loginData
        })

        await this.$router.push('/')
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
