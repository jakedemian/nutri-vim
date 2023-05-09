import React from 'react';
import { HStack, ScrollView, Switch, Text, View, VStack } from 'native-base';

import useSettings from 'src/hooks/useSettings';
import FullScreenLoader from 'src/common/FullScreenLoader';

const Settings: React.FC = () => {
  const { settings, isLoading, updateSetting } = useSettings();

  if (isLoading || !settings) {
    return (
      <HStack
        h="100%"
        justifyContent="center"
        alignItems="center"
        backgroundColor="primary.900"
      >
        <FullScreenLoader />
      </HStack>
    );
  }

  console.log(settings);
  // TODO trying to figure out why my settings aren't propogating when I hit the toggle

  return (
    <>
      <ScrollView backgroundColor={'primary.900'}>
        <VStack alignItems="center">
          <HStack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            p={4}
          >
            <Text fontSize={18}>Automatically Reset Daily</Text>
            <Switch
              size="lg"
              isChecked={settings.autoResetDaily.value as boolean}
              onToggle={value => updateSetting('autoResetDaily', value)}
            />
          </HStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Settings;
