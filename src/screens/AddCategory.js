import React, {useState} from 'react'

export default function AddCategory() {
  const [credentials, setCredentials] = useState({ CategoryName: "" })
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://getyourfoodbackend-r22s.onrender.com/api/auth/addcategory", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ CategoryName: credentials.CategoryName })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      //localStorage.setItem('token', json.authToken)
      alert("Category Added Successfully")
      
    }
    else {
      alert("Not Added")
    }
   }
  return (
    <>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border text-white border-warning rounded' style={{ backgroundColor: "#393836" }} onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Category Name</label>
            <input type="text" className="form-control" name='CategoryName' value={credentials.CategoryName} onChange={onChange} placeholder="Enter Category Name" />
          </div>
          <div className='text-center'>
            <button type="submit" className="m-3 btn btn-warning text-white">Add Category</button>
          </div>
        </form>
      </div>
    </>
  )
}
