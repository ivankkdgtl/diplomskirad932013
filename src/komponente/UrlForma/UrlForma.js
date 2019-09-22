import React from 'react';
import './UrlForma.css';


const UrlForma = ({ promenaUnosa, detektuj, okvir }) => {
  var info = 'Unesite URL slike za detektovanje lica.';
  if(okvir==='error') {
    info = `Nijedno lice nije detektovano!`;
  } else if(okvir==='invalid') {
    info = `Neispravan link!`;
  } else {
    if(okvir.length>0) {
      if(okvir.length===1){
        info = `Detektovano je ${okvir.length}. lice!`;
      } else {
        info = `Detektovano je ${okvir.length}. lica!`;
      }
    }
  }
  return (
    <div>
      <p className='f3'>
          {info}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 boxerino'>
          <input className='f4 pa2 w-70 center' type='tex' onChange={promenaUnosa}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={detektuj}
          >Detektuj</button>
        </div>
      </div>
    </div>
  );
}

export default UrlForma;