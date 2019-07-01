import React, { Component } from 'react';
import {View, TextInput, Image } from 'react-native';
import {Icon} from 'native-base';
import styles from './Styles/SearchStyles';
const Search = (props) => {
  return (
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search1" type="AntDesign" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder = {props.children}
          underlineColorAndroid="transparent"
        />
      </View>
  )
}

export { Search };