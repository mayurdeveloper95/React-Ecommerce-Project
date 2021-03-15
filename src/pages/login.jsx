import React,{Component} from "react";
import { Button, Icon, Form, Header } from 'semantic-ui-react';
import SimpleReactValidator from "simple-react-validator";
import {LoginAction} from "../actions/user";
import {connect} from "react-redux";
import Loading from "../components/loader";
import {Link} from "react-router-dom";

class Loginp extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
                email:"",
                password:"",
                loading: false
            };
        this.validator = new SimpleReactValidator({autoForceUpdate:this});
    }


    handleFormSubmit = e => {
        e.preventDefault();
        if (this.validator.allValid()) {
          let data = {
             email: this.state.email,
              password: this.state.password
          };
          //console.log(data);
          this.props.LoginAction(data);
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
        }, 3000);
      }

    render()
    {
        const { loading } = this.state;
        return(
            <>
                <div className="ui stacked segment">
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Field>
                        <div className="ui fluid left icon input">
                            <input placeholder='Enter EmailId' required name="email"
                            value={this.state.email}
                            onChange={this.handleInput}/>
                            <Icon fitted name='user' />
                        </div>
                        {
                            this.validator.message('email',this.state.email,'required|email')
                        }
                    </Form.Field>
                    <Form.Field>
                        <div className="ui fluid left icon input">
                            <input placeholder='Enter Password' type='password' required name="password"
                            value={this.state.password}
                            onChange={this.handleInput}/>
                            <Icon fitted name='lock' />
                        </div>
                        {
                            this.validator.message('password',this.state.password,'required|min:8|max:25')
                        }
                    </Form.Field>

                    <Header as='h4' icon textAlign='right' style={{margin:"0px 0px 15px 0px"}}>
                        <Link to="/forgotpassword" style={{color:"blue"}}>Forgot Password</Link>
                    </Header>

                    <Button type='submit' fluid onClick={this.handleFormSubmit} disabled={loading}>
                    {loading && !this.props.login.error &&(<Loading style={{ marginRight: "5px" }}/>)}
                    {!loading && <span>Submit</span>}
                    </Button>
                </Form>

            
                <Header as='h3' icon textAlign='center'>
                {
                    this.props.login.error?
                        <div className="ui error message">
                        {this.props.login.error}
                        </div>
                        :""
                }
                </Header>
                </div>
                <Header as='h4' icon textAlign='center'>
                New to us? <Link to="/signup" style={{color:"white"}}>Sign Up</Link>
                </Header>
            </>
        )
    }
}

const mapStateToProps=(state)=>
{
//console.log(state);
return ({login:state.login});
}

export default connect(mapStateToProps,{LoginAction})(Loginp);