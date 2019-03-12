import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Profile from './profile';
import Logo from './image/logowildhacker.png';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            password: null,
            verif: false,
        }
    }
    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleClick = (e) => {
        const { message, email, password } = this.state
        e.preventDefault();
        let DuJson = { email, password }

        fetch('/auth/verif', {
            method: "POST",
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(DuJson),
        })
            .then(res => res.json())
            .then(
                res => {
                    console.log('res.message', res.message);
                    if (res.message === 'admin') {
                        Swal.fire({
                            confirmButtonColor: "blue",
                            type: "success",
                            text: 'Bonjour Master',
                            imageUrl: "https://bavatuesdays.com/wp-content/uploads/2012/06/eagle_claw-1.gif",
                            confirmButtonText: `<a style='color: white' href='/Profile/$admin$123'>Get your Profile</a>`
                        });
                    } else if (res.message === 'user') {
                        Swal.fire({
                            confirmButtonColor: "blue",
                            type: "success",
                            text: 'Connexion Successful',
                            imageUrl: "https://bonkaday.com/wp-content/uploads/2014/07/gatti-con-comportamenti-strani-e-divertenti-in-movimento-11.gif",
                            confirmButtonText: `<a style='color: white' href='/Profile'>Get your Profile</a>`
                        });
                    } else {
                        Swal.fire({
                            confirmButtonColor: "blue",
                            type: "Error",
                            text: res.message,
                            imageUrl: "https://bonkaday.com/wp-content/uploads/2014/07/gatti-con-comportamenti-strani-e-divertenti-in-movimento-11.gif",
                        });
                        Z
                    }
                }
            )
    }


    render() {

        return (

            <div>

                <div className='App-header'>
                    <img className='App-logo' src={Logo} alt='' />
                </div>
                <div className="logHome">

                    <form onSubmit={this.handleClick}>
                        <fieldset>
                            <input id='@mail' type='email' placeholder='MrRobot@hack.com' name='email' onChange={this.change} />
                            <br /><br />
                            <input id='password' type="password" placeholder='*****' name="password" onChange={this.change} />
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
