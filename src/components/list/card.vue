<template lang="pug">
    .card(@click="SelectCard")
        .info( :class="RarityClass" )
            p.rarity {{card.rarity}}
            .fill
            .right(v-if="OwnsCard")
                p.foil {{card.foils}}
                p.normal {{card.normals}}
        .inner
            h2 {{card.name}}
            h3 {{card.setName}}
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import EB from "@/eb"
import Actions from "@/actions"

@Component({
    name: "Card",
    props: ["card"],
    components: {},
})
export default class extends Vue {

    SelectCard() { EB.$emit(Actions.select_card, this.card) }

	get OwnsCard() { return this.card.foils !== null }

    get RarityClass() {
        switch(this.card.rarity) {
            case "Uncommon": return "uncommon"
            case "Rare": return "rare"
            case "Mythic Rare": return "mythic"
            case "Special": return "special"
            default: return "common"
        }
    }
    
}
</script>

<style lang="stylus" scoped>
.normal
	cursor pointer
	padding 0 .25em
	background linear-gradient(-45deg, #444, #888)
	color white
.foil
	color white
	background linear-gradient(45deg, hsl(100 20 60), hsl(200 20 60), hsl(250 20 60), hsl(300 20 60), hsl(400 20 60) )
.common
	.fill
		border-top 4px solid #121212
	.rarity
		background #121212
		color #fff
.uncommon
	.fill
		border-top 4px solid silver
	.rarity
		background silver
.rare
	.fill
		border-top 4px solid gold
	.rarity
		background gold
.mythic
	.fill
		border-top 4px solid orange
	.rarity
		background orange
.special
	.fill
		// border-top 4px solid linear-gradient(45deg, hsl(100 20 60), hsl(200 20 60), hsl(250 20 60), hsl(300 20 60), hsl(400 20 60) )
		border-top 4px solid hsl(300 20 60)
	.rarity
		background linear-gradient(45deg, hsl(100 20 60), hsl(200 20 60), hsl(250 20 60), hsl(300 20 60) )
		color hsl(200 10 25)
</style>
