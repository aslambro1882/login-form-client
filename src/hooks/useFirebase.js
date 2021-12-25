import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.init';
import { useEffect } from 'react';

initializeAuthentication();
const useFirebase = () => {

    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState("");
    const [token, setToken] = useState("");

    const auth = getAuth();

    const signUpUser = (email, password, name, navigate) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setAuthError("");
                const newUser = { email, displayName: name };
                setUser(newUser);
                saveUser(email, name, 'POST')
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {


                });

                navigate('/user')
            }).catch((error) => {
                setAuthError(error.message)
                alert(error.message);
            }).finally(() => { })
    }

    const signInUser = (email, password, navigate) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                saveUser(email, password, 'PUT')
                alert('Sign In Successful');
                setAuthError('');
                navigate('/user')
            }).catch((error) => {
                setAuthError(error.message)
                console.log(error.message)
            }).finally(() => { })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user).then(idToken => {
                    setToken(idToken)
                }).catch(error => {
                    alert(error);
                })

            }
            else {
                setUser({});
            }
        });
        return () => unsubscribe;
    }, [auth])

    const logOut = () => {
        signOut(auth)
            .then((data) => {

            }).catch((error) => {

            }).finally(() => { })
    }

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        const auth = getAuth();
        const currentUser = auth.currentUser;
        console.log(currentUser);

        if (currentUser) {
            // const user = { email: currentUser.email, name: currentUser.displayName };
            getIdToken(currentUser).then(idToken => {
                console.log('hello', idToken);
                setToken(idToken)
                fetch('https://git.heroku.com/user-login-form-backend.git/users', {
                    method: method, /* <== This is POST method */
                    headers: {
                        'authorization': `Bearer ${idToken}`,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }).then((res) => {

                    res.json()


                })
                    .then(data => {
                        alert('Registraion Success')
                    })
            }).catch(error => {
                alert(error);
            })
        } else {

        }


    }

    return {
        user,
        signUpUser,
        logOut,
        signInUser
    }
};

export default useFirebase;