import {Component} from "react";
import React from "react";
import axios from "axios";
import App from "./App";
class Input extends Component {
    state = {
        text: "",
        selectedFile: null,

      }

      
      
    fileSelecterHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })

    }
    fileUploadHandler = () =>{
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        console.log(this.state.selectedFile);

      axios.post('data.json', fd)
      .then(res => {
          console.log(res);
      });
    }
    
   componentDidMount = () =>{
      axios
      .get('http://127.0.0.1:5000/Ale/groupChats')
      .then(response => {

        console.log(response.data)
        const varia = {
          value: response.data.GroupChats[0].gmediaList,
          type:"text"
        }
    

         this.props.onSendMessage(varia.value)
        });

       
    
  }
  


  
  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autofocus="true"
            
          />
          <button>Send</button>
          <input 
            style={{display: 'none'}}
            type="file" 
            onChange={this.fileSelecterHandler}
            ref={fileInput => this.fileInput = fileInput}
            />
            <button onClick={() => this.fileInput.click()}>Pick File</button>
            <button onClick={this.fileUploadHandler}>Upload</button>
        </form>
      </div>
    );
  }
  onChange(e) {
    this.setState({text: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
  }
}

export default Input;