import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      lozinka: '',
      ime: ''
    }
  }

  promenaImena = (event) => {
    this.setState({ime: event.target.value})
  }

  promenaEmaila = (event) => {
    this.setState({email: event.target.value})
  }

  promenaLozinke = (event) => {
    this.setState({lozinka: event.target.value})
  }

  prijavi = () => {
    fetch('http://localhost:3001/registracija', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        lozinka: this.state.lozinka,
        ime: this.state.ime
      })
    })
      .then(response => response.json())
      .then(korisnik => {
        if (korisnik==='incorrect form submission') {
          document.getElementsByClassName('error')[0].classList.add('red');
          document.getElementsByClassName('error')[0].innerHTML='Loše uneti podaci!';
        } else  if (korisnik==='email') {
          document.getElementsByClassName('error')[0].classList.add('red');
          document.getElementsByClassName('error')[0].innerHTML='Email je vec iskorisćen!';
        } 
        if (korisnik.id) {
          this.props.ucitajKorisnika(korisnik)
          this.props.promenaRute('pocetna');
        }
      })
  }

  render() {

    return (
      <article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 boxerino center">
        <main className="pa4 ">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 center">Registracija</legend>
              <div className="error f5 fw6 ph0 mh0">Unesite vase podatke</div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Ime</label>
                <input
                  className="pa2 input-reset ba bg-transparent white hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.promenaImena}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent white hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.promenaEmaila}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Lozinka</label>
                <input
                  className="b pa2 input-reset ba bg-transparent white hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.promenaLozinke}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.prijavi}
                className="b white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Registruj se"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;