const DOG_IMAGE_API = "https://dog.ceo/api";
const DOG_FACT_API = "https://dogapi.dog/api/v2";

export async function getDogImageByBreed({ breed, sub_breed, amount=1, signal=null}) {
    try {
        const response = await fetch(
            `${DOG_IMAGE_API}/breed/${[breed, sub_breed].join(
                "/"
            )}/images/random/${amount}`, {signal}
        );
        const json = await response.json();

        if (json.status !== "success")
            throw new Error("Error retrieving an image from the database");

        return json.message;
    } catch (error) {
        console.error(error);
    }
}

export async function getDogRandomImage({amount=1, signal=null}) {
    try {
        const response = await fetch(
            `${DOG_IMAGE_API}/breeds/image/random/${amount}`, {signal}
        );
        const json = await response.json();

        if (json.status !== "success")
            throw new Error("Error retrieving an image from the database");

        return json.message;
    } catch (error) {
        console.error(error);
    }
}

export async function getDogFact({limit=1, signal=null}) {
    try {
        const response = await fetch(`${DOG_FACT_API}/facts?limit=${limit}`, {signal});
        const json = await response.json();

        return json.data?.map((factData) => {
            return factData.attributes.body
        })
    } catch (error) {
        console.error(error);
    }
}
