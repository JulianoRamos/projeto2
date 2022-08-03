import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { useCookies } from 'react-cookie';

import api from '../services/api';

interface IAuthState {
  token: string;
  user: IUserData;
}

interface IUserData {
  id: number;
  name: string;
  acronym: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  isLogin: () => boolean;
  user: IUserData;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signUp(): void;
  updateUser(token: string, acronym: string): Promise<void>;
}

interface IAuthProvider {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [, setCookie, removeCookie] = useCookies(['WLTOKEN']);

  const definitionOfAuthenticationDataInHeader = useCallback(
    (token: string, acronym: string) => {
      const headers = {
        'auth-key': process.env.REACT_APP_AUTH_KEY || '',
        'sigla-usuario': acronym,
        token,
      };

      api.defaults.headers = headers;

      setCookie('WLTOKEN', token, {
        path: '/',
        sameSite: 'none',
        domain: '.grupopardini.com.br',
        secure: true,
      });
    },
    [setCookie],
  );

  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@BPlus-Rastreabilidade:token');
    const user = localStorage.getItem('@BPlus-Rastreabilidade:user');
    const acronym = localStorage.getItem('@BPlus-Rastreabilidade:acronym');

    if (token && user && acronym) {
      definitionOfAuthenticationDataInHeader(token, acronym);

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      const response = await api.post('session', { email, password });

      const { token, user, acronym } = response.data;

      localStorage.setItem('@BPlus-Pre-Analitico:token', token);
      localStorage.setItem('@BPlus-Pre-Analitico:acronym', acronym);
      localStorage.setItem('@BPlus-Pre-Analitico:user', JSON.stringify(user));

      definitionOfAuthenticationDataInHeader(token, acronym);

      setData({ token, user });
    },
    [definitionOfAuthenticationDataInHeader],
  );

  const signUp = useCallback(() => {
    localStorage.removeItem('@BPlus-Pre-Analitico:token');
    localStorage.removeItem('@BPlus-Pre-Analitico:acronym');
    localStorage.removeItem('@BPlus-Pre-Analitico:user');
    removeCookie('WLTOKEN');

    setData({} as IAuthState);
  }, [removeCookie]);

  const updateUser = useCallback(
    async (token: string, acronym: string) => {
      definitionOfAuthenticationDataInHeader(token, acronym);

      const response = await api.get<IUserData>(
        '/csp/preanaliticoRest/Autenticar/CriarToken',
      );

      const user: IUserData = {
        ...response.data,
        acronym,
      };

      localStorage.setItem('@BPlus-Pre-Analitico:token', token);
      localStorage.setItem('@BPlus-Pre-Analitico:acronym', acronym);
      localStorage.setItem('@BPlus-Pre-Analitico:user', JSON.stringify(user));

      setData({ token, user });
    },
    [definitionOfAuthenticationDataInHeader],
  );

  const isLogin = useCallback(() => {
    return !!data.token;
  }, [data]);

  const value = useMemo(() => {
    return {
      user: data.user,
      isLogin,
      signIn,
      signUp,
      updateUser,
    };
  }, [data.user, isLogin, signIn, signUp, updateUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
