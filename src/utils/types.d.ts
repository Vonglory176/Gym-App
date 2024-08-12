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
    name: any
    muscles: any[]
    type: any
    meta: {
        environment: any
        level: number[]
        equipment: any[]
    }
    unit: any
    description: any
    substitutes: any[]
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