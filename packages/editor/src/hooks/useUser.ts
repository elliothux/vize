import { getCurrentUser } from 'api';
import { usePromise } from './usePromise';

export function useUser() {
  return usePromise(async () => {
    const [success, user] = await getCurrentUser();
    if (success && user) {
      return user;
    }
    return null;
  }, []);
}
