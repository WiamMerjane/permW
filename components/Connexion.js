import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Body from './Body';
import Profil from './Profil';
import Combinaison from './Combinaison';
import Deconnexion from './Deconnexion';
import APropos from './APropos';
import Recherche from './Recherche';

const Tab = createBottomTabNavigator();

const Connexion = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  const fetchUserProfile = async () => {
    try {
      if (!user) {
        return; // Quittez la fonction si la variable `user` est `null`
      }
  
      const response = await fetch('https://plain-teal-bull.cyclic.app/professeurs', {
        headers: {
          'Authorization': 'Bearer VOTRE_TOKEN', // Ajoutez votre token d'authentification si nécessaire
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const userProfile = data.find(profile => profile._id === user._id); // Trouvez le profil correspondant à l'utilisateur connecté
        setUser(userProfile);
        setIsLoggedIn(true);
      } else {
        Alert.alert('Erreur', 'Impossible de récupérer les informations du profil');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération du profil');
    }
  };
  // Effectuer la requête API une fois que l'utilisateur est connecté
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  // Update the handleConnexion function to set the user data correctly
  const handleConnexion = async () => {
    try {
      // Vérifiez les informations d'identification dans la base de données
      const response = await fetch('https://plain-teal-bull.cyclic.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }), // Assurez-vous que les propriétés sont correctement définies
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setIsLoggedIn(true);
        setUser({ ...data, isLoggedIn: true }); // Ajoutez la propriété isLoggedIn à l'objet utilisateur
      } else {
        Alert.alert('Erreur', data.message || 'Email ou mot de passe invalide');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion');
    }
  };


  if (isLoggedIn) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Accueil"
          component={Body}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Recherche"
          component={Recherche}
        />
        <Tab.Screen
          name="Profil"
          
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}
        >
          {() => <Profil loggedInUser={user} />}
        </Tab.Screen>
        <Tab.Screen
          name="À propos"
          component={APropos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="info" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleConnexion} />
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Connexion;
