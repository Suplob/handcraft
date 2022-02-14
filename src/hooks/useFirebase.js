import initializeAuthentication from "../firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "axios";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();
  const handlePasswordRegister = (name, email, password, history, location) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setError("");
        addUserToDb(name, email);
        const newUser = { email, name: name };
        setUser(newUser);
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            setError(error.mesage);
          });
        history.replace(location?.state?.from || "/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogIn = (email, password, history, location) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        history.replace(location?.state?.from || "/home");
        setUser(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.mesage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

  useEffect(() => {
    axios
      .get(`https://hand-craft-backend.herokuapp.com/users/${user.email}`)
      .then((res) => setAdmin(res.data.admin));
  }, [user.email]);

  const addUserToDb = (name, email) => {
    axios.post(`http://localhost:5000/addUserToDb`, {
      name,
      email,
      role: "user",
    });
  };

  return {
    handlePasswordRegister,
    isLoading,
    user,
    handleLogOut,
    error,
    setError,
    handleLogIn,
    admin,
  };
};

export default useFirebase;
