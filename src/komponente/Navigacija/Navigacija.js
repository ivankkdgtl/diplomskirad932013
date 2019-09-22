import React from 'react';

const Navigacija = ({ promenaRute, ulogovan }) => {
    if (ulogovan) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => promenaRute('odjava')} className='f3 link dim  underline pa3 pointer'>Odjavi se</p>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => promenaRute('prijava')} className='f3 link dim  underline pa3 pointer'>Prijavi se</p>
          <p onClick={() => promenaRute('registracija')} className='f3 link dim  underline pa3 pointer'>Registracija</p>
        </nav>
      );
    }
}

export default Navigacija;