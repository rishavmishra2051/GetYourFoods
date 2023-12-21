import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Link } from "react-router-dom";
export default function Items() {
    const [foodCat, setFoodCat] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [search, setSearch] = useState('')
    /*const { state } = useLocation();
    const { cate } = state;*/
    const loadFoodItems = async () => {
        let response = await fetch("https://getyourfoodbackend-r22s.onrender.com/api/auth/foodData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json();
        //console.log(response[1][0].CategoryName);
        // console.log(response[1][1].CategoryName)
        setFoodItems(response[0])
        setFoodCat(response[1])
        //setCat(cate)
    }


    useEffect(() => {
        loadFoodItems()
    }, [])
    return (
        <>

            <div>
                <nav class="navbar navbar-light bg-light">
                    <div class="container">
                        <Link className="navbar-brand fs-1 fst-italic" to="/admin">GetYourFood</Link>
                        <form class="d-flex">
                            <input class="form-control me-2 border-warning" type="search" placeholder="Search Item" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button class="btn btn-outline-warning" onClick={() => { setSearch('') }}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>

            <div className='container'> {/* boootstrap is mobile first */}
                {
                    foodCat.length > 1 ? foodCat.map((data) => {
                        return (
                            // justify-content-center
                            <div className='row mb-3'>
                                <div key={data.id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr id="hr-warning" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(center,rgb(0, 255, 137),rgb(0, 0, 0))" }} />

                                {foodItems.length > 1 ? foodItems.filter(
                                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                                    .map(filterItems => {
                                        return (
                                            <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                                                {console.log(filterItems.url)}
                                                <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                                            </div>
                                        )
                                    }) : <div> No Such Data </div>}
                            </div>
                        )
                    })
                        : <div> No Such Data </div>}

            </div>
        </>
    )
}
