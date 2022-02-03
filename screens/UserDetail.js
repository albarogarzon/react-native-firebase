import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import firebase from '../database/firebase';

export const UserDetail = (props) => {
  console.log(props.route.params.userId);

  const initialState = {
    id: '',
    name: '',
    email: '',
    phone: '',
  };
  const [user, setUser] = useState(initialState);

  const [loading, setloading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection('users').doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setloading(false);
  };
  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const deleteUser = async () => {
    const dbRef = firebase.db
      .collection('users')
      .doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate('UserList');
  };

  const updateUser = async () => {
    const dbRef = firebase.db.collection('users').doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setUser(initialState)
    props.navigation.navigate('UserList');
  };

  const openConfirmationAlert = () => {
    Alert.alert('Remove User', 'Are you sure?', [
      { text: 'Yes', onPress: () => deleteUser() },
      { text: 'No', onPress: () => console.log('No') },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name user"
          value={user.name}
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email user"
          value={user.email}
          onChangeText={(value) => handleChangeText('email', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone user"
          value={user.phone}
          onChangeText={(value) => handleChangeText('phone', value)}
        />
      </View>
      <View>
        <Button title="Update user" onPress={() => updateUser()} />
      </View>
      <View>
        <Button
          color="#E37399"
          title="Delete user"
          onPress={() => openConfirmationAlert()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});
