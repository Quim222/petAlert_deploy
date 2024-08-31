import React, { createContext, useContext } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';

// Criar um contexto para o Google Maps API
const GoogleMapsContext = createContext(null);

export const GoogleMapsProvider = ({ apiKey, children }) => {
  return (
    <GoogleMapsContext.Provider value={apiKey}>
      <APIProvider apiKey={apiKey}>
        {children}
      </APIProvider>
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};
