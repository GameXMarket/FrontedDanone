import { useEffect, useRef } from "react";

type EffectType = () => void
type Dependencies = Array<any>

export function useEffectAfterMount(effect: EffectType, deps: Dependencies) {
    const isMounted = useRef(false);
  
    useEffect(() => {
      if (isMounted.current) return effect();
      else isMounted.current = true;
    }, deps);
  
    // reset on unmount; in React 18, components can mount again
    useEffect(() => () => {
      isMounted.current = false;
    }, []);
  }