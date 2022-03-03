import React, { useEffect } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useAppDispatch, useAppSelector } from '../hooks';

const LoadingScreen = () => 
{
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.userToken)
  useEffect(() => {
    const bootstrapAsync = async () => {
      dispatch({ type: 'RESTORE_TOKEN', token: token})
    };
              
    bootstrapAsync();
  });
return (
    <Dimmer active>
      <Loader />
    </Dimmer>
)}

export default LoadingScreen