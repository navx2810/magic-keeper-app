<template lang="pug">
    .viewer
        .lower
            .level.center.pad
                .left
                    p Viewing <em>{{card.name}}</em>
                .right
                    a.close( @click="ClearCardSelection" ) X
            .tabs.full
                a.tab( @click="() => this.route = 'Picture'" :class="{ active: (route === 'Picture') }" ) Picture
                a.tab( @click="() => this.route = 'Info'" :class="{ active: (route === 'Info') }" ) Info
        .inner
            transition(name="fade" appear mode="out-in")
                img(v-if="route === 'Picture'" :src="imgSrc")
                template(v-if="route === 'Info'")
                    p.alert(v-if="!ownsCard") You do not own this card. Would you like to <a @click="AddCard" >add</a> it?
                    .info
                        .level.center
                            p.left Foil
                            input.right( v-model.number="foils" type="number")
                        .level.center
                            p.left Normal
                            input.right( v-model.number="normals" type="number")
                        .level
                            .right
                                a.green( @click="CommitChanges" ) Commit
            
        
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import EB from "@/eb"
import Actions from "@/actions"
import Repo from "@/repo"

@Component({
    name: "Viewer",
    props: ["card"],
    components: {},
})
export default class extends Vue {
    
    route = "Picture"

    normals = this.card.normals
    foils = this.card.foils

    get ownsCard() { return this.foils !== null || this.normals !== null }

    get imgSrc() { return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this.card.mid}&type=card` }

    ClearCardSelection() { EB.$emit(Actions.clear_selected) }
    AddCard() {
        Repo.AddCard(this.card)
        this.normals = 0
        this.foils = 0
    }

    CommitChanges() {
        this.card.normals = this.normals
        this.card.foils = this.foils
        Repo.UpdateCard(this.card)
    }
}
</script>

<style lang="stylus">
.close
    padding .5em
    font-size 1.2em
    color hsl(200 5 30)
.close:hover
    color hsl(200 5 60)
.level.center
    align-items center
</style>

<style lang="stylus" scoped>
.alert
    font-size 1.1em
    padding 1em
    text-align center
a
    margin 0
    padding 0
.pad
    padding 0 1em

.viewer
    flex 1 1 auto
    display flex
    flex-direction column
.inner
    flex 1 1 auto
    display flex
    justify-content center
    align-items center
    background hsl(100 5 82)
    flex-direction column

.fade-enter-active, .fade-leave-active
    transition all .25s ease

.fade-enter, .fade-leave-to
    opacity 0

img
    border-radius 20px
    border-horizontal-spacing 2px
    border-vertical-spacing 2px

.info
    margin 1em
    flex 1 1 auto
    display flex
    color hsl(100 5 50)
    flex-direction column
    justify-content center
    font-size 16pt
    p
        margin-right .25em

input
    border none
    background hsl(100 5 75)
    font-size 16pt
    text-align center

.green
    color hsl(100 50 50)
.green:hover
    color hsl(100 50 65)
</style>