//import logo from './logo.svg';
import './styles.css';
import './background.css';

function App() {
  return (
    <div className="App">
      <header>
            <div class="background">
                <div class="circle1"></div>  
                <div class="circle2"></div>  
                <div class="circle3"></div>  
                <div class="circle4"></div> 
            </div>
            <div class="top">
                <div class="top_text">
                    <h1>Pagi, User!</h1>
                    <p>Mau ke mana hari ini?</p>
                </div>
                <div class="top_image">
                    <img class="user" src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png" alt='user'/>
                </div>
            </div>
            <br />
            <div class="search">
                <input id="destInput" type="text" name="destInput" placeholder="Ketik destinasimu disini"/>
            </div>
        </header>

        <br />
        
        <article>
            <section id="weather" class="home_widgets">
                <p>
                    <img src="https://cdn-icons-png.flaticon.com/512/3781/3781624.png" alt="Weather Icon"/>
                    <strong id="temp_text">27&#8451;</strong>
                    <strong id="bandung_text">Bandung, Jawa Barat</strong>
                    <section id="line"></section>
                </p>
            </section>

            <section id="pedulilindungi" class="home_widgets">
                <img src="https://www.pedulilindungi.id/assets/logo-with-text.svg" alt="PeduliLindungi"/>
                <p>Terintegrasi dengan PeduliLindungi, kami berharap transportasi publik dapat terhindar dari paparan Covid19</p>
            </section>

        </article>

        <footer>
            <nav>
                <img src="assets/setting.png" alt="Settings"/>
                <img src="https://cdn-icons-png.flaticon.com/512/189/189665.png" alt="Help"/>
                <img class="middle" src="assets/scan.png" alt="Scan"/>
                <img src="https://cdn-icons-png.flaticon.com/512/323/323372.png" alt="Language-ID"/>
                <img src="https://cdn-icons-png.flaticon.com/512/323/323329.png" alt="Language-EN"/>
            </nav>
        </footer>
    </div>
  );
}

export default App;
