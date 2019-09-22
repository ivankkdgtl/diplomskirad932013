import React from 'react';

const Informacije = ({ ime, brupita }) => {
  ime=ime.charAt(0).toUpperCase() + ime.slice(1);
  var upit='';
  if ((brupita%10)===1) upit='upit';
  else upit='upita';
  return (
    <div>
      <div className='white f2'>
        {`Korisnik ${ime} je izvršio/la`}
      </div>
      <div className='white f1'>
        {brupita}. {upit}
      </div>
    </div>
  );
}

export default Informacije;