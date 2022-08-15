//import logo from './logo.svg';
import './styles.css';
import './background.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import settingLogo from './assets/setting.png'
import scanLogo from './assets/scan.png'
import Maps from './components/maps.js'

import { useState } from 'react';

function App() {
    const [lang, setLang] = useState('id');
    const [dest, setDest] = useState('');

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

                <div className="search">
                    <input
                        id="destInput" type="text" name="destInput"
                        placeholder={lang === 'id' ? "Ketik destinasimu disini" : "Type your destination here"}
                        value={dest}
                        onInput={e => setDest(e.target.value)}
                        onKeyDown={e => keyDown(e)}
                    />
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
                    {/* <img className="middle" src="https://cdn-icons.flaticon.com/png/512/4480/premium/4480405.png?token=exp=1660456745~hmac=62c88fc5cd2fbfcf795bab27a0077177" alt="Scan" /> */}
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
