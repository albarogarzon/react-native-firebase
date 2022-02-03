import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';

export const UsersList = (props) => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    firebase.db.collection('users').onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        users.push({ id: doc.id, name, email, phone });
      });
      setusers(users);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate('CreateUser')}
      />

      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate('UserDetail', {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri: 'https://randomuser.me/api/portraits/men/36.jpg',
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
});
