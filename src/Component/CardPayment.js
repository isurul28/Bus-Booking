import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CardPayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Total: this.props.location.Total,
            Date : this/props.location.Date,
            REACT_APP_EMAILJS_USERID: 'user_17Y3yksLiJyYnOXq04djD',
            templateId: 'template_IldEFUEB',
            receiverEmail: '',
            formSubmitted: false,
            feedback: 'Test'
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.sendFeedback = this.sendFeedback.bind(this);
        this.addPaymentDetails = this.addPaymentDetails.bind(this);
    }

    onSubmit(event) {

        event.preventDefault();

        const feedback = {
            fname: this.refs.fname.value,
            lname: this.refs.lname.value,
            email: this.refs.email.value,
            postcode: this.refs.postcode.value,
            cost: this.props.location.Total
        }
        
        

        const { templateId, receiverEmail } = this.state;
        
        console.log(feedback, 'onSubmit')
        

            this.sendFeedback(
                templateId,
                this.sender,
                this.refs.email.value,
                this.state.feedback,
                this.refs.lname.value,
                this.refs.fname.value,
                feedback.cost
                


            );

            this.setState({
                formSubmitted: true
            });
            
            this.addPaymentDetails(feedback);
        
    }
    
    
    sendFeedback(templateId, senderEmail, receiverEmail, feedback,lname,fname,cost,Date) {
        window.emailjs
            .send('mailgun', templateId, {
                senderEmail,
                receiverEmail,
                feedback,
                lname,
                fname,
                cost,
                Date
                
                
            })
            .then(res => {
                console.log('MAIL SENT!')
                this.setState({
                    formEmailSent: true
                });
            })
            // Handle errors here however you like
            .catch(err => console.error('Failed to send feedback. Error: ', err));
    }

    addPaymentDetails(userdetail) {
        
        
           
        
    }

    render() {


        const { Total } = this.state;




        return (
            <div>

                <br />



                <div className="row">

                    <form id="myform" className="col s12" onSubmit={this.onSubmit}>
                        <Link className="btn green darken-3" to="/booklist">Back</Link>
                        <ul className="collection">
                            <li className="collection-item"><h5>Enter Card Details</h5></li>
                            <li className="collection-item">

                                <div className="input-field col s6">
                                    <i className="material-icons prefix">face</i>
                                    <input id="firstname" type="text" className="validate" ref="fname" required />
                                    <label htmlFor="first_name">Frist Name</label>

                                </div>
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">face</i>
                                    <input id="lastname" type="text" className="validate" ref="lname" name="lname" required />
                                    <label htmlFor="last_name">Last Name</label>

                                </div>


                                <div className="input-field col s6">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="email" className="validate" ref="email" required />
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="input-field col s6">
                                    <i className="material-icons prefix">room</i>
                                    <input id="postalcode" type="number" className="validate" ref="postcode"  required onInput={(e)=>{ 
                                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)}} min={5} />
                                    <label htmlFor="postalcode">Postal Code</label>

                                </div>

                                <div className="input-field col s6">
                                    <i className="material-icons prefix">credit_card</i>
                                    <input id="card_number" type="number" className="validate" required onInput={(e)=>{ 
                                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}} min={10}  />
                                    <label htmlFor="card_number">Card Number</label>

                                </div>

                                <div className="input-field col s6">
                                    <i className="material-icons prefix">payment</i>
                                    <input id="cvc" type="number" className="validate" required onInput={(e)=>{ 
                                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)}} min={3} />
                                    <label htmlFor="cvc">CVC</label>

                                </div>





                                <div className="input-field col s12">

                                    <input disabled value={"Your Total : " + Total + " LKR"} id="disabled" name="cost" type="text" className="validate" />

                                </div>
                            </li>

                        </ul>
                        <input type="submit" className="btn green" value="Confrim" />






                    </form>
                </div>

            </div>
        )
    }
}



export default CardPayment;
