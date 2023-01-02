import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

type InitialState = {
  data: null | Device[];
};
const initialState: InitialState = {
  data: null,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice(state, action) {
      if (!action.payload.mobile) return;
      const data = { ...action.payload, created_at: new Date().toISOString() };
      if (Array.isArray(state.data)) {
        const devices = new Set(state.data);
        devices.add(data);
        state.data = [...devices];
      } else state.data = [data];
    },
    deleteDevices(state, action) {
      if (!action.payload) return;
      if (action.payload === true) state.data = [];
      else state.data = state.data?.filter(d => d.mobile !== action.payload) || [];
    },
  },
});

// Exporting data for selectors
export const getDevicesState = (state: RootState) => state.devices;
export const { addDevice, deleteDevices } = devicesSlice.actions;

export function useGetDevicesQuery() {
  const dispatch = useDispatch<AppDispatch>();

  // select the current status from the store state for the provided name
  const { data } = useSelector(getDevicesState);

  // return the import data for the caller of the hook to use
  return {
    data,
    addDevice: (props: Device) => dispatch(addDevice(props)),
    deleteDevices: (props: string | boolean) => dispatch(deleteDevices(props)),
  };
}

export default devicesSlice;
