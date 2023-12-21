import React from 'react'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import { Link,useLocation } from "react-router-dom"
import Footer from '../components/Footer'
export default function CategoryExplore() {
    const [foodCat, setFoodCat] = useState("")
    const [foodItems, setFoodItems] = useState("")
    const [search, setSearch] = useState('')
    // const searchParams = new URLSearchParams(window.location.search);
    // const name = searchParams.get('catdata');
    //const catdata = props.location.state;
    //let foodCategory = props.Category;
    const { state } = useLocation();
    const { category } = state;

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
        setFoodCat(category)
    }

    useEffect(() => {
        loadFoodItems()
    }, [])
    return (
        <>
            <div>  {/* justify-content-center, copy this <form> from navbar for search box */}
            <nav class="navbar navbar-light ">
                    <div class="container">
                        <Link className="navbar-brand fs-1 ms-2 text-warning" to="/">{foodCat}</Link>
                        <form class="d-flex">
                            <input class="form-control me-2 border-warning" type="search" placeholder="Search Items" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button class="btn btn-outline-warning" onClick={() => { setSearch('') }}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>


            {/* <div class="d-grid gap-2">
                <div className="btn bg-white text-warning mx-1 " to="/categoryexplore">{props.Category.CategoryName}</div>
            </div> */}
            <div className='container'> {/* boootstrap is mobile first */}
                
                <div className='row mb-3'>
                    {/*foodItems.length !== []*/}
                    {foodItems.length > 1 ? foodItems.filter(
                        (items) => (items.CategoryName === foodCat) && (items.name.toLowerCase().includes(search.toLowerCase())))
                        .map(filterItems => {
                            return (
                                <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                                    {console.log(filterItems.url)}
                                    <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                                </div>
                            )
                        }) : <div> No Such Data </div>}
                </div>

            </div>
            

        </>
    )
}
