import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { loaderReducer, startLoading, stopLoading } from './loadingSlice';
import { userReducer } from './userSlice';


export const store = configureStore({
  reducer:{
    user:userReducer,
    [api.reducerPath] : api.reducer,
    loader: loaderReducer
   
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(api.middleware).concat((storeAPI)=>(next)=>(action)=>{
      const {dispatch} = storeAPI;

      if(action.type.endsWith('/pending')){
        dispatch(startLoading());
      }
      if(action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'))
      {
        dispatch(stopLoading());
      }
   
      return next(action);
    })
});