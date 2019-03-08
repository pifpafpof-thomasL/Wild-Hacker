import React from 'react';
import './style.css'
import cari from './image/panda.jpg';
import Logo from './image/logowildhacker.png';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.id = [];
        this.state = {
            donnee: null,
            admin: false,
        }
    }

    componentDidMount = () => {
        console.log(this.props)

        this.id = []
        this.id.push(this.props.match.params.id)

        if (this.props.match.path === '/Profile/$admin$123') {
            fetch('/auth/dobby')
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    this.setState({
                        donnee: data,
                        admin: true,
                    })
                })

        }
        else if (Number.isInteger(Number(this.id.join()))) {
            fetch(`/auth/profile/${this.id}`)
                .then((res) => res.json())
                .then((data) => {
                    this.setState({
                        donnee: data,
                        admin : false
                    })
                })
        }

    }
    deleleId = (e) => {
        console.log(e)
        const user = this.state.donnee.filter((el) => {
            return el.id !== e
        })
        fetch(`/auth/profile/${e}`, {
            method: "POST",
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(this.state.donnee[e]),
        })
            .then(res => res.json())
            .then(
                res => this.setState({ "message": res.message }),
                err => this.setState({ "message": err.message })
            )
        this.setState({
            donnee: user,
        })

    }

    render() {
        let rows ;
        const { donnee, admin } = this.state;
        if (admin === true && donnee !== null){
            rows = donnee.map((el) =>{
            return (
                <div className='admin' key={el.id}>
                    <h1 > Vous êtes sur le profil de {el.name} {el.lastname} </h1>
                    <p> {el.email} </p>
                    <img className='popUp' src={cari} alt=''/> <br/><br/><br/>
                    <button onClick={() => this.deleleId(el.id)}>Delete This</button>
                </div>
            )
        })
        }else if (admin === false && donnee !== null)
            rows = donnee.map((el) =>{
            return (
                <div  className='user' key={el.id}>
                    <h1> Vous êtes sur le profil de {el.name} {el.lastname} </h1>
                    <p> {el.email} </p> 
                    <img className='popUp' src={cari} alt='' />
                </div>
                )
            })

        return (
            <div className='profile'>

                <div className='header'>
                        <img className='App-logo' src={Logo} alt='' />
                </div>

                {rows}

            </div>
        )
    }
}