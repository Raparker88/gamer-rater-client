import React, { useState } from "react"

export const ReviewContext = React.createContext()

export const ReviewProvider = (props) => {
    const [ reviews, setReviews ] = useState([])

    const getReviewsByGameId = (gameId) => {
        return fetch(`http://localhost:8000/reviews?game=${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
            .then(response => response.json())
            .then(setReviews)
    }

    const getReviewById = (id) => {
        return fetch(`http://localhost:8000/reviews/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
            .then(response => response.json())
    }
    

    const createReview = (review) => {
        return fetch("http://localhost:8000/reviews", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            },
            body: JSON.stringify(review)
        })
            
    }




    return (
        <ReviewContext.Provider value={{ 
            reviews, getReviewsByGameId, createReview, getReviewById }} >
            { props.children }
        </ReviewContext.Provider>
    )
}