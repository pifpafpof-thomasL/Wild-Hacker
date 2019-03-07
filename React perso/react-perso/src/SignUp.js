import React from "react";
import './style.css'

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: '',
            name:'',
            lastname:'',
            confirm:  '',
            valeur : []
        }
    }

    handleClick=(e)=>{
        const {email, password, name, lastname , confirm} = this.state
        e.preventDefault();

        let stateVal = []
        stateVal.push(email, password, name , lastname)

        if( password ===  confirm) {
            let jsonTab = []
            jsonTab.push(JSON.stringify(stateVal, 1,1))
    
            this.setState({
                valeur : jsonTab
            })
        }else{
            throw new Error('Different password manip ')
        }


    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            valeur: 0,
        })
    }


    render(){
        console.log(this.tab)
        return(
            <div>

                <form onSubmit={this.handleClick}  className="json">
                    <label htmlFor='email'> email</label> 
                    <input id='email' type="email" name="email"  onChange={this.onChange}/>

                    <label htmlFor='mdp'> mot de passe</label> 
                    <input id='mdp' type="password" name="password" onChange={this.onChange} />

                    <label htmlFor='verif'> Confirmez mot de passe </label> 
                    <input id='verif' type="password" name="confirm" onChange={this.onChange} />

                    <label htmlFor='prenom'> prenom</label> 
                    <input id='prenom' type="text" name="name"onChange={this.onChange} />

                    <label htmlFor='nom'> nom</label> 
                    <input id='nom' type="text" name="lastname" onChange={this.onChange}/>

                    <button> Envoyer </button>

                </form>
                <h1>Resultat : {this.state.valeur} </h1>
            </div>
        )
    }

}
export default SignUp;