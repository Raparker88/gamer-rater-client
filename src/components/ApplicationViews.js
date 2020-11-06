import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./games/GameProvider"
import { GameList } from "./games/GameList"
import { GameForm } from "./games/GameForm"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/" render={
                    props => <GameList {...props} />
                } />
                <Route exact path="/createGame" render={
                    props => <GameForm {...props} />
                } />
            </GameProvider>
        </main>
    </>
}