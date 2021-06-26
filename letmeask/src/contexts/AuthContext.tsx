import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){

  const [user, setUser] = useState<User>();

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error ('Missing information from google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })      
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

      if(result.user) {
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL) {
          throw new Error ('Missing information from google Account');
        }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })      
    }
  }

  return(
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}

/*
useEffect - dispara uma determinada função sempre que "algo" acontecer.
 recebe uma função e em seguida um array onde definimos o que ficaremos observando
 a fim de decidir quando a função será chamada.
 Se desejarmos que o useEffect seja disparado uma única vez basta deixar o array vazio.

 arrow functions - ()=> {}

 onAuthStateChanged - EventListener ou Observer
 sempre que adicionamos um EventListener a useEffect é boa prática salva-lo
 em uma variável e desligar o EventListener.
 Ao final sempre retornar no useEffect uma função que remova o cadastro de todos os 
 EventListeners existentes.
 */