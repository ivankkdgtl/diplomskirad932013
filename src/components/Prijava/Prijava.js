import React from 'react';


class Prijava extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PrijavaEmail: '',
      PrijavaPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({PrijavaEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({PrijavaPassword: event.target.value})
  }

  onSubmitPrijava = () => {
    fetch('http://localhost:3001/prijava', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.PrijavaEmail,
        lozinka: this.state.PrijavaPassword
      })
    })
      .then(response => response.json())
      .then(korisnik => {
        if (korisnik.id) {
          this.props.ucitajKorisnika(korisnik)
          this.props.promenaRute('pocetna');
        } else {
          console.log(korisnik);
          document.getElementsByClassName('greska')[0].classList.add('red');
          document.getElementsByClassName('greska')[0].innerHTML=korisnik;
        }
      })
  }

  render() {
    const { promenaRute } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 boxerino center">
        <main className="pa4">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Prijava</legend>
              <label className="db fw6 lh-copy f6 greska"></label>

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black white hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Lozinka</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black white hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitPrijava}
                className="b ph3 pv2 input-reset ba  bg-transparent grow pointer f6 dib white"
                type="submit"
                value="Prijavi se"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => promenaRute('registracija')} className="f6 link dim  db pointer">Registruj se</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Prijava;