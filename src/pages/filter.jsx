import React, { Component } from "react";
import { Dropdown} from 'semantic-ui-react';
class Filterp extends Component
{
    constructor(props)
    {
        super(props);
    }
    Options = [
        { icon:"arrow down", key: 'lowest', value: 'lowest', text: 'Lowest to Highest'},
        { icon:"arrow up",key: 'highest', value: 'highest', text: 'Highest to Lowest' },
        { key: 'asc', value: 'asc', text: 'Ascending By Name'},
        { key: 'des', value: 'des', text: 'Descending By Name'}
      ]
    render()
    {
        return(
            <>
            <div className="filter1" style={{display:"flex",alignItems:"center"}}><span style={{width:"34%"}}>Order By :</span> 
            <Dropdown placeholder='Select' fluid selection clearable options={this.Options} value={this.props.sort} onChange={this.props.sortProducts}/></div>
            </>
        )
    }
}

export default Filterp;