import React from 'react';

export class Data extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            toto : [
                { name: null, age: null, country: null, id : null}
            ],
    }
}
    change = (e) => {
        this.setState({
            toto: {
                  ...this.state.toto,
                  [e.target.id]: e.target.value,
            }
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.state.toto.id=this.props.tag;
        this.props.onAddUser(this.state.toto)
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <label htmlFor='name'>Your Name</label>
                <input type="text" name="name" id="name" onChange={this.change}/>
                <label htmlFor="age">Your age</label>
                <input type="text" name="age" id="age" onChange={this.change} />
                <label htmlFor='country'>Your origin country </label>
                <input type="text" name="country" id="country" onChange={this.change}/>
                <button >Submit </button>
            </form>
        )
    }
}
export default class List extends React.Component{
    constructor(props) {
        super(props);
        this.count=0;
       
        this.state ={
            tab: [],
            change : null}

    }
      
    addUser = (user) => {
        this.count++;
        this.state.tab.push(user)
        this.setState ({change:this.count})
    }
    deleleId = (count) => {
        const user = this.state.tab.filter((ev) => {
            return ev.id !== count;
        })
        console.log(user, 'user')
        this.setState({
            tab : user
        })

    }
    componentDidMount(){
        console.log('le composant fonctionne')
    }
    componentDidUpdate(prevProps, prevState){
        console.log("le composant s'est mis à jour")
        console.log(prevProps, prevState, 'bidul')
    }

     render(){
        console.log(this.tab)
         const donne = this.state.tab.map((el, index) => {
             return (
                 <div key={index}>
                        <h1> {el.name} is your name </h1>
                        <h2> You have {el.age} </h2>
                        <h3> You are from {el.country} </h3>
                        <button onClick={() => this.deleleId(el.id)}>Delete This</button>
                 </div>
             )
         })
         return(
             <div>

                <Data 
                    newTab ={this.tab} 
                    onAddUser={this.addUser}
                    tag={this.count}
                />
                 {donne}
            
             </div>
         )
     }
}
