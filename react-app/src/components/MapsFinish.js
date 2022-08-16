import "./maps.css"

import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"

import leftArrow from "../assets/left-arrow.png"
import mapImage2 from "../assets/Map Image 2.png"

import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const API_KEY = "GW4pu0GIxAKW4aUktkhMmIfLblBEESWI";

function MapsFinish() {
    let { dest, lat, lon } = useParams();

    const onChange = (event) => {

    }

    const MAX_ZOOM = 22;
    const mapElement = useRef();
    const [mapLatitude, setMapLatitude] = useState(lat);
    const [mapLongitude, setMapLongitude] = useState(lon);
    const [mapZoom, setMapZoom] = useState(15);
    const [map, setMap] = useState({});

    const updateMap = () => {
        map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
        map.setZoom(mapZoom);
    };

    var center = [mapLongitude, mapLatitude];
    useEffect(() => {
        let map = tt.map({
            key: API_KEY,
            container: mapElement.current,
            center: center,
            zoom: mapZoom
        });
        setMap(map);

        var popup = new tt.Popup({
            offset: 30
        });
        var marker = new tt.Marker({
            draggable: true
        }).setLngLat(center).addTo(map);

        var lngLat = new tt.LngLat.convert(center);

        function onDragEnd() {
            lngLat = marker.getLngLat();

            popup.setHTML(lngLat.lng.toString().slice(0, 9) + ", " + lngLat.lat.toString().slice(0, 8));
            popup.setLngLat(lngLat);
            marker.setPopup(popup);
            marker.togglePopup();
        }

        marker.on('dragend', onDragEnd);

        return () => map.remove();
    }, []);

    return (
        <div className="App">
            <div className="background">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
            </div>

            <div id="container_map">
                <div>
                    <Link to="/" id="button_return">
                        <img src={leftArrow} alt="return" />
                    </Link>
                </div>
                <div ref={mapElement} id="map" className="map">
                    <img src={mapImage2} alt="map placeholder" />
                </div>
            </div>

            <br />

            <div>
                <div className="search" id="start">
                    <input type="text"
                        placeholder="Lokasi Awal"
                        onChange={onChange} />
                </div>
                <div className="search" id="finish">
                    <input type="text"
                        placeholder="Destinasi"
                        onChange={onChange}
                        defaultValue={dest ? dest : ""}
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

export default MapsFinish;