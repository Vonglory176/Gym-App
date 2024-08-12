import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./swoldier"

interface GenerateWorkoutArgs {
    muscles: string[]
    poison: string
    goal: string
}

const exercises = exercisesFlattener(EXERCISES)

export function generateWorkout({ muscles, poison: workout, goal }: GenerateWorkoutArgs) {
    let exer = Object.keys(exercises)
    exer = exer.filter((key) => exercises[key].meta.environment !== "home")
    let includedTracker: string[] = []
    // let numSets = 5
    let listOfMuscles: string[]

    if (workout === "individual") {
        listOfMuscles = muscles
    } else {
        listOfMuscles = (WORKOUTS[workout as keyof typeof WORKOUTS] as Record<string, string[]>)[muscles[0]]
    }

    listOfMuscles = Array.from(new Set(shuffleArray(listOfMuscles)))
    let arrOfMuscles = Array.from(listOfMuscles)
    let scheme = goal
    let sets = SCHEMES[scheme as keyof typeof SCHEMES].ratio
        .reduce<string[]>((acc, curr, index) => {
            return [
                ...acc,
                ...[...Array(Number(curr)).keys()].map(() =>
                    index === 0 ? "compound" : "accessory"
                ),
            ]
        }, [])
        .reduce<{ setType: string, muscleGroup: string }[]>((acc, curr, index) => {
            const muscleGroupToUse =
                index < arrOfMuscles.length
                    ? arrOfMuscles[index]
                    : arrOfMuscles[index % arrOfMuscles.length]
            return [
                ...acc,
                {
                    setType: curr,
                    muscleGroup: muscleGroupToUse,
                },
            ]
        }, [])

    const { compound: compoundExercises, accessory: accessoryExercises } =
        exer.reduce<{ compound: Record<string, any>, accessory: Record<string, any> }>(
            (acc, curr) => {
                let exerciseHasRequiredMuscle = false
                for (const musc of exercises[curr].muscles) {
                    if (listOfMuscles.includes(musc)) {
                        exerciseHasRequiredMuscle = true
                    }
                }
                return exerciseHasRequiredMuscle
                    ? {
                        ...acc,
                        [exercises[curr].type]: {
                            ...acc[exercises[curr].type as keyof typeof acc],
                            [curr]: exercises[curr],
                        },
                    }
                    : acc
            },
            { compound: {}, accessory: {} }
        )

    const genWOD = sets.map(({ setType, muscleGroup }) => {
        const data =
            setType === "compound" ? compoundExercises : accessoryExercises
        const filteredObj = Object.keys(data).reduce<Record<string, any>>((acc, curr) => {
            if (
                includedTracker.includes(curr) ||
                !data[curr].muscles.includes(muscleGroup)
            ) {
                return acc
            }
            return { ...acc, [curr]: exercises[curr] }
        }, {})
        const filteredDataList = Object.keys(filteredObj)
        const filteredOppList = Object.keys(
            setType === "compound" ? accessoryExercises : compoundExercises
        ).filter((val) => !includedTracker.includes(val))

        let randomExercise =
            filteredDataList[
            Math.floor(Math.random() * filteredDataList.length)
            ] ||
            filteredOppList[
            Math.floor(Math.random() * filteredOppList.length)
            ]

        if (!randomExercise) {
            return {}
        }

        let repsOrDuraction =
            exercises[randomExercise].unit === "reps"
                ? Math.min(...SCHEMES[scheme as keyof typeof SCHEMES].repRanges) +
                Math.floor(
                    Math.random() *
                    (Math.max(...SCHEMES[scheme as keyof typeof SCHEMES].repRanges) -
                        Math.min(...SCHEMES[scheme as keyof typeof SCHEMES].repRanges))
                ) +
                (setType === "accessory" ? 4 : 0)
                : Math.floor(Math.random() * 40) + 20
        const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)]

        if (exercises[randomExercise].unit === "reps") {
            const tempoSum = tempo
                .split(" ")
                .reduce((acc, curr) => acc + parseInt(curr), 0)
            if (tempoSum * parseInt(repsOrDuraction.toString()) > 85) {
                repsOrDuraction = Math.floor(85 / tempoSum)
            }
        } else {
            repsOrDuraction = Math.ceil(parseInt(repsOrDuraction.toString()) / 5) * 5
        }
        includedTracker.push(randomExercise)

        return {
            name: randomExercise,
            tempo,
            rest: SCHEMES[scheme as keyof typeof SCHEMES]["rest"][setType === "compound" ? 0 : 1],
            reps: repsOrDuraction,
            ...exercises[randomExercise],
        }
    })

    return genWOD.filter(
        (element) => Object.keys(element).length > 0
    )
}

function shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

function exercisesFlattener(exercisesObj: Record<string, any>): Record<string, any> {
    const flattenedObj: Record<string, any> = {}

    for (const [key, val] of Object.entries(exercisesObj)) {
        if (!("variants" in val)) {
            flattenedObj[key] = val
        } else {
            for (const variant in val.variants) {
                let variantName = variant + "_" + key
                let variantSubstitutes = Object.keys(val.variants).map((element) => {
                    return element + ' ' + key
                }).filter(element => element.replace(/ /g, '_') !== variantName)

                flattenedObj[variantName] = {
                    ...val,
                    description: val.description + '___' + val.variants[variant],
                    substitutes: [
                        ...val.substitutes, variantSubstitutes
                    ].slice(0, 5)
                }
            }
        }
    }
    return flattenedObj
}