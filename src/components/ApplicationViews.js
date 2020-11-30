import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./games/GameProvider"
import { GameList } from "./games/GameList"
import { GameForm } from "./games/GameForm"
import { GameDetails } from "./games/GameDetail"
import { ReviewProvider } from "./reviews/ReviewProvider"


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
            <GameProvider>
                <ReviewProvider>
                    <Route path="/games/:gameId(\d+)" render={
                        props => <GameDetails {...props}/> 
                    }/>

                </ReviewProvider>
            </GameProvider>
    
        </main>
    </>
}