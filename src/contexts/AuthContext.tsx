import { createContext, ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signOutGoogle:() => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const history = useHistory();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
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
    console.log("entrou signInWithGoogle");
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

   

    if (result.user) {
      const { displayName, photoURL, uid, } = result.user;

      //const {user:u, credential:cre} = result;
      //console.log({u});
      //console.log({cre});

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  async function signOutGoogle() {
    await auth.signOut();
    setUser(undefined);
    history.push(`/`);
  }
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}