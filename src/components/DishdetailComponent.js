import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props){
        super(props);
        this.state = {   
            
        }
    }

    renderDish(dish){
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

    renderComments(dishcomments){
        
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
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    render(){

        let el = <div></div>;


        if(this.props.dish){
            el = <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                         </div>
                         <div className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.dish.comments)}
                         </div>    
                    </div>
                </div>
        }
        return(el);
     
    }
}

export default DishDetail;