import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Today from 'src/screens/Today';
import { ModalContext } from 'src/context/ModalContext';
import List from 'src/screens/List';
import { PRIMARY } from 'src/theme/theme';

const Tab = createBottomTabNavigator();

const RootNavigator: React.FC = () => {
  const { showAddEntryModal, showClearDayModal } = useContext(ModalContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#5260ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => showClearDayModal()}
              style={{ paddingHorizontal: 10 }}
            >
              <Ionicons name="trash" size={36} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => showAddEntryModal()}
              style={{ paddingHorizontal: 10 }}
            >
              <Ionicons name="add" size={36} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Today') {
            iconName = focused ? 'today' : 'today-outline';
          } else if (route.name === 'List') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveBackgroundColor: '#444',
        tabBarInactiveBackgroundColor: '#333',
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Today" component={Today} />
      <Tab.Screen name="List" component={List /* List */} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
