import { useState } from 'react'
// import './App.css'
import './index.css'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import { generateWorkout } from './utils/functions'
import { ExerciseProps } from './utils/types'

function App() {
  const [currentWorkout, setCurrentWorkout] = useState<ExerciseProps[]>([])
  const [poison, setPoison] = useState<string>("individual")
  const [muscles, setMuscles] = useState<string[]>([])
  const [goal, setGoal] = useState<string>("strength_power")

  const updateWorkout = () => {
    console.log("updateWorkout")

    if (muscles.length < 1) return

    const newWorkout = generateWorkout({poison, muscles, goal})
    console.log(newWorkout)

    setCurrentWorkout(newWorkout)
    window.location.href = '#workout'
  }

  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
      <Hero />

      <Generator 
        poison={poison}
        setPoison={setPoison}
        muscles={muscles}
        setMuscles={setMuscles}
        goal={goal}
        setGoal={setGoal}
        updateWorkout={updateWorkout}
      /> {/* children="" */}

      {currentWorkout.length > 0 && <Workout workout={currentWorkout} />}
    </main>
  )
}

export default App


// VIDEO ---> https://youtu.be/82PXenL4MGg?t=11286