//import logo from './logo.svg';
import './styles.css';
import './background.css';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import settingLogo from './assets/setting.png'
import scanLogo from './assets/scan.png'
import Maps from './components/maps.js'

const API_KEY = 'GW4pu0GIxAKW4aUktkhMmIfLblBEESWI';

function App() {
    const [lang, setLang] = useState('id');
    const [dest, setDest] = useState('');
    const [data, setData] = useState([]);

    const onSearch = (searchTerm) => {
        setDest(searchTerm);
        // our api to fetch the search result
    };

    const onChange = (event) => {
        setDest(event.target.value);
        if (event.target.value.length >= 10) {
            fetch('https://api.tomtom.com/search/2/search/' + event.target.value + '.json?key=' + API_KEY + '&language=en-US')
                .then(async response => {
                    const data = await response.json();
                    let value = {};

                    for (let i = 0; i < data.results.length; i++) {
                        value[data.results[i].address.freeformAddress] = data.results[i].position;
                    }

                    console.log(value);
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }

                    setData(value);
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        }
    };

    function keyDown(event) {
        console.log(event.key + ' pressed');
        if (event.key === 'Enter') {
            //history.push('/maps', {dest: dest});
            window.location.href = '/maps/:' + dest;
        }
    }

    return (
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
                        <h1>{lang === 'id' ? 'Pagi, User!' : 'Morning, User!'}</h1>
                        <p>{lang === 'id' ? 'Mau ke mana hari ini?' : 'Where do you want to go today?'}</p>
                    </div>
                    <div className="top_image">
                        <img className="user" src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png" alt='user' />
                    </div>
                </div>

                <br />

                <div className="search-container">
                    <div className="search-inner">
                        <input
                            id="destInput" type="text" name="destInput"
                            placeholder={lang === 'id' ? "Ketik destinasimu disini" : "Type your destination here"}
                            value={dest}
                            onChange={onChange}
                            onKeyDown={e => keyDown(e)}
                        />
                    </div>
                    <div className="dropdown">
                        {Object.keys(data)
                            .filter((item) => {
                                const searchTerm = dest;
                                const fullName = item;
                                console.log('dest', searchTerm, '\nitem', fullName);

                                return (
                                    searchTerm &&
                                    fullName !== searchTerm
                                );
                            })
                            .map((item) => (
                                <div
                                    onClick={() => onSearch(item)}
                                    className="dropdown-row"
                                    key={item}
                                >
                                    {item}
                                </div>
                            ))}
                    </div>
                </div>
            </header>

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
                    <p>{lang === 'id'
                        ? 'Terintegrasi dengan PeduliLindungi, kami berharap transportasi publik dapat terhindar dari paparan Covid19'
                        : 'Integrated with PeduliLindungi, we wish for public transportation to be Covid19-free'}</p>
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
                        onClick={() => { setLang('id') }}
                    />
                    <img className="right2"
                        src="https://cdn-icons-png.flaticon.com/512/323/323329.png"
                        alt="Language-EN"
                        onClick={() => { setLang('en') }}
                    />
                </nav>
            </footer>
        </div>
    );
}

function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={App()} />
                <Route path='maps' element={<Maps />}>
                    <Route path=':dest' element={<Maps />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}
export default Main;
