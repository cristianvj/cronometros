import React, {Component} from 'react'
import {Row, Col, Button, Panel, Glyphicon, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
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
    this.setTitle = this.setTitle.bind(this)
    this.setProject = this.setProject.bind(this)

    store.subscribe(()=>{
      this.setState({
        cronometros: store.getState().cronometros
      })
      console.log(this.state.cronometros)
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
                {
                  (cronometro.editCronometro)?
                    <Col xs={12} md={5}>
                      <Panel>
                        <Panel.Heading>
                          <Panel.Title componentClass="h2">Nuevo Cronómetro</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                          <form>
                            <FormGroup>
                              <ControlLabel>Titulo</ControlLabel>
                              <FormControl
                                type="text"
                                value={cronometro.title}
                                placeholder="Escribe un titulo"
                                onChange={(e) => this.setTitle(e,index)}
                              />
                              <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>Proyecto</ControlLabel>
                              <FormControl
                                type="text"
                                value={cronometro.project}
                                placeholder="Escribe el titulo del proyecto"
                                onChange={(e) => this.setProject(e,index)}
                              />
                              <FormControl.Feedback />
                            </FormGroup>
                            <Row style={{display: 'flex', justifyContent: 'center'}}>
                              <Col xs={6} style={{display: 'flex', justifyContent: 'center'}}>
                                <Button 
                                  bsStyle="primary" 
                                  bsSize="large"
                                  onClick={()=>this.handleCronometro(index, false, false, false, true)}
                                >
                                  Editar
                                </Button>
                              </Col>
                              {
                                (this.state.cronometros.length>0)?
                                  <Col xs={6} style={{display: 'flex', justifyContent: 'center'}}>
                                    <Button 
                                      bsStyle="danger" 
                                      bsSize="large"
                                      onClick={()=>this.handleCronometro(index, false, false, false)}
                                    >
                                      Cancelar
                                    </Button>
                                  </Col>
                                :null
                              }
                            </Row>
                          </form>
                        </Panel.Body>
                      </Panel>
                    </Col>
                  :
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
                              <Button onClick={()=>this.handleCronometro(index, false, false, true)}>
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
                }
              </Row>
            )
          })
        }
      </div>
    )
  }

  setTitle(e, index){
    this.setState({
      cronometros: this.state.cronometros.map((cronometro,i) => {
        if(index === i){
          cronometro.title = e.target.value
        }
        return cronometro
      })
    })

  }
  setProject(e, index){
    this.setState({
      cronometros: this.state.cronometros.map((cronometro,i) => {
        if(index === i){
          cronometro.project = e.target.value
        }
        return cronometro
      })
    })
  }

  handleCronometro(index, play, remove=false, editCronometro=false){
    let ms = this.state.cronometros[index].ms
    if(play){
      let cronometro = ''
      cronometro = setInterval(()=>
        this.millisecondsToHuman(ms+=1000, index, cronometro) 
      , 1000)
    }else{
      clearInterval(this.state.cronometros[index].idCronometro)
      let newCronometro = {
        ...this.state.cronometros[index],
        play,
        editCronometro,
      }
      store.dispatch({
        type: "RUN_TIME",
        index,
        newCronometro
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
        ...this.state.cronometros[index],
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