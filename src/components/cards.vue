<template lang="pug">
    .content
        template(v-if="!selected")
            searchFilter(:fltr="filter")
            list(:fltr="filter")
        viewer(v-else :card="selected")
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import searchFilter from "./filter"
import viewer from "./viewer"
import list from "./list"
import EB from "@/eb"
import Actions from "@/actions"

@Component({
    name: "Cards",
    props: [],
    components: { searchFilter, list, viewer },
})
export default class extends Vue {

    selected = null
    filter = "all"

    created() {
        EB.$on(Actions.select_card, card => this.selected = card)
        EB.$on(Actions.clear_selected, () => this.selected = null)
        EB.$on(Actions.change_filter, filter => this.filter = filter)
    }
}
</script>