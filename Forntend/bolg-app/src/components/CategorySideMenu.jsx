import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function CategorySideMenu() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        // Call loadAllCategories only once when the component mounts
        loadAllCategories()
            .then(data => {
                console.log("loading categories")
                console.log(data)
                setCategories([...data])
            })
            .catch(error => {
                console.log(error);
                toast.error("Error loading categories")
            });
    }, []); // Empty dependency array to ensure the effect runs only once after initial render

    return (
        <div>
            <ListGroup>
                <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
                    All Blogs
                </ListGroupItem>
            
                    {categories && categories.map((cat,index)=>{
                        return(
                            <ListGroupItem tag={Link} to={'/categories/'+cat.categoryid} className='border-0 shadow-0 mt-1' key={index} action={true}>
                                {cat.categoryTitle}
                            </ListGroupItem>
                        )
                    })}
               </ListGroup>
            {/* Render the categories fetched from the server */}
            
        </div>
    )
}

export default CategorySideMenu;
