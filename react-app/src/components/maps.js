import './maps.css'

import React from 'react';
import { Link, useParams } from 'react-router-dom'

import leftArrow from "../assets/left-arrow.png"
import mapImage2 from "../assets/Map Image 2.png"

function searchDest() {

}

function Maps() {
    let { dest } = useParams();
    if (dest) {
        dest = dest.slice(1);
    }

    return (
        <div className='App'>
            <div className="background">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
            </div>

            <div id="container_map">
                <div>
                    <Link to='/' id="button_return">
                        <img src={leftArrow} alt="return" />
                    </Link>
                </div>
                <div id="map">
                    <img src={mapImage2} alt="map placeholder" />
                </div>
            </div>

            <br />

            <div>
                <div className="search" id="start">
                    <input type="text" placeholder="Lokasi Awal" />
                </div>
                <div className="search" id="finish">
                    <input type="text"
                        placeholder="Destinasi"
                        onChange={searchDest}
                        defaultValue={dest ? dest : ''}
                    />
                </div>
            </div>

            <br />
            <div>
                <div className="bus_details" id="est_time">
                    <div className="details_text">
                        <p><strong>Estimasi Kedatangan</strong></p>
                        <p>x min (Y km)</p>
                    </div>
                </div>
                <div className="bus_details" id="route_code">
                    <div className="details_text">
                        <p><strong>Kode Angkutan</strong></p>
                        <p>Caringin-Sadang Serang - 2341</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maps;