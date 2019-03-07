import React from "react";

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            email: ''
        }
    }
    handleEmail=(event)=>{
        this.setState({
            email: event.target.value
        })
    }

    render(){
        return(
            <body>
                <h1>Email : {this.state.email}</h1>
                <input type="email" name="email" onChange={this.handleEmail}  />
            </body>
        )
    }

}
export default SignUp;