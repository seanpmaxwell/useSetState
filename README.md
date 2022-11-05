# About useSetState-ts

Custom react hook which allows you to use a single object as the state instead of 
having to use multiple `useState` hooks.

- This was written in Typescript and is fully typesafe :)


#### Installation

- `npm i -s usesetstate-ts`


#### Sample code:

```typescript
import { useContext } from 'react';
import useSetState, { TSetState } from 'usesetstate-ts';


const LoginPageCxt = React.createContext<ILoginPageCxt>({
  state: { email: '', password: '' },
  setState: (_: Partial<IState>) => { return; },
});


interface ILoginPageCxt {
  state: IState;
  setState: TSetState<IState>; // setState type is exported incase you need it for any reason
}

interface IState {
  state: string;
  email: string;
}


function LoginPage(): JSX.Element {
  const [ state, setState ] = useSetState({
    email: '',
    password: '',
  });
  // Return
  return (
    <div>
      <LoginPageCxt.Provider value={{
        state,
        setState,
      }}>
        <input
          value={state.email}
          onChange={e => setState({ email: e.currentTarge.value })}
        />
        <input
          value={state.password}
          onChange={e => setState({ password: e.currentTarge.value })}
        />

        <SomeOtherChildComponent/>
      <LoginPageCxt.Provider>
    </div>
  );
}

function SomeOtherChildComponent() {
  const { state, setState } = useContext(ILoginPageCxt);
  return (
    <div>
      <button onClick={e => setState({ ... })} />
    </div>
  );
}
```
