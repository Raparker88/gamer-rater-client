import React, { useState } from "react"

export const CategoryBoxes = (props) => {
    const [checked, setChecked] = useState(false)
    
    const category = props.category
    const selectedCategories = props.selectedCategories
   

    const checkboxHandler = () => {
        if (checked) {
            let newArray = selectedCategories.filter(c => category.id !== c.id)
            props.setCategories(newArray)
        }else{
            let newArray = selectedCategories
            newArray.push(category)
            props.setCategories(newArray)
        }
        setChecked(!checked)
    }

    return (
        <div className="category-container">
            <label>
                <input type="checkbox" id="category" checked={checked} onChange={checkboxHandler}></input>
                {category.label}
            </label>
        </div>
    )
}