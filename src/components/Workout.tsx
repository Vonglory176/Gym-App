import React from 'react'
import SectionWrapper from './SectionWrapper'
import ExerciseCard from './ExerciseCard'
import { WorkoutProps, ExerciseProps } from '../utils/types'

// interface ExerciseProps {
//   name: string
//   type: string
// }

// interface WorkoutProps {
//   workout: ExerciseProps[]
//   // exercise: object[]
// }

const Workout: React.FC<WorkoutProps> = ({workout}) => {
  return (

    <SectionWrapper id='workout' header={"Welcome to"} title={['The', 'DANGER', 'zone']}>
      <div className='flex flex-col gap-4'>
        {workout.map((exercise: ExerciseProps, i: number) => {
          return (
            <ExerciseCard exercise={exercise} index={i} key={i} />
          )
        })}
      </div>
    </SectionWrapper>
  )
}

export default Workout
