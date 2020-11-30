import React, { useContext, useState } from "react"
import { ReviewContext } from "./ReviewProvider"
import "./Review.css"



export const ReviewForm = ({isHidden, setIsHidden, gameId}) => {
    const { createReview, getReviewsByGameId } = useContext(ReviewContext)
    const [currentReview, setReview] = useState("")
    
    const handleControlledInputChange = (event) => {
        setReview(event.target.value)
    }

    return (
    <>
        <form className={isHidden? "hide" : "show"}>
            <h2 className="gameForm__title">Add Your Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review: </label>
                    <input type="textarea" name="review" required autoFocus className="form-control"
                        value={currentReview}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset> 
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const review = {
                        review: currentReview,
                        game_id: parseInt(gameId)
                    }

                    // Send POST request to your API
                    createReview(review)
                    .then(() => {
                        getReviewsByGameId(gameId)
                    })
            
                    .then(() => {
                        setIsHidden(!isHidden)
                    })
                }}
                className="btn btn-primary">Create</button> 
        </form>
    
    
    </>
    )
}