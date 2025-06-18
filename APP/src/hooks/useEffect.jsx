// useEffectOnce.ts
import { useEffect, useRef } from "react";

export const useEffectOnce = (effect, depadancy) => {
    const hasRun = useRef(false);
    useEffect(() => {
        if (!hasRun.current) {
            hasRun.current = true;
            return effect();
        }
    }, [depadancy]);
};
