import storage from '../utils/storage';

export const checkAuth = (user = storage.getUser()) => {
    if(user?.tokenExpiration < Date.now()) {
      storage.clearUser();
      window.location.href = "/login";
      return;
    }
}