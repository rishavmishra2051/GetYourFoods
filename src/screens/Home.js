import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
//import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
//import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch('https://getyourfoodbackend-r22s.onrender.com/api/auth/foodData', {
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
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div >
      <div>
        <Navbar />
      </div>
      
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 border-warning bg-dark text-warning" type="search" placeholder="Search in food..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-warning" onClick={() => { setSearch('') }}>Search</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(70%)" }} alt="..." />
            </div>
          </div>
        </div>
      </div>


      {/*Food items*/}
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
                        <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img}></Card>
                      </div>
                    )
                  }) : <div> No Such Data </div>}
              </div>
            )
          })
            : <div> No Such Data </div>}

      </div>
      <Footer />
    </div>
  )
}

//https://media.istockphoto.com/id/1060352206/photo/donate-food-to-hungry-people-concept-of-poverty-and-hunger.webp?b=1&s=170667a&w=0&k=20&c=IKmOkQWDIge3LugiqDcN6PCoy3QiB8wO1lNMCsf6RyI=