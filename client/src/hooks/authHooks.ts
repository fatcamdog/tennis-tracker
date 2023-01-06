import { useState } from 'react';
import axios from 'axios';

import { useAppDispatch } from './reduxHooks';
import { login, logout } from '../redux/auth';
import { IUser } from '../utils/interfaces';

interface IUserResponse {
  data: IUser;
}

// // Signup a user
export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const signupUser = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post<IUserResponse>(
        'http://localhost:4000/api/users/signup',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      setIsLoading(false);
      // add user to local storage and update auth state
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(login(data));
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) setError(error.response?.data);
      else setError('Unexpected error: ' + error);
    }
  };

  return { signupUser, isLoading, error };
};

// // Logout a user
export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // remove user from auth state
    dispatch(logout());
  };

  return { logoutUser };
};

// // Login a user
export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post<IUserResponse>(
        'http://localhost:4000/api/users/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      setIsLoading(false);
      // add user to local storage and update auth state
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(login(data));
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) setError(error.response?.data);
      else setError('Unexpected error: ' + error);
    }
  };

  return { loginUser, isLoading, error };
};
