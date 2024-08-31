import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { collection, doc, getDocs } from 'firebase/firestore';
import { Database } from '../../firebase';
import { useAuth } from './UserAuthContext';

const useUserLocation = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default location
    longitude: -122.4324,
    latitudeDelta: 0.01, // Increase zoom level
    longitudeDelta: 0.01, // Increase zoom level
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização', 'Precisamos da sua permissão para acessar a localização.');
        setHasPermission(false);
        return;
      }
      setHasPermission(true);
    };

    const watchLocation = async () => {
      if (hasPermission) {
        try {
          await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              distanceInterval: 10, // Atualiza a cada 10 metros
              timeInterval: 5000, // Atualiza a cada 5 segundos
            },
            (position) => {
              const { latitude, longitude } = position.coords;
              setRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.003, // Zoom nível alto
                longitudeDelta: 0.003, // Zoom nível alto
              });
            },
            (error) => {
              setErrorMsg(error.message);
            }
          );
        } catch (error) {
          setErrorMsg(error.message);
        }
      }else{
        getLocationPermission();
      }
    };

    getLocationPermission().then(() => watchLocation());
  }, [hasPermission]);

  return { region, errorMsg, hasPermission };
};

export default useUserLocation;
