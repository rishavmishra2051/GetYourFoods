import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import Modal from '../Modal';
import AddItem from './AddItem';
import AddCategory from './AddCategory';

export default function Admin() {
    const [additem, setAdditem] = useState(false)
    const [addcategory, setAddcategory] = useState(false)
    const loadItemModel = () => {
        setAdditem(true)
    }
    const loadCategoryModel = () => {
        setAddcategory(true)
    }
    let navigate = useNavigate();
    return (
        <>
            <div className='mb-5'>
                <AdminNavbar />
            </div>
            <div class="grid text-center">
                <div class="bg-info bg-opacity-10 border border-info rounded-end text-warning p-3 container"><b>Admin Section</b></div>
            </div>
            <div className="container overflow-hidden mt-5 mb-5">
                <div className="row gy-5">
                    <div className="col-6">
                        <button className='btn btn-outline-warning p-2 col-md-12' onClick={loadCategoryModel}>Add Category</button>
                        {addcategory ? <Modal onClose={() => setAddcategory(false)}><AddCategory/></Modal> : ""}
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-warning p-2 col-md-12' onClick={loadItemModel}>Add Item</button>
                        {additem ? <Modal onClose={() => setAdditem(false)}><AddItem/></Modal> : ""}
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-warning p-2 col-md-12' onClick={() => { navigate("/viewcategories") }}>View Category</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-warning p-2 col-md-12' onClick={() => { navigate("/items") }}>View Items</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-warning p-2 col-md-12' onClick={() => { navigate("/viewusers") }}>View Users</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-warning p-2 col-md-12' onClick={() => { navigate("/vieworders") }}>View Orders</button>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </>
    )
}
/*
<div className="col-6">
                        <button className='btn btn-outline-warning p-2 col-md-12' onClick={loadItemModel}>Add Item</button>
                        {additem ? <Modal onClose={() => setAdditem(false)}><AddItem/></Modal> : ""}
                    </div>
*/