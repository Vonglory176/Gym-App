import React, { useEffect, useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier';
import Button from './Button';
import { GeneratorProps } from '../utils/types';

const Header = (props: {index: string, title: string, description: string}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{props.index}</p>
        <h4 className='text-lg sm:text-2xl lg:text-3xl'>{props.title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{props.description}</p>
    </div>
  )
}


// interface GeneratorProps {
//   poison: string
//   muscles: string[]
//   goal: string
//   setPoison: React.Dispatch<React.SetStateAction<string>>
//   setMuscles: React.Dispatch<React.SetStateAction<string[]>>
//   setGoal: React.Dispatch<React.SetStateAction<string>>
//   updateWorkout: () => void
//   // children: React.ReactNode;
// }

const Generator: React.FC<GeneratorProps> = ({ poison, setPoison, muscles, setMuscles, goal, setGoal, updateWorkout }) => { // { children }
  const [showModal, setShowModal] = useState(false)
  // const [poison, setPoison] = useState<string>("individual")
  // const [muscles, setMuscles] = useState<string[]>([])
  // const [goal, setGoal] = useState<string>("")

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const updatePoison = (poison: string) => {
    setPoison(poison)
    setMuscles([])
  }

  const maxMuscleGroups = 3
  const updateMuscles = (muscleGroup: string) => {

    // Removing if already selected
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter(val => val !== muscleGroup))
      return
    }

    // Maximum muscle groups
    if (muscles.length >= maxMuscleGroups) return


    if (poison !== 'individual') {
      console.log('HERE 2')
      setMuscles([muscleGroup])
      // setShowModal(false)
      return
    }    

    setMuscles([...muscles, muscleGroup])
    // if (muscles.length >= 2) setShowModal(false)
  }

  useEffect(() => {
    console.log(muscles)
  }, [muscles])
  
  return (
    <SectionWrapper id='generate' header={"Generate your workout"} title={['It\'s', 'Huge', 'o\'clock']}>

      {/* PICK WORKOUT */}
      <Header index={'01'} title={"Pick your workout"} description={"Select the workout you want to generate."} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button 
              onClick={() => updatePoison(type)} 
              className={'bg-slate-950 border hover:border-blue-600 py-3 px-4 rounded-lg ' + (poison === type ? 'border-blue-600' : 'border-blue-400')} 
              key={typeIndex}
            >
              <p className='capitalize'>{type.replace(/_/g, " ")}</p>
            </button>
          )
        })}
      </div>


      {/* PICK MUSCLE */}
      <Header index={'02'} title={"Lock on targets"} description={"Select the muscles judged for annihilation."} />

      <div className='bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col'>
        <button onClick={toggleModal} className='relative p-3 flex items-center justify-center'>
          <p className='capitalize'>{muscles.length === 0 ? 'Select muscle groups' : muscles.join(', ')}</p>
          <i className='fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down'></i>
        </button>


        {/* Muscle groups */}
        {showModal && (
          <div className='flex flex-col p-3'>
            {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison as keyof typeof WORKOUTS])).map((muscleGroup, muscleGroupIndex) => {
              
              const isSelected = muscles.includes(muscleGroup)
              const isDisabled = muscles.length >= maxMuscleGroups && !isSelected

              return (
                <button 
                  key={muscleGroupIndex}
                  onClick={() => updateMuscles(muscleGroup)}
                  className={'duration-200 ' + 
                    (isDisabled ? 'text-slate-400' : 
                      isSelected ? 'text-blue-400' : 'hover:text-blue-400')}
                  disabled={isDisabled}
                >
                  <p className='uppercase'>{muscleGroup.replace(/_/g, " ")}</p>
                </button>
              )
            }) }
          </div>
        )}
      </div>


      {/* PICK WORKOUT */}
      <Header index={'03'} title={"Become Juggernaut"} description={"Select your ultimate objective."} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button 
              onClick={() => setGoal(scheme)}
              className={'bg-slate-950 border hover:border-blue-600 py-3 px-4 rounded-lg ' + (goal === scheme ? 'border-blue-600' : 'border-blue-400')} 
              key={schemeIndex}
            >
              <p className='capitalize'>{scheme.replace(/_/g, " ")}</p>
            </button>
          )
        })}
      </div>


      {/* Formulate */}
      <Button func={updateWorkout} text={'Create workout'} />
      
    </SectionWrapper>
  )
}

export default Generator