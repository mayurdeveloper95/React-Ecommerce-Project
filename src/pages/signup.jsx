import React,{Component} from "react";
import { Button, Form, Header, Checkbox} from 'semantic-ui-react';
import SimpleReactValidator from "simple-react-validator";
import {SignupAction} from "../actions/user";
import {connect} from "react-redux";
import Loading from "../components/loader";
import {Link} from "react-router-dom";
import {history} from "../shared/helper/history";

class Signp extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
                firstname:"",
                lastname:"",
                email:"",
                password:"",
                termsAcceptCheck:false,
                loading: false
            };
        this.validator = new SimpleReactValidator({autoForceUpdate:this});
    }


    handleFormSubmit = e => {
        e.preventDefault();
        if (this.validator.allValid()) {
          let data = {
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                termsAcceptCheck:this.state.termsAcceptCheck
          };
          //console.log(data);
          this.props.SignupAction(data);
          setTimeout(() => {
            history.push("/login");
            window.location.reload();
          }, 2500);
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

      handleChange= e =>{
        this.setState({termsAcceptCheck:!this.state.termsAcceptCheck});
    }

      toggleLoading = () => {
        this.setState({ loading: true });

        setTimeout(() => {
          this.setState({ loading: false });
        }, 2000);
      }

    render()
    {
        const { loading } = this.state;
        return(
            <>
                <div className="ui stacked segment">
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input fluid
                        id='form-subcomponent-shorthand-input-first-name'
                        label='First name'
                        placeholder='First name'
                        required name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleInput}
                        />
                        {
                            this.validator.message('firstname',this.state.firstname,'required|min:5|string')
                        } 
                    </Form.Field> 
                    <Form.Field>
                        <Form.Input fluid
                        id='form-subcomponent-shorthand-input-last-name'
                        label='Last name'
                        placeholder='Last name'
                        required name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleInput}
                        />
                        {
                            this.validator.message('lastname',this.state.lastname,'required|min:5|string')
                        }
                    </Form.Field> 
                    </Form.Group>
                    <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input fluid
                        id='form-subcomponent-shorthand-input-email'
                        label='Email'
                        placeholder='Enter your email id'
                        required name="email"
                        value={this.state.email}
                        onChange={this.handleInput}
                        />
                        {
                            this.validator.message('email',this.state.email,'required|email')
                        }
                    </Form.Field>
                    <Form.Field>
                        <Form.Input fluid
                        id='form-subcomponent-shorthand-input-password'
                        label='Password'
                        placeholder='Enter Password'
                        type="password"
                        required name="password"
                        value={this.state.password}
                        onChange={this.handleInput}
                        />
                        {
                            this.validator.message('password',this.state.password,'required|min:8|max:25')
                        }
                    </Form.Field>
                    </Form.Group>
                    <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' onChange={this.handleChange}
                     defaultChecked={this.state.termsAcceptCheck}/>
                     {
                            this.validator.message('termsAcceptCheck',this.state.termsAcceptCheck,'required')
                        }
                    </Form.Field>

                    <Button type='submit' fluid onClick={this.handleFormSubmit} disabled={loading}>
                    {loading && !this.props.signup.error &&(<Loading style={{ marginRight: "5px" }}/>)}
                    {!loading && <span>Submit</span>}
                    </Button>
                </Form>

            
                <Header as='h3' icon textAlign='center'>
                {
                    this.props.signup.error?
                        <div className="ui error message">
                        {this.props.signup.error}
                        </div>
                        :""
                }
                </Header>

                <Header as='h3' icon textAlign='center'>
                {
                    this.props.signup.message?
                        <div className="ui error message">
                        {this.props.signup.message}
                        </div>
                        :""
                }
                </Header>

                </div>
                <Header as='h4' icon textAlign='center'>
                Already Registered? <Link to="/login" style={{color:"white"}}>Login Here</Link>
                </Header>
                <Header as='h3' icon textAlign='center'>
                <Link to="/" style={{color:"white"}}>Visit our Home page to view Products </Link>
                </Header>
            </>
        )
    }
}

const mapStateToProps=(state)=>
{
//console.log(state);
return ({signup:state.signup});
}

export default connect(mapStateToProps,{SignupAction})(Signp);