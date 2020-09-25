import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import AntDesign from "react-native-vector-icons/AntDesign";

function DrawerContent(props) {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avatar
          size="medium"
          rounded
          source={{
            uri:
              'https://lh3.googleusercontent.com/WIUyE28E4wXxC9UrE4B_db9io6tBtzBaVBs5SYpSsRQo3kr1rIlKADYnXZgXCr8dHZNrWmQ28P_vscrWxhFXOCJS_8qA7Qpnymllgy6JPivK48yNiH0juahm0A__JQSke3cj3jm1nWktOGFgqgiZQMkUkBi8pZjO7MVi8rMGSa_cwpeat2K4eddpLgti7_BNgXsk_1zzQHIBuqLVqLeB4lVmrdGStne5sic63Kh14HdN6LE13YI6Ihuw5OULovYXWzvdwVOUdi_CWRK_x08sjDbRSEv83uo0_h1FbZf5ZJc0rrdTPWeY8MX3QqZd7u9CZQ414DlP-fUEUHVjkuBzH4LnMLTmjG3L2zGB1yXgfQePU8hITT-q63MJSHQ6Tfm4dTmzXXS9R82Ea3bR16PkdK15-gkg--KUP2XEhrOVguq3k8A3ymn981PksLerGf3NOSzTn1ZNz_8kKJvGQxRpqgomN8K6yAtVS27lt79ZRfTMU5RF6iCpRUc4SxBKMVhi89jfrJHwkjPDLS4z4iGQso4WICRZQDecEoESZw_C9yZcZTvvEew5mgxC3xLvTz8A1ie8nx2tKuwovC5JQINw3aRqHS_2ueEyGn2sDYVXIz0C8l2EuWzdWXSvrjfqbTO1LgcjHFCWpR3KZbrK6AGTIJ9-9hlzS73z1gIr7glpWfIPlHx8DCznaowK_xBPig=w130-h215-no?authuser=0',
          }}
        />
        <Text style={styles.text}>김태형 선생님</Text>
      </View>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        icon={({focused, color, size}) => {
          return <AntDesign name='plus' color={color} size={size} />;
        }}
        label="학생추가"
        onPress={() => props.navigation.navigate('학생추가')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: 0.25,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fceaf0',
  },
  content: {
    backgroundColor: 'white',
  },
  text: {
    paddingTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default DrawerContent;
