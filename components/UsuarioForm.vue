<template>
  <v-container>
    <v-text-field v-model="usuario.correo" label="Correo"/>
    <v-text-field v-model="usuario.nombre" label="Nombre"/>
    <v-text-field v-show="editMode" v-model="usuario.password" type="password" label="Contraseña"/>
    <v-text-field v-show="editMode" v-model="passwordConfirm" type="password" label="Confirmar contraseña"/>
  </v-container>
</template>

<script lang="ts">
export default {
  name: "UsuarioForm",

  props: {
    value: {
      type: Object,
      required: true,
    },
    editMode: {
      type: Boolean,
      default: false
    },
    passwordConfirm: {
      type: String,
      default: false
    }
  },

  data() {
    return {
      usuario: this.value
    }
  }
}
</script>
