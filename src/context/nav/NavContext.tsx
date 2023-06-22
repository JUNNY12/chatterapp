import { createContext, useState, SetStateAction } from 'react';

interface NavState {
   show: boolean;
   setShow: React.Dispatch<SetStateAction<boolean>>;
}

export const NavContext = createContext({} as NavState);

interface NavProviderProps {
   children: React.ReactNode;
}

export const NavProvider = ({ children }: NavProviderProps) => {
   const [show, setShow] = useState(false);
   return <NavContext.Provider value={{ show, setShow }}>{children}</NavContext.Provider>;
};
