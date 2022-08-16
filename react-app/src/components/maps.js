import "./maps.css"

import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"

import leftArrow from "../assets/left-arrow.png"
import mapImage2 from "../assets/Map Image 2.png"

import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const API_KEY = "GW4pu0GIxAKW4aUktkhMmIfLblBEESWI";
let notClicked = true;
let pickFromMap = true;
let marker1;

function Maps() {
    let { dest, lat, lon } = useParams();
    const [data, setData] = useState([]);
    const [coor, setCoor] = useState([]);
    const [strt, setStrt] = useState("");

    const onSearch = (searchTerm) => {
        for (let i = 0; i < data.length; i++) {
            if (searchTerm === data[i].address) {
                setStrt(searchTerm);
                setCoor([data[i].position.lon, data[i].position.lat]);
                notClicked = false;
                marker1.remove();
                marker1 = new tt.Marker({
                    draggable: true
                }).setLngLat([data[i].position.lon, data[i].position.lat]).addTo(map);
            }
        }
    };

    const onChange = (coordinates) => {
        if (coordinates.length === 2) {
            pickFromMap = true;
            setCoor(coordinates);
            fetch("https://api.tomtom.com/search/2/reverseGeocode/" + coordinates[1] + "%2C" + coordinates[0] + ".json?returnSpeedLimit=false&radius=10&returnRoadUse=false&language=id-ID&allowFreeformNewLine=false&returnMatchType=false&view=Unified&key=" + API_KEY)
                .then(async response => {
                    const dataResult = await response.json();

                    if (!response.ok) {
                        const error = (dataResult && dataResult.message) || response.statusText;
                        return Promise.reject(error);
                    }

                    notClicked = true;
                    setStrt(dataResult.addresses[0].address.freeformAddress.replaceAll("Desa/Dusun/Kelurahan ", "").replace("/Kav.", ""));
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        } else {
            pickFromMap = false;
            let event = coordinates;
            setStrt(event.target.value);
            if (event.target.value.length >= 5) {
                fetch("https://api.tomtom.com/search/2/search/" + event.target.value + ".json?key=" + API_KEY + "&typeahead=true&limit=5&countrySet=ID/IDN&lat=" + lat + "&lon=" + lon + "&radius=13000&language=id-ID")
                    .then(async response => {
                        const dataResult = await response.json();
                        let value = [];

                        for (let i = 0; i < dataResult.results.length; i++) {
                            value.push({
                                address: dataResult.results[i].address.freeformAddress.replaceAll("Desa/Dusun/Kelurahan ", ""),
                                position: dataResult.results[i].position
                            });
                        }

                        if (!response.ok) {
                            const error = (dataResult && dataResult.message) || response.statusText;
                            return Promise.reject(error);
                        }

                        notClicked = true;
                        setData(value);
                    })
                    .catch(error => {
                        console.error("There was an error!", error);
                    });
            }
        }
    }
    const mapElement = useRef();
    const [map, setMap] = useState({});

    var center1 = coor.length === 2 ? coor : [parseFloat(lon) + 0.0005, parseFloat(lat) + 0.0005];
    console.log(center1);
    var center2 = [lon, lat];
    useEffect(() => {
        let map = tt.map({
            key: API_KEY,
            container: mapElement.current,
            center: center2,
            zoom: 15
        });
        setMap(map);

        var popup1 = new tt.Popup({
            offset: 35
        });
        marker1 = new tt.Marker({
            draggable: true
        }).setLngLat(center1).addTo(map);

        function onDragEnd() {
            var lngLat1 = marker1.getLngLat();

            popup1.setHTML(lngLat1.lng.toString().slice(0, 9) + ", " + lngLat1.lat.toString().slice(0, 8));
            popup1.setLngLat(lngLat1);
            marker1.setPopup(popup1);
            marker1.togglePopup();
            onChange([parseFloat(lngLat1.lng.toString().slice(0, 9)), parseFloat(lngLat1.lat.toString().slice(0, 8))]);
        }

        marker1.on('dragend', onDragEnd);

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
                <div ref={mapElement} id="map" className="map" />
            </div>

            <br />

            <div className="search-container">
                <div className="search" id="start">
                    <input type="text"
                        placeholder="Lokasi Awal"
                        onChange={onChange}
                        value={strt} />
                </div>
                <div className="dropdown">
                    {!pickFromMap && notClicked && data
                        .filter((item) => {
                            const searchTerm = dest;
                            const fullName = item.address;
                            return searchTerm && searchTerm !== fullName;
                        })
                        .map((item) => (
                            <div
                                onClick={() => onSearch(item.address)}
                                className="dropdown-row"
                                key={item.address}
                            >
                                {item.address}
                            </div>
                        ))
                    }
                </div>
                <div className="search" id="finish">
                    <input type="text"
                        placeholder="Destinasi"
                        value={dest ? dest : ""}
                        readOnly="readonly"
                    />
                </div>
            </div>
        </div>
    )
};

export default Maps;