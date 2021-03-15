import React,{ Component } from "react";
import HeaderComponent from "../components/headercomponent";
import Footer from "../pages/footer";
import {connect} from "react-redux";
import Productp from "../pages/product";
import {AllProductsAction,PaginationProductAction} from "../actions/product";
import Loading from "../components/loader";
import {Grid,Container,Pagination} from 'semantic-ui-react';
import Filter from "../pages/filter";
import "./css/pagination.css";
class Products extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            search:"",
            sort:""
        };
    }

    componentDidMount()
    {
        this.props.AllProductsAction();
        //this.props.PaginationProductAction(1);
    }

    searchSpace=(e)=>{
        this.setState({search:e.target.value})
    }

   sortProducts=(event,data)=>
      {
        const sort=data.value;
        this.setState({
          sort:sort,
          products:this.props.prod.sort((a,b)=>
          (
              sort === "lowest" 
              ?
              a.price > b.price
              ? 1
              : -1
              : sort === "highest" 
              ?
              a.price < b.price
              ? 1
              : -1
              : sort === "asc"
              ?
              a.pname > b.pname
              ? 1
              : -1
              : sort === "des"
              ? 
              a.pname < b.pname
              ? 1
              : -1
              : a._id > b._id 
              ? 1
              :-1
          ))
      })
      }

render()
{
    if(!this.props.prod)
    {
        <Loading style={{ marginRight: "5px" }}/>
        return null;
    }

    return(
        <>
        <HeaderComponent/>
        <Container style={{marginTop:"20px",paddingBottom:"80px"}}>
        <Grid columns={4}>
                <Grid.Row style={{marginBottom:"10px"}}>
                <Grid.Column  width={11}>
                <div className="ui search" >
                    <div className="ui icon input" style={{width:"100%"}}>
                        <input className="prompt" type="text" placeholder="Search Product..."
                        onChange={(e)=>this.searchSpace(e)} 
                        />
                        <i className="search icon"></i>
                    </div>
                </div>
            </Grid.Column>
            <Grid.Column width={5}>
                <Filter sort={this.state.sort}
                    sortProducts={this.sortProducts}/> 
            </Grid.Column>
            </Grid.Row>
                <Grid.Row>
                    {
                        this.props.prod.filter((data)=>{
                            if(this.state.search === "") 
                            return data
                            else if (data.pname.toLowerCase().includes(this.state.search.toLowerCase()))
                            return data
                        }).map((data)=>(
                            <>
                            <Grid.Column mobile={8} tablet={4} computer={4}>
                            <Productp pdata={data} {...this.props} handleChange={this.handleChange}/>
                            </Grid.Column>
                            </>
                        ))
                    }     
                </Grid.Row>
                {/*<Grid.Row style={{justifyContent:"center",marginBottom:"30px"}}>
                    <Pagination totalPages={5} center="true"/>
                </Grid.Row>*/}
            </Grid>
        </Container>
        <Footer/>
        </>
    )
}
}

const mapStateToProps=(state)=>
{
    console.log(state);
    return{prod:state.allproduct,pagi:state.productpagination}
}

export default connect(mapStateToProps,{AllProductsAction,PaginationProductAction})(Products);