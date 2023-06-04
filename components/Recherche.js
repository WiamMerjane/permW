import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Recherche = () => {
    const [specialties, setSpecialties] = useState([]);
    const [cities, setCities] = useState([]);
    const [specialty, setSpecialty] = useState('');
    const [desiredCity, setDesiredCity] = useState('');
    const [currentCity, setCurrentCity] = useState('');
  
    useEffect(() => {
      const fetchSpecialties = async () => {
        try {
          const response = await fetch('https://plain-teal-bull.cyclic.app/professeurs');
          const data = await response.json();
          const specialtiesList = [...new Set(data.map((professor) => professor.specialite))];
          setSpecialties(specialtiesList);
        } catch (error) {
          console.error('Erreur lors de la récupération des spécialités :', error);
          Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération des spécialités');
        }
      };
  
      const fetchCities = async () => {
        try {
          const response = await fetch('https://plain-teal-bull.cyclic.app/professeurs'); // Remplacez par l'URL de votre API pour récupérer les villes
          const data = await response.json();
          setCities(data.cities); // Assurez-vous que votre API renvoie les villes dans un format approprié
        } catch (error) {
          console.error('Erreur lors de la récupération des villes :', error);
          Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération des villes');
        }
      };
  
      fetchSpecialties();
      fetchCities();
    }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://plain-teal-bull.cyclic.app/professeurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ specialty, desiredCity, currentCity }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle the retrieved data
        console.log('Search results:', data);
      } else {
        Alert.alert('Error', data.message || 'Failed to perform search');
      }
    } catch (error) {
      console.error('Error during search:', error);
      Alert.alert('Error', 'An error occurred during the search');
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={specialty}
        onValueChange={(itemValue) => setSpecialty(itemValue)}
      >
        <Picker.Item label="Select a specialty" value="" />
        {specialties.map((specialty) => (
          <Picker.Item key={specialty} label={specialty} value={specialty} />
        ))}
      </Picker>

      <Picker
  style={styles.picker}
  selectedValue={currentCity}
  onValueChange={(itemValue) => setCurrentCity(itemValue)}
>
  <Picker.Item label="Select current city" value="" />
  {cities.map((city) => (
    <Picker.Item key={city} label={city} value={city} />
  ))}
</Picker>

<Picker
  style={styles.picker}
  selectedValue={desiredCity}
  onValueChange={(itemValue) => setDesiredCity(itemValue)}
>
  <Picker.Item label="Select desired city" value="" />
  {cities.map((city) => (
    <Picker.Item key={city} label={city} value={city} />
  ))}
</Picker>
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 200,
    marginBottom: 10,
  },
});

export default Recherche;
