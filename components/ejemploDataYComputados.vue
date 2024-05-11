<template>
    <v-container>
        <v-card>
            <v-card-title>{{ nombreConPrefijo }}</v-card-title>
            <v-card-subtitle>{{ descripcion }}</v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script lang="ts">
export default {
  name: 'InstitucionCard',
  
  data: function () {
    return {
        name: "UNAM",
        descripcion: "Descripción"
    }
  },

  computed: {
    nombreConPrefijo: function () {
        return 'Universidad de Guadalajara: ' + this.name
    }
  }
}
</script>