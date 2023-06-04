import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Profil = ({ loggedInUser }) => {
  if (!loggedInUser || !loggedInUser.nom || !loggedInUser.prenom || !loggedInUser.email || !loggedInUser.tel) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.error}>Erreur lors du chargement du profil</Text>
      </View>
    );
  }

  const { nom, prenom, email, tel } = loggedInUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nom:</Text>
        <Text style={styles.value}>{nom}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Prénom:</Text>
        <Text style={styles.value}>{prenom}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Téléphone:</Text>
        <Text style={styles.value}>{tel}</Text>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Profil;
