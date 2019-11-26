import React, {Component} from 'react';

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

        fetch('https://cors-anywhere.herokuapp.com/http://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data 
            // console.log(memes[0])

            this.setState({
                allMemeImgs: memes
            })
        })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        // get a random int (index in the array)
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        
        // get the meme from the index
        const randMemeImg = this.state.allMemeImgs[randNum].url
        
        // set 'randomImg' to the '.url' of the random item I grabbed
        this.setState({randomImg: randMemeImg})

    }

    render() {
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        name='topText'
                        placeholder='Top Text'
                        onChange={this.handleChange}
                        value={this.state.topText}
                    />
                    <br />
                    <input 
                        type='text'
                        name='bottomText'
                        placeholder='Bottom Text'
                        onChange={this.handleChange}
                        value={this.state.bottomText}
                    />
                    <br />
                    <button>Gen</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt='' />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;