import React, { useContext, useEffect } from "react"
import { ReviewContext } from "./ReviewProvider.js"
import "./Review.css"

export const ReviewList = ({gameId}) => {
    const { reviews, getReviewsByGameId } = useContext(ReviewContext)

    useEffect(() => {
        getReviewsByGameId(gameId)
    }, [gameId])

    return (
        <>
        <h2>Reviews</h2>
        <section className="reviews">
            {
                reviews.map(review => {
                    return <section key={`review--${review.id}`} className="review-container">
                        <h4 className="reviewer-name">{review.player && review.player.user.username}</h4>
                        <div className="review-text">{review.review}</div>
                        
                    </section>
                })
            }
        </section>
        </>
    )
}