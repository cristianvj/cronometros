import React, {Component} from 'react'
import {Row, Col, Button, Panel, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import store from '../store'

class NewCronometro extends Component{
  constructor(){
    super()
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeProject = this.handleChangeProject.bind(this)
    this.addCronometro = this.addCronometro.bind(this)
    this.closeFormCronometro = this.closeFormCronometro.bind(this)

    this.state={
      showNewCronometro:true,
      cronometros:[],
    }

    store.subscribe(()=>{
      this.setState({
        showNewCronometro: store.getState().showNewCronometro,
        cronometros: store.getState().cronometros
      })
    })
  }

  render(){
    return(
      <div>
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
      </div>
    )
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
  addCronometro(){
    let newCronometro = {
      title: this.state.title,
      project: this.state.project,
      time: '00:00:00',
      play: false,
      idCronometro: 0,
      ms: 0
    }
    store.dispatch({
      type: "ADD_CRONOMETRO",
      newCronometro
    })
  }
  closeFormCronometro(){
    store.dispatch({
      type: "CLOSE_FORM_CRONOMETRO"
    })
  }
}

export default NewCronometro