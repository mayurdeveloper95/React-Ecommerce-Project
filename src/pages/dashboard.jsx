import React, { Component } from "react";
import {Button, Divider,Grid,Header,Icon,Input,Image,Menu,Table,Tab, GridRow,Confirm, Form, Checkbox} from "semantic-ui-react";
import "./css/dashboard.css";
import {Link} from "react-router-dom";
import {LogoutAction,AllUserAction,DeleteUserAction,SignupAction} from "../actions/user";
import {AllProductsAction,DeleteProductAction,AddProductAction,AllCheckoutCartAction} from "../actions/product";
import {connect} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {history} from "../shared/helper/history";
import {Line,Pie} from 'react-chartjs-2';

class Designdashboard extends Component {

  constructor(props)
    {
        super(props);
        this.state={
                firstname:"",
                lastname:"",
                email:"",
                password:"",
                termsAcceptCheck:false,
                pname:"",
                imagepic:"",
                description:"",
                manufacturer:"",
                dimensions:"",
                netquantity:'',
                weight: '',
                price:'',
                stocks: '',
                offerPrice:0,
                isAvailable:false,
                isTodayOffer:false,
                categoryId:"",
                data : {
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: 'rgba(75,192,192,0.4)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: 'rgba(75,192,192,1)',
                      pointBackgroundColor: '#fff',
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: [65, 59, 80, 81, 56, 55, 40]
                    }
                  ]
              },

              data2 : {
                labels: ['January', 'February', 'March',
                         'April', 'May'],
                datasets: [
                  {
                    label: 'Rainfall',
                    backgroundColor: [
                      '#B21F00',
                      '#C9DE00',
                      '#2FDE00',
                      '#00A6B4',
                      '#6800B4'
                    ],
                    hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F'
                    ],
                    data: [65, 59, 80, 81, 56]
                  }
                ]
              }
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
        this.props.SignupAction(data);
        setTimeout(() => {
          history.push("/dashboard");
          window.location.reload();
        }, 2500);
      } 
      else {
        this.forceUpdate();
        this.validator.showMessages();
      }
    };

    handleFormProductSubmit = e => {
      e.preventDefault();
      if (this.validator.allValid()) {
        let data = {
            pname:this.state.pname,
            imagepic:this.state.imagepic,
            description:this.state.description,
            manufacturer:this.state.manufacturer,
            dimensions:this.state.dimensions,
            netquantity:parseInt(this.state.netquantity),
            weight: parseFloat(this.state.weight),
            price:parseInt(this.state.price),
            stocks: parseInt(this.state.stocks),
            offerPrice:parseInt(this.state.offerPrice),
            isAvailable:this.state.isAvailable,
            isTodayOffer:this.state.isTodayOffer,
            categoryId:this.state.categoryId,
        };
        //console.log("INSERT DATA",data);
        /*let offprice = (data.offerPrice === 'NaN') 
        ?
        delete data.offerPrice
        :
        parseInt(data.offerPrice)
        console.log("OFF",offprice)*/
        //console.log("INSERT DATA",data);

        let d =new FormData();
        d.append('pname',data.pname);
        d.append('imagepic',data.imagepic);
        d.append('description',data.description);
        d.append('manufacturer',data.manufacturer);
        d.append('dimensions',data.dimensions);
        d.append('netquantity',data.netquantity);
        d.append('weight',data.weight);
        d.append('price',data.price);
        d.append('stocks',data.stocks);
        d.append('offerPrice', data.offerPrice);
        d.append('isAvailable',data.isAvailable);
        d.append('isTodayOffer',data.isTodayOffer);
        d.append('categoryId',data.categoryId);
        
        this.props.AddProductAction(d);
        setTimeout(() => {
          history.push("/dashboard");
          window.location.reload();
        }, 2500);
      } 
      else {
        this.forceUpdate();
        this.validator.showMessages();
      }
    };

    fileChange = e => {
      this.setState({ imagepic: e.target.files[0] });
    };

    handleInput = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    handleChange= e =>{
      this.setState({termsAcceptCheck:!this.state.termsAcceptCheck});
  }

  handleChanges= e =>{
    this.setState({isAvailable:!this.state.isAvailable});
  }

  handleChanges1= e =>{
    this.setState({isTodayOffer:!this.state.isTodayOffer});
  }

  state = { open: false }

  show = () => this.setState({ open: true })
  show1 = () => this.setState({ open: true })
  handleConfirm = () => this.setState({ open: false })
  handleCancel = () => this.setState({ open: false })

  componentDidMount()
  {
    this.props.AllUserAction();
    this.props.AllProductsAction();
    this.props.AllCheckoutCartAction();
  }

  deleteuser=(id)=>
  {
    if(window.confirm("Are you Sure?"))
    {
      this.props.DeleteUserAction(id);
    }
  }

  deleteproduct=(id)=>
  {
    if(window.confirm("Are you Sure?"))
    {
      this.props.DeleteProductAction(id);
    }
  }


  state = {
    dropdownMenuStyle: {
      display: "none"
    }
  };

  formatCurrency=(value)=>{
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'narrowSymbol' }).format(value).replace(/^(\D+)/, '$1 ');
  }

  formatDescription=(value)=>{
    if(!value){return null;}
    return value.substring(0,40)+"...";
  }

  handleToggleDropdownMenu = () => {
    let newState = Object.assign({}, this.state);
    if (newState.dropdownMenuStyle.display === "none") {
      newState.dropdownMenuStyle = { display: "flex" };
    } else {
      newState.dropdownMenuStyle = { display: "none" };
    }

    this.setState(newState);
  };

  panes = [
    { menuItem: { icon: 'dashboard',key: 'Dashboard', content: 'Dashboard'}, render: () => <Tab.Pane>
      <Grid padded>
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  Dashboard
                </Header>
              </Grid.Row>
              <Grid.Row textAlign="center">
                <Grid.Column mobile={8} tablet={8} computer={8}>
                <Line ref="chart" data={this.state.data} />
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                <Pie
                data={this.state.data2}
                options={{
                legend:{
                display:true,
                position:'right'
              }
              }}
              />
                </Grid.Column>
               
              </Grid.Row>
              <Divider section hidden />
            </Grid>
      </Tab.Pane> },


    { menuItem: { icon: 'users',key: 'Users', content: 'Users'}, render: () => <Tab.Pane>
      <Grid padded>
        <Grid.Row>
            <Header dividing size="huge" as="h1">All Users</Header>
          </Grid.Row>
          <Grid.Column floated='left' width={3} verticalAlign="middle">
          <Header size="small" >Total Users : {this.props.user.length}</Header>
          </Grid.Column>
          <Grid.Column floated='right' width={3}>
          <Button primary content='Add User' icon='user' labelPosition='left' onClick={this.show} float="right"/>
          </Grid.Column>
        
          <Confirm
          open={this.state.open}
          content={<>
          <Form onSubmit={this.handleFormSubmit} style={{margin:"30px 40px 0px 40px"}}>
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
                    </Form.Field>
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
          </>
          }
          onCancel={this.handleCancel}
          onConfirm={this.handleFormSubmit}
          confirmButton="Add User"
        />
         
          <Grid.Row>
              <Table singleLine striped selectable unstackable >
                <Table.Header>
                  <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Record Date</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                  <Table.Body>
                      {
                        this.props.user?this.props.user.map(data=>(
                        <Table.Row key={data._id}>
                        <Table.Cell ><Image circular src={data.profilepic} size='large' style={{width:"50px",height:"50px" }}/></Table.Cell>
                        <Table.Cell >{data.firstname}</Table.Cell>
                        <Table.Cell>{data.lastname}</Table.Cell>
                        <Table.Cell>{data.email}</Table.Cell>
                        <Table.Cell>{data.address}</Table.Cell>
                        <Table.Cell>{data.recordDate}</Table.Cell>
                        <Table.Cell textAlign='center'><Icon name='trash alternate' color="violet" size="large" onClick={()=>this.deleteuser(data._id)} style={{cursor:"pointer"}}/></Table.Cell>
                      </Table.Row>
                        )):null
                      
    }
                    </Table.Body>
                  </Table>
                </Grid.Row>
                </Grid>
    </Tab.Pane> },
    
    { menuItem: { icon: 'cart',key: 'Products', content: 'Products'}, render: () => <Tab.Pane>
    <Grid padded>
      <Grid.Row>
          <Header dividing size="huge" as="h1">All Products</Header>
        </Grid.Row>
        <Grid.Column floated='left' width={3} verticalAlign="middle">
        <Header size="small" >Total Products : {this.props.Products.length}</Header>
        </Grid.Column>
        <Grid.Column floated='right' width={3}>
        <Button primary content='Add Product' icon='cart' labelPosition='left' onClick={this.show1} float="right"/>
        </Grid.Column>
      
        <Confirm
        open={this.state.open}
        content={<>
        <Form onSubmit={this.handleFormProductSubmit} style={{margin:"30px 40px 0px 40px"}}>
                  <Form.Group widths='equal'>
                  <Form.Field>
                      <Form.Input 
                      label='Product Name'
                      placeholder='Product Name'
                      required 
                      name="pname"
                      value={this.state.pname}
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('pname',this.state.pname,'required|min:5|string')
                      } 
                  </Form.Field> 
                  <Form.Field>
                      <Form.TextArea 
                      label='Description'
                      placeholder='Description'
                      required 
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('description',this.state.description,'required|min:5|string')
                      }
                  </Form.Field> 
                  </Form.Group>
                  <Form.Group widths='equal'>
                  <Form.Field>
                      <Form.Input
                      label='Manufacturer'
                      placeholder='Enter Manufacturer'
                      required 
                      name="manufacturer"
                      value={this.state.manufacturer}
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('manufacturer',this.state.manufacturer,'min:5|string')
                      }
                  </Form.Field>
                  <Form.Field>
                      <Form.Input
                      label='Dimensions'
                      placeholder='Enter Dimensions'
                      name="dimensions"
                      value={this.state.dimensions}
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('dimensions',this.state.dimensions,'min:5|string')
                      }
                  </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal'>
                  <Form.Field>
                      <Form.Input 
                      label='Net Quantity'
                      placeholder='Enter Net Quantity'
                      required name="netquantity"
                      type="number"
                      value={this.state.netquantity}
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('netquantity',this.state.netquantity,'required|numeric')
                      }
                  </Form.Field>
                  <Form.Field>
                      <Form.Input 
                      label='Weight'
                      placeholder='Enter Weight'
                      name="weight"
                      value={this.state.weight}
                      type="number"
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('weight',this.state.weight,'numeric')
                      }
                  </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal'>
                  <Form.Field>
                      <Form.Input 
                      label='Price'
                      placeholder='Enter Price'
                      required name="price"
                      type="number"
                      value={this.state.price}
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('price',this.state.price,'required|numeric')
                      }
                  </Form.Field>
                  <Form.Field>
                      <Form.Input 
                      label='Stocks'
                      placeholder='Enter Stocks'
                      name="stocks"
                      value={this.state.stocks}
                      type="number"
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('stocks',this.state.stocks,'required|min:1|numeric')
                      }
                  </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal'>
                  <Form.Field>
                      <Form.Input 
                      label='Offer Price'
                      placeholder='Enter Offer Price'
                      name="offerPrice"
                      type="number"
                      value={this.state.offerPrice}
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('offerPrice',this.state.offerprice,'numeric')
                      }
                  </Form.Field>
                  <Form.Field>
                      <Form.Input 
                      label='Category Id'
                      placeholder='Enter CategoryId'
                      required name="categoryId"
                      value={this.state.categoryId}
                      onChange={this.handleInput}
                      />
                      {
                          this.validator.message('categoryId',this.state.categoryId,'required')
                      }
                  </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal'>
                  <Form.Field>
                  <Checkbox label='Available?' onChange={this.handleChanges}
                     defaultChecked={this.state.isAvailable} required/>
                      
                  </Form.Field>
                  <Form.Field>
                  <Checkbox label='Today Offer?' onChange={this.handleChanges1}
                     defaultChecked={this.state.isTodayOffer} required/>
                      
                  </Form.Field>
                  </Form.Group>

                  <Form.Field>
                  <h4>Product Image</h4>
                  <input
                  type="file"
                  icon="file"
                  onChange={this.fileChange}
                />
                  </Form.Field>
                  
              </Form>
              <Header as='h3' icon textAlign='center'>
              {
                  this.props.aproduct.error?
                      <div className="ui error message">
                      {this.props.aproduct.error}
                      </div>
                      :""
              }
              </Header>

              <Header as='h3' icon textAlign='center'>
              {
                  this.props.aproduct.message?
                      <div className="ui error message">
                      {this.props.aproduct.message}
                      </div>
                      :""
              }
              </Header>
        </>
        }
        onCancel={this.handleCancel}
        onConfirm={this.handleFormProductSubmit}
        confirmButton="Add Product"
      />
      
        <Grid.Row>
            <Table singleLine striped selectable unstackable >
              <Table.Header>
                <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Product Price</Table.HeaderCell>
                  <Table.HeaderCell>Stocks</Table.HeaderCell>
                  <Table.HeaderCell>Record Date</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
                <Table.Body>
                    {
                      this.props.Products?this.props.Products.map(data=>(
                      <Table.Row key={data._id}>
                      <Table.Cell ><Image src={data.imagepic} size='large' style={{width:"50px",height:"50px" }}/></Table.Cell>
                      <Table.Cell >{this.formatDescription(data.pname)}</Table.Cell>
                      <Table.Cell>{this.formatCurrency(data.price)}</Table.Cell>
                      <Table.Cell>{data.stocks}</Table.Cell>
                      <Table.Cell>{data.recordDate}</Table.Cell>
                      <Table.Cell textAlign='center'><Icon name='trash alternate' color="violet" size="large" onClick={()=>this.deleteproduct(data._id)} style={{cursor:"pointer"}}/></Table.Cell>
                    </Table.Row>
                      )):null
                    
  }
                  </Table.Body>
                </Table>
              </Grid.Row>
              </Grid>
  </Tab.Pane> },

{ menuItem: { icon: 'shopping bag',key: 'All Orders', content: 'All Orders'}, render: () => <Tab.Pane>
<Grid padded>
  <Grid.Row>
      <Header dividing size="huge" as="h1">All Orders</Header>
    </Grid.Row>
    <Grid.Column floated='left' width={3} verticalAlign="middle">
    <Header size="small" >Total Orders: {this.props.allcheck.length}</Header>
    </Grid.Column>
   
    <Grid.Row>
        <Table singleLine striped selectable unstackable >
        <Table.Header>
                 <Table.Row>
                   <Table.HeaderCell style={{fontWeight:"600"}}>#Order ID</Table.HeaderCell>
                   <Table.HeaderCell style={{fontWeight:"600"}}>User Email</Table.HeaderCell>
                   <Table.HeaderCell style={{fontWeight:"600"}}>Address</Table.HeaderCell>
                   <Table.HeaderCell style={{fontWeight:"600"}}>Payment</Table.HeaderCell>
                   <Table.HeaderCell style={{fontWeight:"600"}}>Paid</Table.HeaderCell>
                   <Table.HeaderCell style={{fontWeight:"600"}}>Delivered</Table.HeaderCell>
                 </Table.Row>
               </Table.Header>
               <Table.Body>
                   {
                       this.props.allcheck.message ? <h2>{this.props.allcheck.message}</h2> :
                       this.props.allcheck.map((data)=>
                       {
                        return(
                           <Table.Row key={data._id}>
                           <Table.Cell>{data._id}</Table.Cell>
                           <Table.Cell>{data.userEmail}</Table.Cell>
                           <Table.Cell>{data.address}</Table.Cell>
                           <Table.Cell>{data.paymentMethod}</Table.Cell>
                           <Table.Cell>{data.isPaid===true? "Amount Paid": "Payment Pending"}</Table.Cell>
                           <Table.Cell>{data.isDelivered ===true? "Order Recived" :"Processing"}</Table.Cell>
                       </Table.Row>
                        )
                        })
                   }  
               </Table.Body>
            </Table>
          </Grid.Row>
          </Grid>
</Tab.Pane> },

  ]

  render() {
    
    return (
      <div className="App">
        <Grid padded className="tablet computer only">
          <Menu borderless inverted fluid fixed="top">
            <Menu.Item header>
              <img src='https://react.semantic-ui.com/logo.png' />
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Input placeholder="Search..." size="small" />
              </Menu.Item>
              <Menu.Item as={Link} to="/home"><Icon name='home' />Home</Menu.Item>
              <Menu.Item as={Link} to="/profile"><Icon name='user circle' />Profile</Menu.Item>
              <Menu.Item onClick={()=>this.props.LogoutAction()}><Icon name='sign-out' />Logout</Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid>
        <Grid padded className="mobile only">
          <Menu borderless inverted fluid fixed="top">
            <Menu.Item header as="a">
              <img src='https://react.semantic-ui.com/logo.png'/>
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  basic
                  inverted
                  icon
                  toggle
                  onClick={this.handleToggleDropdownMenu}
                >
                  <Icon name="content" />
                </Button>
              </Menu.Item>
            </Menu.Menu>
            <Menu
              borderless
              fluid
              inverted
              vertical
              style={this.state.dropdownMenuStyle}
            >
              <Menu.Item as={Link} to="/home"><Icon name='home' />Home</Menu.Item>
              <Menu.Item as={Link} to="/profile"><Icon name='user circle' />Profile</Menu.Item>
              <Menu.Item onClick={()=>this.props.LogoutAction()}><Icon name='sign-out' />Logout</Menu.Item>
              <Divider fitted />
              <Menu.Item>
                <Input placeholder="Search..." size="small" />
              </Menu.Item>
            </Menu>
          </Menu>
        </Grid>


        <div className="App">
            <Tab
            menu={{fluid: true, vertical: true }}
            menuPosition='left'
            grid={{paneWidth: 13, tabWidth: 3}}
            panes={this.panes}
  />
          </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>
{
  console.log(state);
  return {user:state.alluser,signup:state.signup,Products:state.allproduct,
    aproduct:state.addproduct,allcheck:state.allcheckout};
}

export default connect(mapStateToProps,{AddProductAction,AllUserAction,DeleteProductAction,
  LogoutAction,DeleteUserAction,SignupAction,AllProductsAction,AllCheckoutCartAction})(Designdashboard);

