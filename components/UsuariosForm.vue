<template>
    <v-container>
        <slot name="top" :usuario="usuario" ></slot>
        <v-text-field 
            v-model="usuario.correo" 
            label="Correo electrónico"
            :rules="[$validations.required, $validations.validEmail]"
        />
        <v-text-field 
            v-model="usuario.nombre" 
            label="Nombre"
            :rules="[$validations.required]"
        />
        <v-text-field 
            v-show="modoEdicion"
            v-model="usuario.password" 
            type="password"
            label="Contraseña"
            :rules="[$validations.required]"
        />
        <v-text-field 
            v-show="modoEdicion" 
            v-model="vPassword"
            type="password"
            label="Validar Contraseña"
            :rules="[$validations.required]" 
        />
        
        <slot />
    </v-container>
</template>

<script>
export default {
    name: 'UsuariosForm',

    props: {
        value: {
            type: Object,
            required: true,
        },
        modoEdicion: {
            type: Boolean,
            default: false,
        },
        validarPassword: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            usuario: this.value,
            vPassword: this.validarPassword
        }
    },

    beforeMount() {
        this.usuario = this.value 
    }
}
</script>