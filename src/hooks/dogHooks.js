import { useCallback, useEffect, useState, useRef } from "react";

import {
    getDogImageByBreed,
    getDogFact,
    getDogRandomImage,
} from "../services/dogService.js";

export function useDogImageUrl() {
    const [imageUrl, setImageUrl] = useState();
    const abortControllerRef = useRef();

    const refreshDog = useCallback((breed_info) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        let retrieveFunction;

        if (breed_info && breed_info.breed !== undefined) {
            retrieveFunction = () =>
                getDogImageByBreed({
                    ...breed_info,
                    signal: controller.signal,
                });
        } else {
            retrieveFunction = () =>
                getDogRandomImage({ signal: controller.signal });
        }

        retrieveFunction().then((url) => {
            if (controller.signal.aborted) return;
            setImageUrl(url);
        });
    }, []);

    return [imageUrl, refreshDog];
}

export function useDogFact() {
    const [fact, setFact] = useState();
    const abortControllerRef = useRef();

    const refreshFact = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        getDogFact({ signal: controller.signal }).then((dogFact) => {
            if (controller.signal.aborted) return;
            setFact(dogFact);
        });
    }, []);

    return [fact, refreshFact];
}
