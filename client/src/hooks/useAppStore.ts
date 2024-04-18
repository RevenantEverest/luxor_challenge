import type { AppStore } from '@@store/index';
import { useStore } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppStore = useStore.withTypes<AppStore>();

export default useAppStore;