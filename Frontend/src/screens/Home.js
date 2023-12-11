import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'



export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    
    // require('dotenv').config()


    const loadData = async () => {
        let response = await fetch(`${process.env.REACT_APP_BACKENDURL}/api/foodData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json();
        // console.log(response[0],response[2])
        setFoodItem(response[0])
        setFoodCat(response[1])

    }


    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div></div><Navbar />







            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner" id='carousel' >
                        <div className="carousel-caption " style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/1000x450/?pasta" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/1000x450/?burger" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/1000x450/?pizza" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>






            </div>













            <div className='container'>

                {
                    typeof (foodCat) !== null
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-2' >
                                    {data.CategoryName}
                                </div>
                                <hr />

                                {typeof (foodItem) !== null
                                    ?
                                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 '>
                                                    <Card foodItems={filterItems}
                                                        options={filterItems.options[0]}
                                                    />


                                                </div>
                                            )
                                        }
                                        ) : <div>"No such data Found</div>
                                }
                            </div>
                            )
                        })
                        : ""
                }
            </div>
            <div> <Footer /></div>
        </>
    )
}
