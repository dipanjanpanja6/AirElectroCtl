import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

type InitialState = {
  user: null;
  token: string | null;
  status: string | null;
};
const initialState: InitialState = {
  user: null,
  token: null,
  status: null,
};

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// Exporting data for selectors
export const getAuthState = (state: RootState) => state.auth;
export const {} = userAuthSlice.actions;

export function useGetAuthQuery() {
  const dispatch = useDispatch<AppDispatch>();

  // select the current status from the store state for the provided name
  const { status, user, token } = useSelector(getAuthState);

  // derive status booleans for ease of use
  const isUninitialized = status === null;
  const isLoading = status === 'pending' || status === null;
  const isFetching = status === 'pending';
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  useEffect(() => {
    if (!status) {
      console.log('call local sign in');
    } else if (status === 'fulfilled' && (!user || !token)) {
    }
  }, [status, dispatch]);

  // return the import data for the caller of the hook to use
  return { user, token, isUninitialized, isLoading, isError, isSuccess, isFetching };
}

export default userAuthSlice;
