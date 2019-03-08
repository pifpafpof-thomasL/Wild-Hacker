import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Profile from './profile';
import Logo from './image/logowildhacker.png';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            sql : []
        }
    }
    componentDidMount = () => {
        fetch('/auth/dobby')
        .then(res => res.json())
        .then((data) => {
            console.log(data, 'data')
            this.setState({
                sql : data,
            })
        })
    }
    handleClick = (e) => {
        const { sql } = this.state
        e.preventDefault();
        const email = document.getElementById('@mail').value
        const password = document.getElementById('password').value
        
        const authorisation = sql.filter((el) => el.email === email)
        console.log(authorisation, 'sql')
        if (authorisation.length >  0) {
            if(authorisation[0].password === password ){
            Swal.fire({
                confirmButtonColor: "blue",
                type: "success",
                text: 'Connexion Successful',
                imageUrl:"https://bonkaday.com/wp-content/uploads/2014/07/gatti-con-comportamenti-strani-e-divertenti-in-movimento-11.gif",
                confirmButtonText: `<a style='color: white' href='/Profile/${authorisation[0].id}'>Get your Profile</a>`
                });
            }
        }
        else if (email === 'admin@root' && password === "123" ){
            Swal.fire({
                confirmButtonColor: "blue",
                type: "success",
                text: 'Bonjour Master',
                imageUrl:"https://bavatuesdays.com/wp-content/uploads/2012/06/eagle_claw-1.gif",
                confirmButtonText: `<a style='color: white' href='/Profile/$admin$123'>Get your Profile</a>`
                });
        }
    }


    render() {

        return(
            
            <div>

            <div className='App-header'>
                    <img className='App-logo' src={Logo} alt='' />
            </div>
            <div className="logHome">
            
                <form onSubmit={this.handleClick}> 
                    <fieldset>
                    <input id='@mail' type='email'placeholder='MrRobot@hack.com' name='email'/> 
                    <br/><br/>
                    <input id='password' type="password" placeholder='*****' name="password" />
                    </fieldset>
                    <button className="btn btn-info"> Envoyer </button>
                </form>
                <div className='ssh'> 
                 <Link to="/SignUp" className="btn btn-info script"> Vous n'êtes pas inscrit?</Link>
                </div>
            </div>
            </div>
        )
    }
}

export default Login;