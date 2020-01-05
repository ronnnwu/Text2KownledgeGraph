import React from 'react';
import './Home.css'; 
import KGraph from './KGraph'
import Loader from 'react-loader-spinner'

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            inputValue: '',
            showGraph: false,
            loading: false
        }
    }

    ROOT = '' // localhost:8080

    placeholder = "Robotics is an interdisciplinary branch of engineering and science " +
                "that includes mechanical engineering, electrical engineering, computer science, " +
                "and others. Robotics deals with the design, construction, operation, and use of " +
                "robots, as well as computer systems for their control, sensory feedback, and " +
                "information processing. These technologies are used to develop machines that " +
                "can substitute for humans. Robots can be used in any situation and for any purpose, " +
                "but today many are used in dangerous environments (including bomb detection and " + 
                "de-activation), manufacturing processes, or where humans cannot survive. Robots can " + 
                "take on any form but some are made to resemble humans in appearance. This is said to " +
                "help in the acceptance of a robot in certain replicative behaviors usually performed by " +
                "people. Such robots attempt to replicate walking, lifting, speech, cognition, and basically " +
                "anything a human can do.";
 
    onClick =  () => {
        const value  = (this.state.inputValue)? this.state.inputValue : this.placeholder;
        console.log(value)
        this.setState({  
            showGraph: false,
            loading: true
        });  
        fetch( this.ROOT = "/kg?text=" + value +"")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    if (result.length === 0){

                        this.setState({  
                            showGraph: false,
                            loading: false
                        });  
                        alert("Please try a different text with more content.")

                    }else { 
                        const nodes = result.reduce(function(r, e) {
                            r.push(e.source, e.target);
                            return r;
                          }, []);
    
                        const unique = [...new Set(nodes)]; 
    
                        this.setState({ 
                            links: result,
                            nodes: unique.map(u => ({id: u})),
                            showGraph: true,
                            loading: false
                        });  
                    }

                }
            )
        }
    

    updateInputValue(evt) {
        this.setState({
          inputValue: evt.target.value
        });
    }

    render() {
       return  ( 
            <div className="columns" >
                <div className="column is-one-quarter" >
                    <p className="subtitle">Enter some text</p>
                    <div className="field">
                    <div className="control">
                        <textarea value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} className="textarea" placeholder={this.placeholder} rows="16" ></textarea>
                    </div>
                    </div>
                    <button className="button is-primary" onClick={this.onClick}>Get Kownledge Graph</button>
                </div>
                <div className="column">
                    {this.state.showGraph?<KGraph nodes={this.state.nodes} links={this.state.links}/>:this.state.loading?<Loading/>:null}
                </div> 
            </div>
        )
    }
}

function Loading() {
    return (
        <div>
            <p>
                 <Loader type="ThreeDots" color="#00d1b2" height={80} width={80} />
            </p>
        </div>
    )
}