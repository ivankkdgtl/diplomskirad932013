import React, { Component } from 'react';
import Particles2 from './components/Particles/Particles';
import DetekcijaLica from './components/DetekcijaLica/DetekcijaLica';
import Navigacija from './components/Navigacija/Navigacija';
import Prijava from './components/Prijava/Prijava';
import Registracija from './components/Registracija/Registracija';
import UrlForma from './components/UrlForma/UrlForma';
import BrUpita from './components/BrUpita/BrUpita';
import './App.css';


const pocetnoStanje = {
  unos: '',
  urlSlike: '',
  okvir: [],
  ruta: 'prijava',
  ulogovan: false,
  korisnik: {
    id: '',
    ime: '',
    email: '',
    brupita: 0,
    regdatum: ''
  }
}

const urlServera= 'https://diplomskirad932013-back.herokuapp.com';

class App extends Component {
  constructor() {
    super();
    this.state = pocetnoStanje;
  }

  ucitajKorisnika = (data) => {
    this.setState({korisnik: {
      id: data.id,
      ime: data.ime,
      email: data.email,
      brupita: data.brupita,
      regdatum: data.regdatum
    }})
  }

  lokacijaLica = (data) => {
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  okvirLica = (data) => {
    this.setState({
      okvir: [...this.state.okvir, data]
    })
  }

  promenaUnosa = (event) => {
    this.setState({unos: event.target.value});
  }

  detektuj = () => {
    document.getElementById("inputimage").style.display='none';
    this.setState({urlSlike: this.state.unos, okvir: []});
      fetch(urlServera+'/urlslike', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.unos
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          if (response==='Unesite validan URL!') {
            this.setState({okvir: 'invalid'});
          } else {
            document.getElementById("inputimage").style.display='block';
            fetch(urlServera+'/slika', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.korisnik.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.korisnik, { brupita: count}))
              })
              .catch(console.log)

          }

        }
        if (response.outputs[0].data.regions) {
          const regions = response.outputs[0].data.regions;
          console.log('response', response);
          console.log('regions', regions);
          regions.forEach(element => {
            this.okvirLica(this.lokacijaLica(element))
          });
          console.log('state', this.state);
        } 
        else {
          this.setState({okvir: 'error'});
          console.log(response);
        }
      })
      .catch(err => console.log(err));
  }

  promenaRute = (ruta) => {
    if (ruta === 'odjava') {
      this.setState(pocetnoStanje)
    } else if (ruta === 'pocetna') {
      this.setState({ulogovan: true})
    }
    this.setState({ruta: ruta});
  }

  render() {
    const { ulogovan, urlSlike, ruta, okvir } = this.state;
    return (
      <div className="App">
      <div style={{position: 'absolute', bottom: '10px', right: '10px'}}>Ivan Milunovic, 93/2013</div>
      <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
         <Particles2/>
        <Navigacija ulogovan={ulogovan} promenaRute={this.promenaRute} />
        { ruta === 'pocetna'
          ? <div>
              <BrUpita
                ime={this.state.korisnik.ime}
                brupita={this.state.korisnik.brupita}
              />
              <UrlForma
                promenaUnosa={this.promenaUnosa}
                detektuj={this.detektuj}
                okvir={okvir}
              />
              <DetekcijaLica okvir={okvir} urlSlike={urlSlike} />
            </div>
          : (
             ruta === 'prijava'
             ? <Prijava urlServera={urlServera} ucitajKorisnika={this.ucitajKorisnika} promenaRute={this.promenaRute}/>
             : <Registracija urlServera={urlServera} ucitajKorisnika={this.ucitajKorisnika} promenaRute={this.promenaRute}/>
            )
        }
      </div>
    );
  }
}

export default App;
