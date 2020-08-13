import  React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb,
     Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    
        render(){
            return(
                <>
                <div className="submitcomment">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                </div>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col>
                                <Control.select id="rating" name="rating" model=".rating" className="control-form col-12">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your Name</Label>
                            <Col>
                                <Control.text id="author" name="author" model=".author" className="form-control col-12"
                                validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                <Errors className="text-danger" model=".author" show="touched"
                                                messages={{
                                                    required:'Required ',
                                                    minLength: 'Must be greater than 2 characters ',
                                                    maxLength: 'Must be 15 characters or less '
                                                }}/>
                            </Col>
                            
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea name="comment" model=".comment" id="comment" 
                                           row="12" className="form-control" />
                            </Col>
          
                        </Row>
                        <Row className="form-group">
                                    <Col md={12}>
                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
            );
        }
    }

    function RenderDish({dish}){
        console.log('renderdis', dish);
        if(dish != null){
            return(
                <Card>
                    <CardImg src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>  
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    function RenderComments({dishcomments, addComment, dishId}){
        
        const detailComments = dishcomments.map((comment) => {
            return(
                <ul className="list-unstyled" key={comment.id}>
                    <li className="mb-1">{comment.comment}</li>
                    <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                </ul>
            );
        });

        if(dishcomments !== null){
            return(
                <div className="comments">
                    <div className="header">
                        <h4>Comments</h4>
                    </div>
                    <div className="comment">
                       {detailComments}
                    </div>
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {

        let el = <div></div>;


        if(props.dish){
            el = <div className="container">
                <div className="row"> 
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                         </div>
                         <div className="col-12 col-md-5 m-1">
                            <RenderComments dishcomments={props.comments}
                            addComment={props.addComment} dishId={props.dish.id}/>
                         </div>    
                    </div>
                </div>
        }
        return(el);
     
    }


export default DishDetail;
