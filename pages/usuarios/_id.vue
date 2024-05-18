<template>
  <div>Página con ID: {{ id }}</div>
</template>

<script lang="ts">
export default {
  name: "UsuariosView",

  data: () => ({
    id: null
  }),

  beforeMount() {
    this.id = this.$route.params.id
  }
}
</script>
