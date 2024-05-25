<template>
    <div>Usuario id: {{ id }} view</div>
</template>

<script>
export default {
    data: () => ({
        id: null,
    }),

    beforeMount() {
        this.id = this.$route.params.id
    }
}
</script>