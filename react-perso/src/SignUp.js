import React from "react";
import './style.css';
import Swal from 'sweetalert2';
import Logo from './image/logowildhacker.png';


class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            email: '',  
            password: '',
            name:'',
            lastname:'',
            confirm:  '',
            form : false
        }
    }

    handleClick=(e)=>{
        const {email, password, name, lastname , confirm} = this.state;
        e.preventDefault();

        let stateVal = {email, password, name, lastname}


        if( password ===  confirm) {

            fetch('/auth/signup', {
                method: "POST",
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body : JSON.stringify(stateVal),
            })
            .then(res => res.json()) 
            .then(
                res  =>  this.setState({"message":  res.message}),
                err  =>  this.setState({"message":  err.message})
            )

        
        }else{
            Swal.fire({
                confirmButtonColor: "red",
                type: "warning",
                imageUrl: "https://media1.tenor.com/images/5b6c2ca4d6dd12ac628157ae0b7b5e1b/tenor.gif?itemid=5348091",
                text: "Tu t'es loupé dans la saisie du mot de passe !! ",
                confirmButtonText: "<a style='color: white' href='/SignUp'>Essaye encore!</a>"
                });
        }

    }

    onChange = (e) => {
        this.setState({
            form: false,
            [e.target.name]: e.target.value,
        })
    }


    render(){

        const { message } = this.state
        if (this.state.message !== undefined){
            Swal.fire({
                confirmButtonColor: "green",
                type: "success",
                text: message,
                imageUrl:"https://i.pinimg.com/originals/c3/69/56/c36956addcd2debf37b889dfb1d999bc.gif",
                confirmButtonText: "<a style='color: white' href='/'>Back to home</a>"
                });
        }

        return(
        <div>

            <div className='App-header'>
                    <img className='App-logo' src={Logo} alt='' />
            </div>
            <div className="divJson">

                <form onSubmit={this.handleClick}  className="json" >
                    <label htmlFor='email'> email</label> 
                    <input id='email' type="email" name="email"  required   onChange={this.onChange}/>

                    <label htmlFor='mdp'> mot de passe</label> 
                    <input id='mdp' type="password" name="password" required  onChange={this.onChange} />

                    <label htmlFor='verif'> Confirmez mot de passe </label> 
                    <input id='verif' type="password" name="confirm"  required onChange={this.onChange} />

                    <label htmlFor='prenom'> prenom</label> 
                    <input id='prenom' type="text" name="name" required onChange={this.onChange} />

                    <label htmlFor='nom'> nom</label> 
                    <input id='nom' type="text" name="lastname" required  onChange={this.onChange}/>

                    <button className="btn btn-info buttonJson"> Envoyer </button>

                </form>

            </div>
        </div>    
        )
    }

}
export default SignUp;