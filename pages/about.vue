<template>
    <div>
        <h1>Alberto Caro: {{ counter }}</h1>

        <p>{{ counter }}</p>

        <v-btn @click="sumOne">Sumar 1</v-btn>
    </div>
</template>

<script>
export default {
    name: "About",

    data() {
        return {
            counter: 0
        }
    },

    methods: {
        
        sumOne() {
            this.counter++
        },
    },

    created() {
        console.log("created")
    },

    beforeMount() {
        console.log("beforeMount")
    },


    beforeUnmount() {
        console.log("beforeUnmount")
    },

}
</script>