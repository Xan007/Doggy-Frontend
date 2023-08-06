import { useEffect, useState } from "react";

const DOG_API = "https://dog.ceo/api"

// path is an array
const getImageUrl = async (path) => {
    try {
        const response = await fetch(`${DOG_API}/${path.join("/")}`)
        const json = await response.json()

        return json.message
    } catch (error) {
        console.error(error)
    }
}

const getDogFact = async () => {
    try {
        const response = await fetch("https://dog-api.kinduff.com/api/facts")
        const json = await response.json()

        if (!json.success) throw new Error("No success from dog-api")

        return json.facts[0]
    } catch (error) {
        console.error(error)
    }
}

export function useDogImageUrl({ path }) {
    const [imageUrl, setImageUrl] = useState();

    const refreshDog = () => {
        getImageUrl(path).then((url) => {
            setImageUrl(url)
        })
    }

    useEffect(() => {
        if (!path) return

        let ignore = false

        getImageUrl(path).then((url) => {
            if (!ignore) setImageUrl(url)
        })

        return () => {
            ignore = true
        }
    }, [path])

    return [imageUrl, refreshDog]
}

export function useDogFact({ imageUrl }) {
    const [fact, setFact] = useState()

    useEffect(() => {
        let ignore = false

        getDogFact().then((fact) => {
            if (!ignore)
                setFact(fact)
        })

        return () => {
            ignore = true
        }
    }, [imageUrl])

    return [fact]
}