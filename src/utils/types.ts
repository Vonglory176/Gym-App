export interface SectionWrapperProps {
    children: React.ReactNode;
    header: string;
    title: string[];
    id: string;
}

export interface ButtonProps {
    text: string
    func?: () => void
}

export interface ExerciseCardProps {
    exercise: ExerciseProps // ExerciseProps
    index: number
}

export interface ExerciseProps {
    name: string
    muscles: string[]
    type: string
    meta: {
        environment: string
        level: number[]
        equipment: string[]
    }
    unit: string
    description: string
    substitutes: string[]
}
  
export interface WorkoutProps {
    workout: ExerciseProps[]
    // exercise: object[]
}

export interface GeneratorProps {
    poison: string
    muscles: string[]
    goal: string
    setPoison: React.Dispatch<React.SetStateAction<string>>
    setMuscles: React.Dispatch<React.SetStateAction<string[]>>
    setGoal: React.Dispatch<React.SetStateAction<string>>
    updateWorkout: () => void
    // children: React.ReactNode;
}