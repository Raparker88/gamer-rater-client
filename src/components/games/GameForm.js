import React, { useContext, useState, useEffect } from "react"
import { CategoryBoxes } from "./Categories.js"
import { GameContext } from "./GameProvider.js"
import "./Games.css"


export const GameForm = props => {
    const { createGame, getCategories, categories } = useContext(GameContext)
    const [ selectedCategories, setCategories ] = useState([])

    const [currentGame, setCurrentGame] = useState({
        number_of_players: 0,
        title: "",
        designer: "",
        description: "",
        year_released: 0,
        number_of_players: 0,
        time_to_play: "",
        age_recommendation: ""
    })

    let numPlayers = []
    for (let i = 2; i <= 20; i++) {
        numPlayers.push(i)
    }

    let yearNow = new Date(Date.now()).getUTCFullYear()
    let dateArr = []
    for (let i = yearNow-1; i >= yearNow - 100; i--){
        dateArr.push(i)
    }

    useEffect(() => {
        getCategories()
    }, [])

    
    const handleControlledInputChange = (event) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="desinger">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="textarea" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <select name="number_of_players" className="form-control" id="gametype"
                        proptype="int"
                        value={currentGame.number_of_players}
                        onChange={handleControlledInputChange}>
                        <option value='1'>1</option>
                        {numPlayers.map(n => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year released: </label>
                    <select name="year_released" className="form-control" id="year_released"
                        proptype="int"
                        value={currentGame.year_released}
                        onChange={handleControlledInputChange}>
                        <option value={yearNow}>{yearNow}</option>
                        {dateArr.map(d => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time_to_play">Time to play: </label>
                    <input type="text" name="time_to_play" required autoFocus className="form-control"
                        value={currentGame.time_to_play}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_recommendation">Recommended ages: </label>
                    <input type="text" name="age_recommendation" required autoFocus className="form-control"
                        value={currentGame.age_recommendation}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <div className="category-container">
                {categories.map(c => <CategoryBoxes category={c} selectedCategories={selectedCategories} setCategories={setCategories}/>)}
            </div>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        designer: currentGame.designer,
                        title: currentGame.title,
                        description: currentGame.description,
                        year_released: parseInt(currentGame.year_released),
                        number_of_players: parseInt(currentGame.number_of_players),
                        time_to_play: currentGame.time_to_play,
                        age_recommendation: currentGame.age_recommendation,
                        selected_categories: selectedCategories
                    }

                    // Send POST request to your API
                    createGame(game)
            
                    .then(() => {
                        props.history.push("/")
                    })
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}