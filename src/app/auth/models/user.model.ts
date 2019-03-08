export interface User {
  uid: string;
  displayName: string;
  email: string;
  providerId: string;
  photoUrl: string;
  isNewUser?: boolean;
  isAdmin?: boolean;
  isOnline?: boolean;
}
