<template>
  <v-row justify="center" align="center">

    <v-col cols="12" sm="8" md="6">
      <v-form ref="formGuardado" 
        :isValid="false" 
        @submit.prevent="(modoEdicion) ? actualizarInstitucion() : guardarInstitucion()"
      >
          <v-text-field 
            v-model="institucionFormulario.nombre" 
            label="Titulo"
            :rules="[$validations.required]"
          />
          <v-text-field
            v-model="institucionFormulario.descripcion"
            label="Descripción"
            :rules="[$validations.required]"
          />
          <v-select
            v-model="institucionFormulario.tipo"
            label="Tipo"
            :items="tiposOpciones"
            :rules="[$validations.required]"
          />
          <v-row>
            <v-spacer/>
            <v-btn type="submit">Guardar</v-btn>
          </v-row>
      </v-form>

      <v-row>
        <InstitucionCard 
        v-for="(institucion, i) in instituciones" 
        v-bind="institucion"
        :index="i"
      />
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  name: 'IndexPage',

  data: function () {
    return {
      modoEdicion: false,
      institucionFormulario: {
        nombre: "",
        descripcion: "",
        tipo: ""
      },
      tiposOpciones: [
        "Universidad",
        "Preparatoria",
        "Primaria",
        "Secundaria"
      ],
      instituciones: [
        {
          nombre: "Cuvalles",
          descripcion: "Ameca",
          tipo: "Universidad"
        },
        {
          nombre: "CULagos",
          descripcion: "Ocotlán",
          tipo: "Preparatoria"
        },
        {
          nombre: "CUCEI",
          descripcion: "Guadalajara",
          tipo: "Primaria"
        },
      ],
    }
  },

  beforeMount() {
    this.$store.commit('cambiarTitulo', "Inicio")

    this.$nuxt.$on('eliminar-institucion', (index) => {
      this.instituciones.splice(index, 1)
    })

    
    this.$nuxt.$on('actualizar-institucion', (index) => {
      this.institucionFormulario = this.instituciones[index]
      this.modoEdicion = true
    })
  },

  methods: {
      guardarInstitucion(): void {
        const isValid = this.$refs.formGuardado.validate()

        if (!isValid) return

        const objetoAGuardar = Object.assign({}, this.institucionFormulario)

        this.instituciones.push(objetoAGuardar)

        this.$refs.formGuardado.reset()
      },

      actualizarInstitucion () {
        console.log('x')
        const isValid = this.$refs.formGuardado.validate()

        if (!isValid) return

        this.institucionFormulario = Object.assign({}, this.institucionFormulario)
        this.$refs.formGuardado.reset()
        this.modoEdicion = false
      }
  }
}
</script>

<i18n lang="json">
{
  "es" : {
    "welcome": "¡Bienvenido usuario!"
  },
  "en" : {
    "welcome": "Welcome user!"
  }
}
</i18n> 