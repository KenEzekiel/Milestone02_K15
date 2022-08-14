import './maps.css'
import { Link, useParams } from 'react-router-dom'

import leftArrow from "../assets/left-arrow.png"
import mapImage2 from "../assets/Map Image 2.png"

function Maps() {
    let { dest } = useParams();
    if (dest) {
        dest = dest.slice(1);
    }

    return (
        <div className='App'>
            <div class="background">
                <div class="circle1"></div>  
                <div class="circle2"></div> 
                <div class="circle3"></div> 
                <div class="circle4"></div> 
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
                <div class="search" id="start">
                    <input type="text" placeholder="Lokasi Awal" />
                </div>
                <div class="search" id="finish">
                    <input type="text" 
                        placeholder="Destinasi" 
                        value={dest ? dest : ''}
                    />
                </div>
            </div>

            <br />
            <div>
                <div class="bus_details" id="est_time">
                    <div class="details_text">
                        <p><strong>Estimasi Kedatangan</strong></p>
                        <p>x min (Y km)</p>
                    </div>
                </div>
                <div class="bus_details" id="route_code">
                    <div class="details_text">
                        <p><strong>Kode Angkutan</strong></p>
                        <p>Caringin-Sadang Serang - 2341</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maps;