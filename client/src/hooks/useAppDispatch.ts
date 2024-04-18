import type { AppDispatch } from '@@store/index';
import { useDispatch } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;