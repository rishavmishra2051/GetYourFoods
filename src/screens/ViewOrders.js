import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ViewOrders() {
    const [orders, setOrders] = useState({})
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const loadOrders = async () => {
        let response = await fetch("https://getyourfoodbackend-r22s.onrender.com/api/auth/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setOrders(response[3]);

        })
    }
    useEffect(() => {
        loadOrders()      
    }, [])
    return (
        <>
            <div>
                <nav class="navbar navbar-light bg-light">
                    <div class="container">
                        <Link className="navbar-brand fs-1 fst-italic" to="/admin">GetYourFood</Link>
                        <form class="d-flex">
                            <input class="form-control me-2 border-warning" type="search" placeholder="Search Order" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button class="btn btn-outline-warning" onClick={() => { setSearch('') }}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>
            <div className='container-fluid m-auto mt-2 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-warning fs-4'>
                        <tr className='bg-white'>
                            <th scope='col' >Order ID</th>
                            <th scope='col' >Customer Email</th>
                            <th scope='col' >Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 1 ? orders.filter(
                            (data) => (data.email.toLowerCase().includes(search.toLowerCase())))
                            .map((order) => {

                                return (
                                    <tr>
                                        <Link className='text-warning' to="/fetchorders" state={{ userEmail: order.email }}><th scope='row' >{order._id}</th></Link>
                                        <td >{order.email}</td>
                                        
                                    </tr>
                                )
                            })
                            : "No Order Found"}
                    </tbody>
                </table>
            </div>
            
        </>
    )
}
