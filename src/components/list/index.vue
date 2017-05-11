<template lang="pug">
    .cards
        transition-group( name="list" mode="in-out" )
            card( :key="card.id" v-for="card in collection" :card="card")  
        
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

import card from "./card"
import EB from "@/eb"
import Repo from "@/repo"
import Actions from "@/actions"

@Component({
    name: "List",
    props: ["fltr"],
    components: { card },
})
export default class extends Vue {
    
    collection = []
    filter = this.fltr
    term = ""

    get mine() { return this.collection.filter( card => (card.foil != null || card.normal != null) ) }

    get shown_collection() { return (this.filter === 'all') ? this.collection : this.mine }

    created() {
        EB.$on(Actions.change_search_term, term => {
            this.term = term
            Repo.Find(this.filter, term, 20).then(cards => EB.$emit(Actions.change_collection, cards))
        })
        EB.$on(Actions.change_collection, col => this.collection = col)
        EB.$on(Actions.change_filter, filter => {
            this.filter = filter
            Repo.Find(filter, this.term, 20).then(cards => EB.$emit(Actions.change_collection, cards))
        })
        Repo.Find(this.filter, "", 20).then(cards => EB.$emit(Actions.change_collection, cards))
    }

}
</script>

<style lang="stylus" scoped>
.list-enter-active, .list-leave-active
    display absolute
    transition: all .2s;

.list-enter, .list-leave-to
    opacity: 0

.list-enter
    transform: translateX(-15px)
.list-leave-to
    transform: translateX(15px)
    
    
.list-move
    transition: transform .2s;

</style>