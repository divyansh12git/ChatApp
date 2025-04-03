import { createContext, useState, ReactNode  } from 'react';
import {userlist} from '@/lib/utils/users'
interface User {
  id: number;
  name: string;
  newMessageCount:number;
  lastmessage:string;
  profilePictureURL: string;
}

interface UserContextType {
  users: Array<User> ;
  setUser: React.Dispatch<React.SetStateAction<User[]>>;
}

// Create the context
const UserContext = createContext<UserContextType | null>(null);;

// Create a provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUser] = useState<User[] >(userlist);

  return (
    <UserContext.Provider value={{ users, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
