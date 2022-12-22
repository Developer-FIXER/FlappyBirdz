import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
const BIRD_SIZE = 20
const GAME_HEIGHT = window.innerHeight
const GAME_WIDTH = window.innerWidth
const GAME_DIFFICULTY_GAP = 120
const OBSTACLE_WIDTH = 50
function App() {
  const overs= () => {
    setStartGame(true)
    setOver(false)
  }
  const [startGame, setStartGame] = useState(false)
  const [birdPosition, setBirdPosition] = useState(GAME_HEIGHT/2-BIRD_SIZE/2)
  const [obstacleHeight, setObstacleHeight] = useState(100)
  const [obstacleLeftPosition, setObstacleLeftPosition] = useState(GAME_WIDTH-OBSTACLE_WIDTH)
  const [over, setOver] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(()=>{
    let interval = null;
    if (startGame){
      interval = setInterval(()=>{
        if (birdPosition < GAME_HEIGHT-BIRD_SIZE){
          setBirdPosition(birdPosition=>birdPosition+4)
        }
      }, 24)
    }
    return () => clearInterval(interval)
  }, [startGame, birdPosition])
  useEffect(()=>{
    let interval = null;
    if (startGame){
      interval = setInterval(()=>{
        if (obstacleLeftPosition > -OBSTACLE_WIDTH){
          setObstacleLeftPosition(obstPos=>obstPos-6)
        }
        else {
          setObstacleLeftPosition(GAME_WIDTH-OBSTACLE_WIDTH)
          console.log(obstacleLeftPosition, -OBSTACLE_WIDTH)
    
          setObstacleHeight(Math.floor(Math.random() * (GAME_HEIGHT-GAME_DIFFICULTY_GAP)))
          setScore(score => score+1)
        }

      }, 24)
      
    }
    return () => clearInterval(interval)
  }, [startGame, obstacleLeftPosition])

  useEffect(()=>{
    if (over){
      const oi = document.getElementById('over')
      oi.style.display = 'block'
    }
    if (startGame){
      const oi = document.getElementById('playGame')
      oi.style.display = 'none'
      const collidedWithUpperObstacle = birdPosition < obstacleHeight
      const collidedWithLowerObstacle = birdPosition > obstacleHeight+GAME_DIFFICULTY_GAP
      if (obstacleLeftPosition < BIRD_SIZE && (collidedWithUpperObstacle || collidedWithLowerObstacle)){
        setStartGame(false)
        setOver(true)
       }
    }
  }, [startGame, obstacleLeftPosition, birdPosition, obstacleHeight])

  const bottomObstacleHeight = GAME_HEIGHT-((obstacleHeight)+GAME_DIFFICULTY_GAP)
  return (
    <div className="App">
      <div
      onClick={() =>{
        if (startGame){
          
          const newBirdPosition =birdPosition-50
        if (newBirdPosition> 0){
          setBirdPosition(birdPosition => birdPosition-50)
        }
        else{
          setBirdPosition(0)
        }
        }
      }
      }
       style={{
            backgroundColor:"#2185C5",
            width:`${GAME_WIDTH}px`,
            height:`${GAME_HEIGHT}px`,
            position:'relative',
            overflow:"hidden"
    }}>

      <div style={{
        position:'absolute',
        top: `${0}px`,
        left: `${obstacleLeftPosition}px`,
        width: `${OBSTACLE_WIDTH}px`,
        height: `${obstacleHeight}px`,
        backgroundColor: 'tomato'
      }}/>
      <div style={{
        position:'absolute',
        top: `${obstacleHeight+GAME_DIFFICULTY_GAP}px`,
        left: `${obstacleLeftPosition}px`,
        width: `${OBSTACLE_WIDTH}px`,
        height: `${bottomObstacleHeight}px`,
        backgroundColor: 'tomato',

      }}/>
      <div style={{
            position:"absolute",
            backgroundColor:"red",
            width:`${BIRD_SIZE}px`,
            height:`${BIRD_SIZE}px`,

            borderRadius: "50%",
            top: `${birdPosition}px`,
            
      }}/>
      <p style={{position:'relative',color:'white', fontSize:'200%', fontWeight:'bold', zIndex:1}}>{score}</p>
      <button id='playGame' style={{position:'absolute', top:'45%', left:'35%'}} onClick={() => {overs()}}>Start Game</button>
      <div id='over' style={{display:'none', position:'relative', top:'20%'}}>
        <h1 style={{fontSize:'500%', color:'red'}}>Game Over</h1>
        <button onClick={()=>{window.location.reload()}}>Restart</button>
      </div>
    </div>
    
    </div>
  )
}

export default App
