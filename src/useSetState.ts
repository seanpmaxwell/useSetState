import { useState, useCallback } from 'react';


// **** Types **** //

export type TSetState<T> = (newPartialState: Partial<T>) => void;


// **** Functions **** //

/**
 * Do setState like react class component, // [state, setCustomState, resetState]
 */
export function useSetState<T extends {}>(
  initState: T,
): [T, (arg: Partial<T>) => void, (arg?: Partial<T>) => void] {
  const [ state, setState ] = useState<T>(initState);
  // "setState" function
  const setCustomState = useCallback((newPartialState: Partial<T>) => {
    return setState(prevState => ({ ...prevState, ...newPartialState }));
  }, []);
  // "resetState" function
  const resetState = useCallback((partialState: Partial<T> = {}) => {
    return setState(() => ({ ...initState, ...partialState }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Return
  return [state, setCustomState, resetState];
};


// **** Export Default **** //

export default useSetState;
