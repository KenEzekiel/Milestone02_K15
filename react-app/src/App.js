//import logo from "./logo.svg";
import "./styles.css";
import "./background.css";

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import settingLogo from "./assets/setting.png"
import scanLogo from "./assets/scan.png"
<<<<<<< HEAD
import Maps from "./components/Maps.js"
import MapsFinish from "./components/MapsFinish.js"
=======
import Maps from "./components/maps.js"
>>>>>>> 588975db57b38752a3a252a81d0e0c28ed7007c5

const API_KEY = "GW4pu0GIxAKW4aUktkhMmIfLblBEESWI";
let notClicked = true;

function App() {
    const [lang, setLang] = useState("id");
    const [dest, setDest] = useState("");
    const [data, setData] = useState([]);
    const [coor, setCoor] = useState([]);

    function keyDown(event) {
        if (event.key === 'Enter' && coor.length != 0) {
            window.location.href = "/maps/" + dest + "/" + coor[0] + "/" + coor[1];
        }
    }

    const onSearch = (searchTerm) => {
        for (let i = 0; i < data.length; i++) {
            if (searchTerm === data[i].address) {
                setDest(searchTerm);
                setCoor([data[i].position.lon, data[i].position.lat]);
                notClicked = false;
            }
        }
    };

    const onChange = (event) => {
        setDest(event.target.value);
        if (event.target.value.length >= 5) {
            fetch("https://api.tomtom.com/search/2/search/" + event.target.value + ".json?key=" + API_KEY + "&typeahead=true&limit=5&countrySet=ID/IDN&lat=-6.89148&lon=107.6084704&radius=13000&language=id-ID")
                .then(async response => {
                    const dataResult = await response.json();
                    let value = [];

                    for (let i = 0; i < dataResult.results.length; i++) {
                        value.push({
                            address: dataResult.results[i].address.freeformAddress.replaceAll("Desa/Dusun/Kelurahan ", "").replace("/Kav.", ""),
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
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={
                    <div className="App">
                        <header>
                            <div className="background">
                                <div className="circle1"></div>
                                <div className="circle2"></div>
                                <div className="circle3"></div>
                                <div className="circle4"></div>
                            </div>
                            <div className="top">
                                <div className="top_text">
                                    <h1>{lang === "id" ? "Pagi, User!" : "Morning, User!"}</h1>
                                    <p>{lang === "id" ? "Mau ke mana hari ini?" : "Where do you want to go today?"}</p>
                                </div>
                                <div className="top_image">
                                    <img className="user" src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png" alt="user" />
                                </div>
                            </div>

                            <br />

                            <div className="search-container">
                                <div className="search-inner">
                                    <input
                                        id="destInput" type="text" name="destInput"
                                        placeholder={lang === "id" ? "Ketik destinasimu disini" : "Type your destination here"}
                                        value={dest}
                                        onChange={onChange}
                                        onKeyDown={e => keyDown(e)}
                                    />
                                </div>
                                <div className="dropdown">
                                    {notClicked && data
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
                            </div>
                        </header >

                        <br />

                        <article>
                            <section id="weather" className="home_widgets">
                                <div>
                                    <img src="https://cdn-icons-png.flaticon.com/512/3781/3781624.png" alt="Weather Icon" />
                                    <strong id="temp_text">27&#8451;</strong>
                                    <strong id="bandung_text">Bandung, Jawa Barat</strong>
                                    <section id="line"></section>
                                </div>
                            </section>
                            <section id="pedulilindungi" className="home_widgets">
                                <img src="https://www.pedulilindungi.id/assets/logo-with-text.svg" alt="PeduliLindungi" />
                                <p>{lang === "id"
                                    ? "Terintegrasi dengan PeduliLindungi, kami berharap transportasi publik dapat terhindar dari paparan Covid19"
                                    : "Integrated with PeduliLindungi, we wish for public transportation to be Covid19-free"}</p>
                            </section>
                        </article>

                        <footer>
                            <nav>
                                <img className="left2" src={settingLogo} alt="Settings" />
                                <img className="left1" src="https://cdn-icons-png.flaticon.com/512/189/189665.png" alt="Help" />
                                <img className="middle" src={scanLogo} alt="Scan" />
                                <img
                                    className="right1"
                                    src="https://cdn-icons-png.flaticon.com/512/323/323372.png"
                                    alt="Language-ID"
                                    onClick={() => { setLang("id") }}
                                />
                                <img className="right2"
                                    src="https://cdn-icons-png.flaticon.com/512/323/323329.png"
                                    alt="Language-EN"
                                    onClick={() => { setLang("en") }}
                                />
                            </nav>
                        </footer>
                    </div >
                } />
                <Route path="maps/:dest/:lon/:lat" element={<Maps />} />
                <Route path="finish/:dest1/:lon1/:lat1/:dest2/:lon2/:lat2/:zoom" element={<MapsFinish />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;