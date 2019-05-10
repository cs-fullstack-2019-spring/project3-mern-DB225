import React, {Component} from 'react';

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
    render() {
        const array= this.state.tweet && this.state.tweet.map((eachTweet,index)=>{
            return(
                <div key={index}>
                    <p>{eachTweet.inputText}</p>
                    <p>
                        <img src={eachTweet.image} alt="tweetImage" width='160px'/>
                    </p>
                    <button className={'button'}>Edit</button>
                    <button className={'button'}>Delete</button>
                    <hr/>
                </div>
            )
        });

        return (
            <div>
                {array}
            </div>
        );
    }
}

export default MyTweets;