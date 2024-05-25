interface EstadoGlobal {
    titulo: string
}

export const state = (): EstadoGlobal => ({
    titulo: 'Expedientes'
})

export const mutations = {
    cambiarTitulo(state: EstadoGlobal, titulo: string) {
        state.titulo = titulo
    }
}