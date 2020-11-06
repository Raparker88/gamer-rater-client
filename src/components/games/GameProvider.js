import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ categories, setCategories ] = useState([])

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }



    return (
        <GameContext.Provider value={{ 
            games, getGames, createGame, getCategories, categories }} >
            { props.children }
        </GameContext.Provider>
    )
}