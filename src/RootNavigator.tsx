import React, { useContext } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme, Icon, IconButton, Text } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

import Today from 'src/screens/Today';
import { ModalContext } from 'src/context/ModalContext';
import List from 'src/screens/List';

const Tab = createBottomTabNavigator();
const TAB_FOCUS_COLOR = '#fff';
const TAB_BLUR_COLOR = '#aaa';

const RootNavigator: React.FC = () => {
  const { showAddEntryModal, showClearDayModal } = useContext(ModalContext);
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colors.primary[500],
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveBackgroundColor: '#2a2a2a',
        tabBarInactiveBackgroundColor: '#222',
        tabBarInactiveTintColor: 'gray',
        headerRight: () => (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <IconButton
              variant="ghost"
              icon={<Icon as={FontAwesome5} name="undo-alt" color="#fff" />}
              onPress={() => showClearDayModal()}
              p={4}
            />

            <IconButton
              variant="ghost"
              icon={<Icon as={FontAwesome5} name="plus" color="#fff" />}
              onPress={() => showAddEntryModal()}
              p={4}
            />
          </View>
        ),
        tabBarLabel: ({ focused }) => {
          let text = '';
          let color = '';

          if (route.name === 'Today') {
            text = 'Today';
            color = focused ? TAB_FOCUS_COLOR : TAB_BLUR_COLOR;
          } else if (route.name === 'List') {
            text = 'List';
            color = focused ? TAB_FOCUS_COLOR : TAB_BLUR_COLOR;
          }

          return (
            <Text fontSize={12} mt={-2} mb={1} color={color} fontWeight={700}>
              {text}
            </Text>
          );
        },
        tabBarIcon: ({ focused /*, color, size*/ }) => {
          let iconName = '';
          let color = '';

          if (route.name === 'Today') {
            iconName = focused ? 'calendar-day' : 'calendar';
            color = focused ? TAB_FOCUS_COLOR : TAB_BLUR_COLOR;
          } else if (route.name === 'List') {
            iconName = focused ? 'th-list' : 'list';
            color = focused ? TAB_FOCUS_COLOR : TAB_BLUR_COLOR;
          }

          return (
            <Icon as={FontAwesome5} name={iconName} color={color} size={6} />
          );
        },
      })}
    >
      <Tab.Screen name="Today" component={Today} />
      <Tab.Screen name="List" component={List} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
