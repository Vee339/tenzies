import React from "react"
import ReactDOM from "react-dom"
function Meme(){
   
    //const [memeImage, setMemeImage] = React.useState("https://i.imgflip.com/1ihzfe.jpg")

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1ihzfe.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        })) 
        
    }
    
 


    function handleChange(event){
        setMeme(prevMeme => ({
            ...prevMeme,
            [event.target.name]: event.target.value
        }))

        
    }

    function handleSubmit(e){
        e.preventDefault()
    }

        return(
            <main>
                <form onSubmit={handleSubmit}>
                    <div className="inputBoxes">
                        <input
                            className="form--input" 
                            type="text" 
                            placeholder="Top Text" 
                            onChange={handleChange} 
                            name="topText"
                            value={meme.topText}
                         />
                        <input 
                            className="form--input" 
                            type="text" 
                            placeholder="Bottom Text" 
                            onChange={handleChange}
                            name="bottomText"
                            value={meme.bottomText}
                        />
                    </div>
                    <button value="" className="form--button" onClick={getMemeImage}>Get a new meme image</button>
                </form>
                <div className="imgBox">
                    <img src={meme.randomImage} alt="" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </main>
            
        )
}

export default Meme