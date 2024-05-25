<template>
    <v-container>
        <v-row justify="center">
            <v-col xs="12" sm="6" md="3">
                <v-form @submit.prevent="login">
                    <v-card>
                        <v-card-title>Iniciar sesión</v-card-title>
                        <v-card-subtitle>
                            <v-text-field v-model="loginData.correo" label="Correo" />
                            <v-text-field v-model="loginData.password" type="password" label="Contraseña" />
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn type="submit" color="primary">
                                Ingresar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {

    layout: 'login',

    data: () => ({
        loginData: {
            correo: 'admin@valles.udg.mx',
            password: 'hola123'
        }
    }),

    methods: {
        async login() {
            try {
                const response = await this.$auth.loginWith('local', {
                    data: this.loginData
                })

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>