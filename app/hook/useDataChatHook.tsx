import {useContext} from 'react';
import { DataContext } from '../context/dataContext';

export function useDataChatHook() {
  const context = useContext(DataContext);

  return context;
}