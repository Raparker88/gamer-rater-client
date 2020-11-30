import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider.js"
import { ReviewForm } from "../reviews/ReviewForm"
import { ReviewList } from "../reviews/Reviews"
import "./Games.css"

export const GameDetails = (props) => {
    const { getGameById } = useContext(GameContext)

    const [game, setGame] = useState({})
    const [isHidden, setIsHidden] = useState(true)

    useEffect(() => {
        const gameId = parseInt(props.match.params.gameId)
        getGameById(gameId)
            .then(setGame)
    }, [])

    return (
        <>
            <section key={`game--${game.id}`} className="game">
                <div className="game__title">{game.title} by {game.designer}</div>
                <div className="game__release">released: {game.year_released}</div>
                <div className="game__description">{game.description}</div>
                <div className="game__players">{game.number_of_players} players needed</div>
                <div className="game__skillLevel">age recommendation: {game.age_recommendation}</div>
                <div className="game_time">time to play: {game.time_to_play}</div>
            </section>

            <button
                className="reviewGame"
                onClick={() => {
                    setIsHidden(!isHidden)
                }}>Review This Game</button>
            <ReviewForm
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                gameId={props.match.params.gameId}
                {...props} />
            <ReviewList
                gameId={props.match.params.gameId}
            />

        </>
    )
}