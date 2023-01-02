import { isRejectedWithValue } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger = api => next => action => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.log('We got a rejected action!');
    // Alert.alert(action.error.data.message, [{ text: 'OK' }]);
  }

  return next(action);
};
