import { UserStatus } from '../interfaces/users/user-status.interface';

export const setLocalStorageMembersList = (membersList: UserStatus[]) => {
  if (!localStorage.getItem('membersList')) {
    localStorage.removeItem('membersList');
  }
  let jsonObject = JSON.stringify(membersList);
  localStorage.setItem('membersList', jsonObject);
};
