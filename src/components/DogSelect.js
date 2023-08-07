import { useState } from "react"
import DogBreeds from "../constants/DogBreeds.json"

import ListSelect from "./ListSelect"
import Dog from "./Dog"

import { useDogImageUrl, useDogFact } from "../hooks/dogHooks"

export default function DogSelect() {
    const [selectedBreed, setSelectedBreed] = useState({})

    const [dogImageUrl, refreshDog] = useDogImageUrl()
    const [dogFact] = useDogFact()

    const subBreeds = selectedBreed.breed ? DogBreeds[selectedBreed.breed] : []

    function handleBreed(newBreed) {
        setSelectedBreed({breed: newBreed})
    }

    function handleSubBreed(newBreed) {
        const newSelectedBreed = {...selectedBreed, sub_breed: newBreed} 
        setSelectedBreed(newSelectedBreed)
    }

    if (subBreeds.length === 1) handleSubBreed(subBreeds[0])

    return (
        <>
            <ListSelect
                labelText="Selecciona la raza"
                arrayToMap={Object.keys(DogBreeds)}
                initialValue={selectedBreed.breed}
                handleChange={handleBreed} >
            </ListSelect>

            {
                subBreeds.length > 0 &&
                <ListSelect
                    labelText="Selecciona la sub-raza"
                    arrayToMap={subBreeds}
                    initialValue={selectedBreed.sub_breed}
                    handleChange={handleSubBreed} >
                </ListSelect>
            }

            {selectedBreed.breed &&
                <>
                    <Dog imageUrl={dogImageUrl} fact={dogFact}></Dog>
                    <button onClick={() => refreshDog()}>Actualizar</button>
                </>
            }
        </>
    )
}