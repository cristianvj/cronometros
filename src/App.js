import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel, 
        FormGroup, ControlLabel, FormControl, Glyphicon} from 'react-bootstrap'

class App extends Component {

  constructor() {
      super();
      
      this.handleChangeTitle = this.handleChangeTitle.bind(this)
      this.handleChangeProject = this.handleChangeProject.bind(this)
      this.addCronometro = this.addCronometro.bind(this)
      this.openFormCronometro = this.openFormCronometro.bind(this)
      this.removeCronometro = this.removeCronometro.bind(this)
      this.closeFormCronometro = this.closeFormCronometro.bind(this)
      this.pad = this.pad.bind(this)
      this.millisecondsToHuman = this.millisecondsToHuman.bind(this)
      this.handleCronometro = this.handleCronometro.bind(this)

      this.state = {
        title: '',
        project: '',
        cronometros:[],
        showNewCronometro: true,
        showButtonNewCronometro:false
      }
    }

    handleChangeTitle(e) {
      this.setState({ 
        title: e.target.value 
      });
    }
    handleChangeProject(e) {
      this.setState({ 
        project: e.target.value 
      });
    }


  render() {
    return (
      <div className="App">
        <div className="App-body">
          <Grid>
            <Row className='text-center'>
              <h1>Cronómetros con React.js</h1>
            </Row>
            <br/>
            {
              //Componente cronómetros
            }
            
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
            {
              //Component Nuevo Cronómetro
            }
            <br/>
            {
              (this.state.showNewCronometro)?
              
                <Row style={{display: 'flex', justifyContent: 'center'}}>
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
                              value={this.state.value}
                              placeholder="Escribe un titulo"
                              onChange={this.handleChangeTitle}
                            />
                            <FormControl.Feedback />
                          </FormGroup>
                          <FormGroup>
                            <ControlLabel>Proyecto</ControlLabel>
                            <FormControl
                              type="text"
                              value={this.state.value}
                              placeholder="Escribe el nombre del proyecto"
                              onChange={this.handleChangeProject}
                            />
                            <FormControl.Feedback />
                          </FormGroup>
                          <Row style={{display: 'flex', justifyContent: 'center'}}>
                            <Col xs={6} style={{display: 'flex', justifyContent: 'center'}}>
                              <Button 
                                bsStyle="primary" 
                                bsSize="large"
                                onClick={this.addCronometro}
                              >
                                Crear
                              </Button>
                            </Col>
                            {
                              (this.state.cronometros.length>0)?
                                <Col xs={6} style={{display: 'flex', justifyContent: 'center'}}>
                                  <Button 
                                    bsStyle="danger" 
                                    bsSize="large"
                                    onClick={this.closeFormCronometro}
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
                </Row>
              : null
            }
            {
              //Componente add nuevo cronometro
            }
            {
              (this.state.showButtonNewCronometro)?
                <Row>
                  <Col xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={this.openFormCronometro}>
                      <Glyphicon glyph="plus" />
                    </Button>
                  </Col>
                </Row>
              :null
            }

          </Grid>
        </div>

      </div>
    );
  }

  addCronometro(){
    let newCronometro = {
      title: this.state.title,
      project: this.state.project,
      time: '00:00:00',
      play: false,
      idCronometro: 0,
      ms: 0
    }
    this.setState({
      cronometros: [...this.state.cronometros, newCronometro],
      showNewCronometro: false,
      showButtonNewCronometro: true
    })
  }
  openFormCronometro(){
    this.setState({
      showNewCronometro: true,
      showButtonNewCronometro: false
    })
  }
  closeFormCronometro(){
    this.setState({
      showNewCronometro: false,
      showButtonNewCronometro: true
    })
  }
  removeCronometro(index){
    this.setState({
      cronometros: [
        ...this.state.cronometros.slice(0,index),
        ...this.state.cronometros.slice(index+1)
      ],
      showButtonNewCronometro:true
    })
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
      this.setState({
        cronometros: [
          ...this.state.cronometros.slice(0, index),
          newCronometro,
          ...this.state.cronometros.slice(index+1)
        ]
      })
    }
  }

   pad(numberString, size) {
     let padded = numberString
     while (padded.length < size) padded = `0${padded}`
     return padded
   }

}

export default App;
