import React from 'react';
import {Grid, Row} from 'react-bootstrap'
import Cronometros from './components/cronometros'
import NewCronometro from './components/new-cronometro'
import BtnNewCronometro from './components/btn-new-cronometro'


let App = ()=>{
  return (
    <div className="App">
      <div className="App-body">
        <Grid>
          <Row className='text-center'>
            <h1>Cronómetros con React.js</h1>
          </Row>
          <br/>
          <Cronometros />
          <br/>
          <NewCronometro/>
          <BtnNewCronometro/>
        </Grid>
      </div>

    </div>
  )
}

export default App;
