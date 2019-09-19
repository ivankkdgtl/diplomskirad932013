import React from 'react';
import './DetekcijaLica.css';
import Tilt from 'react-tilt';


const DetekcijaLica = ({ urlSlike, okvir }) => {
  return (
    <div className='center ma'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 30, transition: true, axis: 'Y', 'transform-style': 'preserve-3d' }} style={{width: 500}} >
          <div className='absolute mt2'>
            <img id='inputimage' alt='' src={urlSlike} width='500px' height='auto' style={{display: 'none'}}/>
              {Array.isArray(okvir)
              ? okvir.map((item, index) => ( 
              <div key={index} className='bounding-box' style={{top: item.topRow, right: item.rightCol, bottom: item.bottomRow, left: item.leftCol}}></div>
              ))
              : <div></div>  
              }
          </div>
        </Tilt>
        <br/>
      <br/>
    </div>
  );
}

export default DetekcijaLica;