@startuml

title App Structure

object Bus {
    * change-route(route)
    * change-collection(collection)
    * select-card(card)
    * clear-selected
    * save-card(card)
    * change-search-term(term)
}

object App
object Navigation {
    * route-changed(route)
    + Route
}
object Router {
    - Route
}
object Options
object Cards {
    # Selected
}
object Filter {
    + Term
    + Filter
    * collection-changed(collection)
}
object List {
    + Collection
    * card-selected(card)
}
object Single {
    - Selected
    * selected-cleared
}
object Commit {
    * card-saved(card)
}

App --> Navigation
App --> Router
Router --> Cards
Router --> Options
Cards --> List
Cards --> Single

Single --> Commit
List --> Filter

@enduml
