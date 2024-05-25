<template>
    <v-container>
        <v-col>
            <v-alert
                v-show="showPasswordError" 
                type="error"
            >Las contraseñas no coinciden</v-alert>
            <v-form @submit.prevent="guardarUsuario">
                <v-card>
                    <v-card-subtitle>
                        <v-text-field 
                            v-model="usuario.correo" 
                            label="Correo electrónico"
                        />
                        <v-text-field 
                            v-model="usuario.nombre" 
                            label="Nombre"
                        />
                        <v-text-field 
                            v-model="usuario.password" 
                            type="password" 
                            label="Contraseña"
                        />
                        <v-text-field 
                            v-model="passwordConfirm" 
                            type="password" 
                            label="Confirmar contraseña"
                        />
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn type="submit" color="primary">
                            <v-icon left>mdi-floppy</v-icon>
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        usuario: {
            correo: '',
            nombre: '',
            password: ''
        },
        passwordConfirm: '',
        showPasswordError: false
    }),

    methods: {
        async guardarUsuario() {
            this.showPasswordError = false;

            if (this.passwordConfirm !== this.usuario.password) {
                this.showPasswordError = true;
                return;
            }

            try {
                const response = await this.$axios.post('/usuarios', this.usuario);

                this.$router.push('/usuarios')
            } catch (error) {
                
            }
        }
    }
}
</script>