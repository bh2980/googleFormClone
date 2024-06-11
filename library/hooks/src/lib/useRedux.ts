import { Store } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

export const useRedux = <store extends Store>() => {
  const useAppDispatch: () => store['dispatch'] = useDispatch;
  const useAppSelector: TypedUseSelectorHook<ReturnType<store['getState']>> = useSelector;

  return { useDispatch: useAppDispatch, useSelector: useAppSelector };
};
