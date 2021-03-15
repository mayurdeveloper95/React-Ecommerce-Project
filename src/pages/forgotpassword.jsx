import React,{Component} from "react";
import { Button,Form, Header } from 'semantic-ui-react';
import SimpleReactValidator from "simple-react-validator";
import {ForgotPasswordAction} from "../actions/user";
import {connect} from "react-redux";
import Loading from "../components/loader";
import {Link} from "react-router-dom";

class ForgotPassword extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
                email:"",
                loading: false
            };
        this.validator = new SimpleReactValidator({autoForceUpdate:this});
    }

    handleFormSubmit = e => {
        e.preventDefault();
        if (this.validator.allValid()) {
          let data = {
             email: this.state.email
          };
          this.props.ForgotPasswordAction(data);
          this.toggleLoading();
        } 
        else {
          this.forceUpdate();
          this.validator.showMessages();
        }
      };

      handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

      toggleLoading = () => {
        this.setState({ loading: true });

        setTimeout(() => {
          this.setState({ loading: false });
        }, 1000);
      }

    render()
    {
        const { loading } = this.state;
        return(
            <>
                <div className="ui stacked segment">
                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Input icon='user' iconPosition='left' placeholder='Enter EmailId'
                  required name="email"
                  value={this.state.email}
                  onChange={this.handleInput} />
                        {
                            this.validator.message('email',this.state.email,'required|email')
                        }
    
                    <Button type='submit' fluid onClick={this.handleFormSubmit} disabled={loading}>
                   {loading && !this.props.forgot.error &&(<Loading style={{ marginRight: "5px" }}/>)}
                    {!loading && <span>Submit</span>}
                    </Button>
                </Form>
                <Header as='h3' icon textAlign='center'>
                {
                    this.props.forgot.error?
                        <div className="ui error message">
                        {this.props.forgot.error}
                        </div>
                        :""
                }
                </Header>
                </div>

                <Header as='h2' icon textAlign='center'>
                {
                    this.props.forgot.forgot?
                        <div className="ui error message">
                        {this.props.forgot.forgot.message}
                        </div>
                        :""
                }
                </Header>
                <Button content='BACK' icon='left arrow' labelPosition='left' floated='right' as={Link} to="/login"/>          
                </>
        )
    }
}

const mapStateToProps=(state)=>
{
//console.log(state);
return ({forgot:state.forgot});
}

export default connect(mapStateToProps,{ForgotPasswordAction})(ForgotPassword);