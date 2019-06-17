import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import EditTweet from "./EditTweet";


class MyTweets extends Component {
    constructor(props) {
        super(props);
        this.state={
            tweet:[],
        }
    }

    componentDidMount() {
        this.renderTweet();
    }

    renderTweet=()=>{
        fetch('/users/mytweets',{
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.props.username,
            }),
        })
            .then(data=>data.json())
            .then(response=>
            {
                console.log(response);
                this.setState({tweet:response.tweet});
            })
    };
    /*
    1. Make a component for EditTweet
    2. Show this component when user clicks "Edit" button
    3. Pass tweet data to the EditTweet component
    4. Allow user to edit tweet inside EditTweet component (use a textbox)
    5. Add a "Update" button to the EditTweet component
    6. Make a POST call to your web service to actually update the text
     */
    render() {
        const array= this.state.tweet && this.state.tweet.map((eachTweet,index)=>{
            return(
                <Router>
                <div key={index}>
                    <p>{eachTweet.inputText}</p>
                    <p>
                        <img src={eachTweet.image} alt="tweetImage" width='160px'/>
                    </p>
                    <button className={'button'}>
                        <Link to={'/editTweet'} >Edit</Link>
                    </button>

                    {/*<EditTweets classname={{hidden if eachTweet.editTweet}}>*/}
                    <hr/>
                </div>
                    <Route path={'/editTweet'}
                           component={()=> <EditTweet/>}/>
                </Router>
            )
        });

        return (
            <div>
                <h1>MY ENTRIES</h1>
                {array}
            </div>
        );
    }
}

export default MyTweets;