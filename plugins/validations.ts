export default function (_: any, inject) {

    const validations = {
        required: (value: number | string) => !!value || 'Este campo es requerido.',

        validEmail: (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Introduzca un correo válido"
    }

    inject('validations', validations)
}