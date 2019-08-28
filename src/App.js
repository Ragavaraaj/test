import React from 'react';
import './App.css';
import { Container , Col , Row , Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink , Form , FormGroup , Button , Label , Input } from 'reactstrap';
import { Modal , ModalHeader , ModalBody , ModalFooter , FormFeedback } from 'reactstrap';
import './Cards/PersonCards.js'
import PersonCards from './Cards/PersonCards.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse : true,
      model : false,
      cards : false,
      name : "",
      pass : "",
      people : [],
      invalid : {
        user : false,
        pass : false
      }
    }
  }

  toggleNavbar = () => {
    this.setState({
      collapse : !this.state.collapse
    });
  }  

  toogleModel = (val) => {
    if(val)
    {
      let join = [...this.state.people,{name: this.state.name , pass: this.state.pass}]
      this.setState({
        people : join,
        model : !this.state.model
      })
    }
    else
    this.setState({
      model : !this.state.model
    })
  }

  nameHandler = (event) => {
    if(event.target.value.match(/^[A-Za-z]+$/) && event.target.value !== "")
      this.setState({
        invalid : { ...this.state.invalid , user : false },
        name : event.target.value
      })
    else
    this.setState({
      invalid : { ...this.state.invalid , user : true },
      name : event.target.value
    })
  }

  passwordHandler = (event) => {
    if(event.target.value.match(/^[a-zA-Z]\w{3,14}$/) && event.target.value !== "")
      this.setState({
        invalid : { ...this.state.invalid , pass : false },
        pass : event.target.value
      })
    else
    this.setState({
      invalid : { ...this.state.invalid , pass : true },
      pass : event.target.value
    })
  }

  toggleCards = () => {
    this.setState({
      cards : !this.state.cards
    })
  }

  peopleHandler = (index) => {
    const newpeople = this.state.people;
    newpeople.splice(index,1);
    this.setState({
      people : newpeople
    })
  }

  render() {

    let modelview = null
    let cardsview = null;
    let pass = <Input type="password" name="pass" id="pass" onChange={this.passwordHandler} />;
    let user = <Input type="text" name="usr" id="usr" onChange={this.nameHandler} />

    if(this.state.model)
    {
      modelview = 
        <Modal isOpen={!this.state.modal} toggle={this.toogleModel} className={this.props.className}>
          <ModalHeader toggle={this.toogleModel}>Welcome {this.state.name}</ModalHeader>
          <ModalBody>
           Hello Welcome to the page.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toogleModel.bind(this,false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      ;
    }

    if(this.state.cards)
    {
      cardsview = this.state.people.map((el , index) => {
        return  <PersonCards pass={el.pass} index={index} handler={this.peopleHandler.bind(this,index)}>{el.name}</PersonCards>  
      });
    }

    if(this.state.invalid.pass && this.state.pass !== "")
      pass = <Input type="password" name="pass" id="pass" onChange={this.passwordHandler} invalid/>
    else
      pass = <Input type="password" name="pass" id="pass" onChange={this.passwordHandler} valid/>
    

    if(this.state.invalid.user && this.state.name !== "")
      user = <Input type="text" name="pass" id="pass" onChange={this.nameHandler} invalid/>
    else
      user = <Input type="text" name="pass" id="pass" onChange={this.nameHandler} valid/>

    return (
      <div className="App">
      <Container fluid>
      <Row>
      <Col>
      <Navbar color="faded" light>
      <NavbarBrand href="/" className="mr-auto">Hello World</NavbarBrand>
      <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
      <Collapse isOpen={!this.state.collapse} navbar>
      <Nav navbar>
      <NavItem>
      <NavLink href="/">Components</NavLink>
      </NavItem>
      <NavItem>
      <NavLink href="/">GitHub</NavLink>
      </NavItem>
      </Nav>
      </Collapse>
      </Navbar>
      </Col>
      </Row>
      <Row form>
      <Col sm="12" md="10" lg={{size : "auto"}} className="m-auto">
      <Form>
      <FormGroup>
      <Label for="exampleText">Username : </Label>
      {user}
      <FormFeedback>invalid name</FormFeedback> 
      </FormGroup>
      <FormGroup>
      <Label for="exampleText">Password</Label>
      {pass}
      <FormFeedback>invalid password</FormFeedback> 
      </FormGroup>
      <Button outline color="success" block onClick={this.toogleModel.bind(this,true)}>Submit</Button>
      </Form>
      </Col>
      </Row>
      <div className="row justify-content-center" style={{marginTop : "20px"}}>
      <Col xs="6">
      <Button outline color="primary" block onClick={this.toggleCards}>Show All</Button>
      </Col>
      </div>
      </Container>
      <Container fluid>
      <Row>
      {cardsview}
      </Row>
      </Container>
      {modelview}
      </div>
    );
  }
}

export default App;
