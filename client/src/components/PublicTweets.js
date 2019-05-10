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
                    tweet:response
                })
            })
    };

    render() {
        const mappedTweetArray = this.state.tweet && this.state.tweet.map((eachEl,index)=>{
           return(
               <div key={index}>
                   {eachEl.tweet.map((c, i) => (
                       <div key={i}>
                           <img src={c.image} alt="tweetImage" width='120px'/>
                           <h3>{c.inputText}</h3>
                           <hr />
                       </div>
                   ))}
               </div>
           )
        });
        return (
            <div>
                <h1>....</h1>
                {mappedTweetArray}
            </div>
        );
    }
}

export default PublicTweets;