import "./mapsfinish.css"

import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"

import leftArrow from "../assets/left-arrow.png"
import mapImage2 from "../assets/Map Image 2.png"

import * as tt from "@tomtom-international/web-sdk-maps";
import * as tts from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const API_KEY = "GW4pu0GIxAKW4aUktkhMmIfLblBEESWI";

function MapsFinish() {
    let { dest1, lon1, lat1, dest2, lon2, lat2, zoom } = useParams();
    let center = [(parseFloat(lon1) + parseFloat(lon2)) / 2, (parseFloat(lat1) + parseFloat(lat2)) / 2];

    const mapElement = useRef();
    let [timeTravel, setTimeTravel] = useState();
    let [distanceTravel, setDistanceTravel] = useState();

    fetch("https://api.tomtom.com/routing/1/calculateRoute/" + lat1 + "," + lon1 + ":" + lat2 + "," + lon2 + "/json?instructionsType=text&language=id-ID&key=" + API_KEY)
        .then(async response => {
            const dataResult = await response.json();

            if (!response.ok) {
                const error = (dataResult && dataResult.message) || response.statusText;
                return Promise.reject(error);
            }

            setTimeTravel(Math.ceil(dataResult.routes[0].summary.travelTimeInSeconds / 60));
            setDistanceTravel(dataResult.routes[0].summary.lengthInMeters);
        })
        .catch(error => {
            console.error("There was an error!", error);
        });

    useEffect(() => {
        let center1 = [lon1, lat1];
        let center2 = [lon2, lat2];

        let map = tt.map({
            key: API_KEY,
            container: mapElement.current,
            center: center,
            zoom: zoom
        });

        let popup1 = new tt.Popup({
            offset: 35
        });
        let marker1 = new tt.Marker({
            draggable: false
        }).setLngLat(center1).addTo(map);

        var lngLat1 = marker1.getLngLat();
        popup1.setHTML(lngLat1.lng.toString().slice(0, 9) + ", " + lngLat1.lat.toString().slice(0, 8));
        popup1.setLngLat(lngLat1);
        marker1.setPopup(popup1);
        marker1.togglePopup();

        var popup2 = new tt.Popup({
            offset: 35
        });
        var marker2 = new tt.Marker({
            draggable: false
        }).setLngLat(center2).addTo(map);

        var lngLat2 = marker2.getLngLat();
        popup2.setHTML(lngLat2.lng.toString().slice(0, 9) + ", " + lngLat2.lat.toString().slice(0, 8));
        popup2.setLngLat(lngLat2);
        marker2.setPopup(popup2);
        marker2.togglePopup();

        tts.services.calculateRoute({
            key: API_KEY,
            locations: lon1 + "," + lat1 + ":" + lon2 + "," + lat2
        })
            .then(function (response) {
                var geojson = response.toGeoJson();
                map.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': {
                        'type': 'geojson',
                        'data': geojson
                    },
                    'paint': {
                        'line-color': '#00d7ff',
                        'line-width': 8
                    }
                });
                var bounds = new tt.LngLatBounds();
                geojson.features[0].geometry.coordinates.forEach(function (point) {
                    bounds.extend(tt.LngLat.convert(point));
                });
                map.fitBounds(bounds, { padding: 20 });
            });

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
                    <Link to="/maps/:dest2/:lon2/:lat2" id="button_return">
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
                        value={dest1}
                        readOnly
                    />
                </div>
                <div className="search" id="finish">
                    <input type="text"
                        placeholder="Destinasi"
                        value={dest2}
                        readOnly
                    />
                </div>
            </div>

            <br />
            <div>
                <div className="bus_details" id="est_time">
                    <div className="details_text">
                        <p><strong>Estimasi Kedatangan</strong></p>
                        <p>{timeTravel} min ({distanceTravel} m)</p>
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