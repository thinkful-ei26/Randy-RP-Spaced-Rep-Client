import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchCurrentWord} from '../actions/words';
import Game from './game';

export class Dashboard extends React.Component {

    //FETCH CURRENT WORD
    componentDidMount() {
        this.props.dispatch(fetchCurrentWord(this.props.id));
    }
    
    render() {
          
        return (
            <div className="dashboard" >
                Hello {this.props.name} &nbsp;&nbsp;&nbsp;&nbsp; Your Current Score is: {this.props.score}
                <br/>
                <br/>
                <hr/>
                <br/>
                <Game userRefresh={this.props.currentWord} currentUser={this.props.currentUser} loading={this.props.isfetching} />
                <br/>
                <hr/>
                 
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        words: state.words.words,
        id: currentUser._id,
        currentWord: state.currentWord.userRefresh,
        currentUser: state.auth.currentUser,
        score: state.currentWord.userRefresh.score,
        isfetching: state.currentWord.isfetching
        
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
