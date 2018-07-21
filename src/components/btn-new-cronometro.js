import React, {Component} from 'react'
import {Row, Col, Button, Glyphicon} from 'react-bootstrap'
import store from '../store'

class BtnNewCronometro extends Component{
  constructor(){
    super()
    this.state={
      showNewCronometro: true,
      showButtonNewCronometro: false
    }

    this.openFormCronometro = this.openFormCronometro.bind(this)

    store.subscribe(()=>{
      this.setState({
        showButtonNewCronometro: store.getState().showButtonNewCronometro
      })
    })
  }

  render(){
    return(
      <div>
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
      </div>
    )
  }
  openFormCronometro(){
    /*this.setState({
      showNewCronometro: true,
      showButtonNewCronometro: false
    })*/
    store.dispatch({
      type: "SHOW_FORM_NEW_CRONOMETRO",
      showNewCronometro: true,
      showButtonNewCronometro: false
    })
  }
}

export default BtnNewCronometro