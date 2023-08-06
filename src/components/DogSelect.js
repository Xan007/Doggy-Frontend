import { useState } from "react"
import DogBreeds from "../constants/DogBreeds.json"

import ListSelect from "./ListSelect"
import Dog from "./Dog"

import { useDogImageUrl, useDogFact } from "../hooks/dogHooks"

export default function DogSelect() {
    const [dogPath, setDogPath] = useState({ path: [] })
    const [selectedBreed, setSelectedBreed] = useState([])

    const [dogImageUrl, refreshDog] = useDogImageUrl(dogPath)
    const [dogFact] = useDogFact({ imageUrl: dogImageUrl })

    const subBreeds = selectedBreed.length > 0 ? DogBreeds[selectedBreed[0]] : []

    function handleBreed(newBreed) {
        setSelectedBreed([newBreed])

        if (DogBreeds[newBreed].length === 0) {
            setDogPath({ path: ["breed", newBreed, "images", "random"] })
        }
    }

    function handleSubBreed(newBreed) {
        setSelectedBreed([...selectedBreed.slice(0, 1), newBreed])

        setDogPath({ path: ["breed", selectedBreed[0], newBreed, "images", "random"] })
    }

    if (selectedBreed.length === 1 && subBreeds.length === 1) handleSubBreed(subBreeds[0])

    return (
        <>
            <ListSelect
                labelText="Selecciona la raza"
                arrayToMap={Object.keys(DogBreeds)}
                initialValue={selectedBreed[0]}
                handleChange={handleBreed} >
            </ListSelect>

            {
                subBreeds.length > 0 &&
                <ListSelect
                    labelText="Selecciona la sub-raza"
                    arrayToMap={subBreeds}
                    initialValue={selectedBreed[1]}
                    handleChange={handleSubBreed} >
                </ListSelect>
            }

            {dogPath.path.length !== 0 &&
                <>
                    <Dog imageUrl={dogImageUrl} fact={dogFact}></Dog>
                    <button onClick={() => refreshDog()}>Actualizar</button>
                </>
            }
        </>
    )
}