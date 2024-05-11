<template>
    <v-container>
        <v-card>
            <v-card-title>{{ nombre }}</v-card-title>
            <v-card-subtitle>{{ descripcion }}</v-card-subtitle>
            <v-card-text>
                <p v-if="tipo === 'Universidad'">👨‍🎓</p>
                <p v-else-if="tipo === 'Preparatoria'" >🏫</p>
                <p v-else>🎒</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" @click="actualizarInstitucion">Modificar</v-btn>
                <v-btn color="error" @click="eliminarInstitucion">
                    Eliminar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
export default {
  name: 'InstitucionCard',

  props: {
    nombre: {
        type: String,
        required: true,
        default: 'Aquí debería ir el título'
    }, 

    descripcion: {
        type: String,
        default: "Aquí debería ir la descripción"
    },

    tipo: {
        type: String,
        required: true,
    },

    index: {
        type: Number,
        required: true,
    }
  },

  computed: {
    esUniversidad: function () {
        return this.tipo === "Universidad"
    }
  },

  methods: {
    mostrarNombre() {
        alert(this.nombre)
    },

    eliminarInstitucion () {
        this.$nuxt.$emit('eliminar-institucion', this.index)
    },

    actualizarInstitucion () {
        this.$nuxt.$emit('actualizar-institucion', this.index)
    }
  }
}
</script>