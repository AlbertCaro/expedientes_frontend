export default function (_: any, inject) {

    const validations = {
        required: (value: number | string) => !!value || 'Este campo es requerido.',
    }

    inject('validations', validations)
}