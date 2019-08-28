import React from 'react';
import { Card , CardBody , CardText , CardTitle , Button , Col } from 'reactstrap';

const PersonCards = (props) => {
    return (
    <Col xs = "12" sm="6"  lg="3" style={{marginTop : "20px"}}>
        <Card>
            <CardBody>
            <CardTitle>Person {props.index+1}</CardTitle>
            <CardText>Username : {props.children} <br/> Password : {props.pass}</CardText>
            <Button outline color="primary" block onClick={props.handler}>Delete</Button>
            </CardBody>
        </Card>
    </Col>
    );
}
 
export default PersonCards;