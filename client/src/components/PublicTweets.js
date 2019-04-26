import React, {Component} from 'react';

class PublicTweets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: [],
        }
    }

    componentDidMount() {
        this.allTweets();
    }

    allTweets=()=>{
        fetch('/users/allTweets',{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username:this.props.username,
                tweet: {
                    inputText: this.props.inputText,
                    image:this.props.image,
                    date:this.props.date,
                }
            }),
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    tweet: response.tweet
                })
            })
    };

    render() {
        const mappedTweet = this.state.tweet && this.state.tweet.map((eachEl,index)=>{
           return(
               <div key={index} className='tweetStyle'>
                   <p className='tweetDraw'>
                       <img src={eachEl.image} alt="tweetImage" width='120px'/>
                   </p>
                   <p className='tweetMessage'>{eachEl.inputText}</p>
                   <button>Edit</button>
                   <button>Delete</button>
                   <hr/>
               </div>
           )
        });
        return (
            <div>
                <h1>Test</h1>
                {mappedTweet}
            </div>
        );
    }
}

export default PublicTweets;