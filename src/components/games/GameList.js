import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import "./Games.css"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
        <button 
                className="createGameButton"
                onClick={()=> {
                props.history.push("/createGame")
            }}>Create a Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game" onClick={()=> props.history.push(`/games/${game.id}`)}>
                        <div className="game__title">{game.title} by {game.designer}</div>
                        <div className="game__release">released: {game.year_released}</div>
                        <div className="game__description">{game.description}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">age recommendation: {game.age_recommendation}</div>
                        <div className="game_time">time to play: {game.time_to_play}</div>
                    </section>
                })
            }
        </article>
        </>
    )
}