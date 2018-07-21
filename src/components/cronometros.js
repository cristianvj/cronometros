import React, {Component} from 'react'
import {Row, Col, Button, Panel, Glyphicon} from 'react-bootstrap'
import store from '../store'

class Cronometros extends Component{
  constructor(){
    super()
    this.state={
      cronometros:[],
    }

    this.handleCronometro = this.handleCronometro.bind(this)
    this.millisecondsToHuman = this.millisecondsToHuman.bind(this)
    this.pad = this.pad.bind(this)
    this.removeCronometro = this.removeCronometro.bind(this)

    store.subscribe(()=>{
      this.setState({
        cronometros: store.getState().cronometros
      })
    })
  }

  render(){
    return(
      <div>
        {
          this.state.cronometros.map((cronometro, index)=>{
            return(
              <Row 
                key={index}
                style={{display: 'flex', justifyContent: 'center'}}
              >
                <Col xs={12} md={5}>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title componentClass="h2">{cronometro.title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <p>{cronometro.project}</p>
                      <h2 className='text-center'>{cronometro.time}</h2>
                      <Row>
                        <Col xs={1}>
                          <Button onClick={()=>this.handleCronometro(index, false, true)}>
                            <Glyphicon glyph="trash"/>
                          </Button>
                        </Col>
                        <Col xs={1}>
                          <Button>
                            <Glyphicon glyph="edit" />
                          </Button>
                        </Col>
                      </Row>
                      <br/>
                      <Row>
                        {
                          (cronometro.play)?
                            <div style={{maxWidth: 400, margin: '0 auto 10px'}}>
                              <Button 
                                onClick={()=>this.handleCronometro(index, false)}
                                bsStyle="success" 
                                bsSize="large" 
                                block
                              >
                                Pausar
                              </Button>
                            </div>
                          :
                            <div style={{maxWidth: 400, margin: '0 auto 10px'}}>
                              <Button
                                onClick={()=>this.handleCronometro(index, true)}
                                bsStyle="primary"
                                bsSize="large"
                                block
                              >
                                Iniciar
                              </Button>
                            </div>
                        }
                      </Row>
                    </Panel.Body>
                  </Panel>
                </Col>
              </Row>
            )
          })
        }
      </div>
    )
  }

  handleCronometro(index, play, remove=false){
    let a = this.state.cronometros[index].ms
    let cronometro = ''
    if(play){
      cronometro = setInterval(()=>
        this.millisecondsToHuman(a+=1000, index, cronometro) 
      , 1000)
    }else{
      clearInterval(this.state.cronometros[index].idCronometro)
      let newCronometro = {
        title: this.state.cronometros[index].title,
        project: this.state.cronometros[index].project,
        time: this.state.cronometros[index].time,
        idCronometro:this.state.cronometros[index].idCronometro,
        play:false,
        ms: this.state.cronometros[index].ms
      }
      this.setState({
        cronometros: [
          ...this.state.cronometros.slice(0, index),
          newCronometro,
          ...this.state.cronometros.slice(index+1)
        ]
      })
    }
    if(remove){
      this.removeCronometro(index)
    }
  }
  millisecondsToHuman(ms, index, idCronometro) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    const humanized = [
      this.pad(hours.toString(), 2),
      this.pad(minutes.toString(), 2),
      this.pad(seconds.toString(), 2),
    ].join(':');
    if(this.state.cronometros[index]){
      let newCronometro = {
        title: this.state.cronometros[index].title,
        project: this.state.cronometros[index].project,
        time: humanized,
        idCronometro,
        play: true,
        ms,
      }
      store.dispatch({
        type: "RUN_TIME",
        index,
        newCronometro
      })
    }
  }
   pad(numberString, size) {
     let padded = numberString
     while (padded.length < size) padded = `0${padded}`
     return padded
   }
   removeCronometro(index){
     store.dispatch({
       type: "REMOVE_CRONOMETRO",
       index
     })
   }
}

export default Cronometros