import Vue from "vue"
import Style from "../main.stylus"

import app from "./components/app"

new Vue({
    el: "#app",
    render: h => h(app)

})