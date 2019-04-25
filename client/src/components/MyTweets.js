import React, {Component} from 'react';

class MyTweets extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn:false,
            notice:'',
        }
    }
    TweetSubmit=(e)=>{
        e.preventDefault();

        fetch('/users/addTweet', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: this.props.username,
                tweet: {
                    inputText: e.target.inputText.value,
                    image:e.target.image.value,
                    date:e.target.date.value,
                }
            }),
        })
            .then(data=>data.text())
            .then(response=>this.setState({notice:response}))
    };
    render() {
        return (
            <div>
                <h1>My Tweets</h1>
                <form onSubmit={this.TweetSubmit}>
                    <p>
                        <label htmlFor={"inputText"}>Text:</label>
                        <input type="text" id={"inputText"} name={"inputText"}/>
                    </p>
                    <p>
                        <label htmlFor={"image"}>Upload Image:</label>
                        <input type="text" id={"image"} name={"image"}/>
                    </p>
                    <p>
                        <label htmlFor={"date"}>Date:</label>
                        <input type="text" id={"date"} name={"date"} />
                    </p>
                    <button>Publish</button>
                </form>
                {this.props.notice}
            </div>
        );
    }
}

export default MyTweets;