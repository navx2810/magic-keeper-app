<template lang="pug">
    .search-info
        .search.level
            input( v-model="term" placeholder="Search Card Name")
        .lower
            .level
                p.center Filter by..
            .tabs.full
                a.tab(@click="ChangeFilter('all')" :class="{ active: (filter === 'all') }") All Cards
                a.tab(@click="ChangeFilter('mine')" :class="{ active: (filter === 'mine') }") My Cards
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import EB from "@/eb"
import actions from "@/actions"

@Component({
    name: "SearchFilter",
    props: ["fltr"],
    components: {},
    watch: {
        term: function(newTerm) {
            EB.$emit(actions.change_search_term, newTerm)
        }
    }
})
export default class extends Vue {

    term = ""
    filter = this.fltr

    ChangeFilter(filter) {
        this.filter = filter
        EB.$emit(actions.change_filter, filter)
    }
    
}
</script>