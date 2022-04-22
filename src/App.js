import React, { Component, Fragment } from 'react';
import Header  from './Components/Header/Header';
import {Grid ,Typography } from '@material-ui/core';
import Card from './Components/Card/Card';
import Save from './Components/Save/Save';


class App extends Component {
  constructor(props){
  super(props);
  this.state = {
    cards : [],
    newPost: false,
    onUpdate:false,
    name: '',
    description: ''
  };
  }
 
static getDerivedStateFromProps(props, state){
if(state.filterCard)
  localStorage.setItem('cards', JSON.stringify(state.filterCard));
return {...state, filterCards: ''};
}

shouldComponentUpdate(nextProps, nextState){
  return nextState !==   this.state;
}

componentDidUpdate(prevProps , prevState){
  if(prevState.filterCard)
  this.setState( (prevState) => ({filterCard: ''}))
}

componentDidMount(){
    this.setState({cards: JSON.parse(localStorage.getItem('cards')) || [] })
  }

  newPostHandler = () =>{
    this.setState({newPost: true ,onUpdate: false, id: '', name: '', description: ''});
  }

  goToHome =()=>{
    this.setState({newPost: false , onUpdate: false , id: '', name: '', description: ''}); 
  }
  onDeleteCard=(card)=>{
    const filterCards = this.state.cards.filter(c => c.id !== card.id);
    this.setState({cards:  filterCards , filterCard : filterCards});
   
  }

  onEdit=(card)=>{
    this.setState({onUpdate: true , id: card.id , name: card.name , description: card.description});
  }
  onChangeEdit=(event)=>{
  this.setState({ [event.target.name] : event.target.value })                  
  }

  onSaveHandler=()=>{
    const {id , name , description} = this.state;
    if(id === '' || name === '' || description === '') return alert('No input field must empty.');
    const Card = {id , name , description};
    const cardIndex = this.state.cards.findIndex(c => c.id === id);
    const Cards = [...this.state.cards];
    Cards[cardIndex] = Card;

    if( cardIndex === -1) Cards.push(Card);
    else Cards[cardIndex] = Card;
    

    this.setState({cards: Cards , filterCard: Cards});
    localStorage.setItem('cards',JSON.stringify(Cards));
    this.goToHome();
  }

  render() {
    let cards = this.state.cards.map((card, index) => {
      return <Card 
      key={card.id}
      id={card.id}
      name={card.name}
      description={card.description}
      delet={this.onDeleteCard.bind(this, card)}
      edit={this.onEdit.bind(this,card)}
     
      />
    })

    let save = (
    <Save
    home={this.goToHome}
    id={this.state.id}
    name={this.state.name}
    description={this.state.description}
    change={this.onChangeEdit}
    isUpdate={this.setState.onUpdate}
    save={this.onSaveHandler}
     />
     );
    return (
      <Fragment>
       <Header newPost = {this.newPostHandler}/>
       <Grid container>
       <Grid sm={2} item></Grid>
       <Grid sm={8} item>
        {(this.state.newPost || this.state.onUpdate) ? save : cards}
       </Grid>
       <Grid sm={2} item></Grid>
       </Grid>
      <Typography align='center' style={{marginTop : '2rem'}}>
       Made by Muskan Rai <span style={{color : 'red'}}>❤</span>
      </Typography>
      </Fragment>
    )
  }
}

export default App;