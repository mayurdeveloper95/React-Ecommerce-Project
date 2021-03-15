import React,{Component} from "react";
import { Button, Icon, Form, Header } from 'semantic-ui-react';
import SimpleReactValidator from "simple-react-validator";
import {ResetPasswordAction} from "../actions/user";
import {connect} from "react-redux";
import Loading from "../components/loader";
import {history} from "../shared/helper/history";

class ResetPassword extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
                password:"",
                loading: false
            };
        this.validator = new SimpleReactValidator({autoForceUpdate:this});
        }

    handleFormSubmit = e => {
        e.preventDefault();
        if (this.validator.allValid()) {
          let data = {
              password: this.state.password
          };
          this.props.ResetPasswordAction(history.location.pathname.split("/")[2],data);
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
                    <Form.Input type="password" icon='lock' iconPosition='left' placeholder='Enter Password'
                    required name="email"
                    value={this.state.password}
                    onChange={this.handleInput} />
                        {
                            this.validator.message('password',this.state.password,'required|min:8|max:25')
                        }

                    <Button type='submit' fluid onClick={this.handleFormSubmit} disabled={loading}>
                    {loading && !this.props.reset.error &&(<Loading style={{ marginRight: "5px" }}/>)}
                    {!loading && <span>Submit</span>}
                    </Button>
                </Form>

                <Header as='h3' icon textAlign='center'>
                {
                    this.props.reset.reset?
                        <div className="ui error message">
                        {this.props.reset.reset.message}
                        </div>
                        :""
                }
                </Header>

                <Header as='h3' icon textAlign='center'>
                {
                    this.props.reset.error?
                        <div className="ui error message">
                        {this.props.reset.error}
                        </div>
                        :""
                }
                </Header>
                </div>
            </>
        )
    }
}

const mapStateToProps=(state)=>
{
//console.log(state);
return ({reset:state.reset});
}

export default connect(mapStateToProps,{ResetPasswordAction})(ResetPassword);