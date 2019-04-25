import React, {Component} from 'react';

class LoggedInUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            tweet:[],
        };
    }

    componentDidMount() {
        this.renderTweet();
    }

    renderTweet=()=>{
        // e.preventDefault();
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


    render() {
        const array= this.state.tweet.map((eachTweet,index)=>{
           return(
               <div key={index} className='tweetStyle'>
                   <h3 className='tweetTitle'>{eachTweet.title}</h3>
                   <p className='tweetDraw'>
                       <img src={eachTweet.image} alt="tweetImage" width='120px'/>
                   </p>
                   <p className='tweetMessage'>{eachTweet.inputText}</p>
                   <hr/>
               </div>
           )
        });
        return (
            <div>
                <p>
                    <img src={this.props.image} alt="profile" className='profile'/>
                    <img src={this.props.background_image} alt="background"className='profile2'/>
                </p>
                <h1>{this.props.username}</h1>
                <hr/>
                {array}
            </div>
        );
    }
}

export default LoggedInUser;