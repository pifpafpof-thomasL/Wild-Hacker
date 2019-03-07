import React from 'react';

export default class Form extends React.Component{
  constructor(props){
    super();
    this.state={
      name: null,
      age: null
    };
  }
  change = (e) => {
    const str = e.target.value.split('').filter((a) => {
     return a === '*'? '' : a
    });

      this.setState({
      [e.target.id]: str.join('')
      }); 
  }
  handleClick = (e) => {
    e.preventDefault();
    console.log(e)
  };

  render() {
      return (  
        <div className="App">
             <header className="App-header">
                <h1> Bienvenue {this.state.name}</h1>
                  <form onSubmit={this.handleClick}>
                   <label htmlFor="name">Entrez votre nom </label>
                   <input type="text"  id="name" onChange={this.change} />
                   <label htmlFor="age">Entrez votre nom </label>
                   <input type="text" id="age" onChange={this.change} />
                   <button >Envoyer</button>
                 </form>
                 <p> vous avez {this.state.age} ans !</p>
             </header>
 
    </div>)
  } 
}
