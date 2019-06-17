import React, {Component} from 'react';

class EditTweet extends Component {
    constructor(props) {
        super(props);
        this.state={
            postEdit: '',

        };
    }

    editSubmit=(e)=>{
        e.preventDefault();
        fetch('/users/',{

            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },


            body: JSON.stringify(
                {
                    username:this.props.username,
                    inputText:e.target.inputText.value,
                    image:e.target.image.value,
                }
            ),
        })
            .then(data=>data.text())
            .then(response=>this.setState({postEdit: response}));
    };


    render() {
        return (
            <div>
                <h1>Edit</h1>
                <form onSubmit={this.editSubmit}>
                    <label htmlFor={"inputText"}>Tweet :</label>
                    <input type="text" id={"inputText"} name={"tweet"}/>
                    <label htmlFor={"image"}>Add Pic :</label>
                    <input type="text" id={"image"} name={"image"}/>
                    <button>Update</button>
                </form>
            </div>
        );
    }
}

export default EditTweet;