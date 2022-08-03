import React from 'react';

import { AuthProvider } from './auth';

interface IAppProvider {
  children: React.ReactNode;
}

const AppProvider: React.FC<IAppProvider> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
