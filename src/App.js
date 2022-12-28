import React from "react"
import ReactDOM from "react-dom"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

import Die from './components/Die.js'
import './index.css'

function App(){

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(function(){
         const allHeld = dice.every(die => die.isHeld)
         const firstValue = dice[0].value
         const allSameValue = dice.every(die => die.value === firstValue)

         if(allHeld && allSameValue){
             setTenzies(true)
             console.log("You won")
         }
    },[dice])

    function allNewDice(){
        var newDice = []
        for(var a=0; a<10; a++){
            newDice[a] = {value:Math.floor(Math.random() * 6) + 1, 
                           isHeld:false,
                           id: nanoid()}
        }
        return newDice
    }
    
    function rollDice(){
        if(tenzies){
             setTenzies(false)
             setDice(allNewDice())
        }else{
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die : 
                    {
                        value:Math.floor(Math.random() * 6) + 1, 
                        isHeld:false,
                        id: nanoid()
                    }
            }))
        }
        
    }
    
    function holdDice(id){
       setDice(oldDice => oldDice.map(die => {
           return die.id === id ?
           {...die, isHeld: !die.isHeld} :
           die
       }))
    }

    

    return(
         <main>
              {tenzies && <Confetti />}
              <h1 className="title">Tenzies</h1>
              <p className="instructions">Roll until all dice are the same. Click each die to freeze at its current value between rolls.</p>
              <div className="container">
                  {dice.map(num => <Die key= {num.id} isHeld= {num.isHeld} value= {num.value} holdDie= {() => holdDice(num.id)}/>)}
              </div>
              <div
               id="button" 
               onClick={rollDice}
               >
                   {tenzies ? "New Game" : "Roll"}
               </div>
              
         </main>
    )
}

export default App