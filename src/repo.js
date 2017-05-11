const request = require("superagent")

class Action {
    constructor(type, meta) {
        this.type = type
        this.meta = meta
    }
}

const Types = {
	Add: 0,
	Update: 1
}

const URL = (route) => `http://localhost:6598/api${route}`

export default new class {

	actionList = []

	AddCard(card) {
		this.actionList.push(new Action(Types.Add, card))
		// Model.cards.push(card)
		
		// For the time being, until the action list is implemented, the commands will execute automatically.
		request.post(URL("/cards/mine"))
			.send({ id: card.id })
			.end((err, r) => { console.log( (err) ? err: r.body ) })
	}

	UpdateCard(card) {
		this.actionList.push(new Action(Types.Add, card))
		// Model.cards = Model.cards.map( c => (c.id === card.id) ? card : c )

		// For the time being, until the action list is implemented, the commands will execute automatically.
		request.put(URL("/cards/mine"))
			.send({ id: card.id, foils: card.foils, normals: card.normals })
			.end((err, r) => { console.log( (err) ? err: r.body ) })
	}

	Find(location, name = "", limit = 20) {
		// return (location === "COLLECTIONS_VIEW") ? this.collections_stmt.all(`%${name}%`, limit) : this.cards_stmt.all(`%${name}%`, limit)
        return new Promise((res, rej) => { request.get(URL(`/cards/${location}`))
            .query({ name: name, limit: limit })
			.end(function(err, r) {
				// if(location === "mine") {
				// 	res(r.body.concat(Model.cards))
				// } else {
					res(r.body)
				// }
			})
		})
	}

	Save() {
		// Loop through the action list
		// Create a query for each action
		// Execute query
	}

	Close() { this.db.close() }
}