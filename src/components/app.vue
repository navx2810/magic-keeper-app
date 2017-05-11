<template lang="pug">
    #main
        #app.box
            navigation
            cards
            
        
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import cards from "./cards"
import navigation from "./navigation"
import EB from "@/eb"

@Component({
    name: "Application",
    props: [],
    components: { cards, navigation },
})
export default class extends Vue {


}
</script>