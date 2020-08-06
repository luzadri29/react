import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';



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

    function RenderComments({dishcomments}){
        
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
                            <RenderComments dishcomments={props.comments}/>
                         </div>    
                    </div>
                </div>
        }
        return(el);
     
    }

export default DishDetail;