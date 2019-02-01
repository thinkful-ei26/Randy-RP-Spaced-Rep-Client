import React from 'react';
import {connect} from 'react-redux';
import {fetchNextWord} from '../actions/words';
import {fetchSetOrder} from '../actions/words';
import {fetchCurrentWord} from '../actions/words';
export class Game extends React.Component {

  //Game modes
  //show word mode -- new word & SUBMIT BUTTON
  //show right wrong & response mode -- right/wrong response NEXT WORD button
  
  constructor(props) {

    super(props);
    this.state = {

      theWord:'Loading... ',
      theAnswer: 'Loading...',
      gameMode: 'newWordMode',
      gameResponse: 'Your Word to Learn is: '

    }
 
  }

  setTheWord(){

      // //console.log(this.props.userRefresh.questions);
      // theWord = this.props.userRefresh.questions[this.props.userRefresh.head].word;
      // theAnswer = this.props.userRefresh.questions[this.props.userRefresh.head].answer;

      this.setState({

        theWord:this.props.userRefresh.questions[this.props.userRefresh.head].word,
        theAnswer:this.props.userRefresh.questions[this.props.userRefresh.head].answer
          
      })


  } 

  //submit answer -- this does a PUT based on answer correctness
  onSubmit(e) { 
    e.preventDefault();
    let userAnswer = this.input.value;
    //clear input field
    e.target.reset();
    let testResults;
    let theAnswer = this.props.userRefresh.questions[this.props.userRefresh.head].answer;
    if(theAnswer.toLowerCase() === userAnswer.toLowerCase()){
      testResults = true;
    }
    else{
      testResults = false;
    }
    //PUT based on test results
    //console.log('>>id',this.props.currentUser._id,'>>test', testResults,'>>user all', this.props.currentUser);
    
    console.log('userRefresh info >>>>>>>', this.props.userRefresh);

    this.props.dispatch(fetchSetOrder(testResults, this.props.userRefresh));
       

    let update_gameMode;
    let update_gameResponse;
 
    //if you get it right
    if(testResults){
      update_gameMode = 'rightMode';
      update_gameResponse = 'Great job! You got it right!';
    }

    //if you get it wrong
    else {
      update_gameMode = 'wrongMode';
      update_gameResponse = 'Nice try, but you got it wrong...';
    }
 
    this.setState({

      gameMode: update_gameMode,
      gameResponse: update_gameResponse
 
    })
  }

  //

  //Next click
  onNextClick(){

    //do we need to pass in the current word to find out whats next?
    this.props.dispatch(fetchCurrentWord(this.props.currentUser._id));
    //this.props.dispatch(changeCurrentWord());

      
    //random word selector
    // let newWordSelector = Math.floor(Math.random() * Math.floor(this.props.currentWords.length));

    this.setState({

      theWord:'Loading... ',
      gameMode: 'newWordMode',
      gameResponse: 'Here is Your Next Word to Learn '
       
    })
  }

  render(){

    //let theWord = 'Loading...';
    //let theAnswer = '';
    
    if(this.props.userRefresh.questions !== undefined && this.state.theWord === 'Loading... '){

      // //console.log(this.props.userRefresh.questions);
      // theWord = this.props.userRefresh.questions[this.props.userRefresh.head].word;
      // theAnswer = this.props.userRefresh.questions[this.props.userRefresh.head].answer;

      this.setTheWord();
    }

    //NEW WORD MODE
    if(this.state.gameMode === 'newWordMode'){

      return(
        <div>
          <h3>{this.state.gameResponse}</h3>
          <br/>
          <h1> {this.state.theWord} </h1>
          <br/>
          <hr/>
          <br/>
          <form onSubmit={e => this.onSubmit(e)}>
          Enter answer here: <input
                  type="text"
                  id="answer"
                  ref={input => (this.input = input)}
                      /> 
            <button>SUBMIT</button>    
          </form>
        </div>
      );
    }

    //RIGHT MODE
    if(this.state.gameMode === 'rightMode'){

      return(
        <div>
          <h3>{this.state.gameResponse}</h3>
          <br/>
          <p> You are CORRECT, the meaning of {this.state.theWord} is {this.state.theAnswer}.</p>
          <br/>
          <hr/>
          <button onClick={(e)=>this.onNextClick()}>NEXT WORD</button>
          <br/>
        </div>
      );
    }

    //WRONG MODE
    if(this.state.gameMode === 'wrongMode'){

        return(
          <div>
            <h3>{this.state.gameResponse}</h3>
            <br/>
            <p>The correct meaning of {this.state.theWord} is {this.state.theAnswer}.</p>
            <br/>
            <hr/>
            <button onClick={(e)=>this.onNextClick()}>NEXT WORD</button>
            <br/>
          </div>
        );
      }
    }
 }

 const mapStateToProps = state => {

  return {

    

  }

}


export default connect(mapStateToProps)(Game);





