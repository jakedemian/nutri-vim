import React from 'react';
import {
  Button,
  HStack,
  Input,
  ScrollView,
  Switch,
  Text,
  VStack,
} from 'native-base';
import * as Clipboard from 'expo-clipboard';

import useSettings from 'src/hooks/useSettings';
import FullScreenLoader from 'src/common/FullScreenLoader';
import { useLogging } from 'src/hooks/useLogging';
import { showSuccessToast } from 'src/common/toast';

const Settings: React.FC = () => {
  const { settings, isLoading, updateSetting } = useSettings();
  const { logs } = useLogging();

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

          <VStack width="100%" testID="debugging-section">
            <HStack
              alignItems="center"
              justifyContent="center"
              width="100%"
              p={4}
            >
              <Text fontSize={18} color="gray.500">
                - Debugging -
              </Text>
            </HStack>
            <VStack
              alignItems="flex-start"
              justifyContent="space-between"
              width="100%"
              p={4}
            >
              <HStack alignItems="center">
                <Text fontSize={18}>Logs</Text>
                <Button
                  variant={'ghost'}
                  ml={4}
                  onPress={() => {
                    Clipboard.setStringAsync(logs.join('\n')).then(() => {
                      showSuccessToast('Copied logs to clipboard!');
                    });
                  }}
                >
                  <Text color="primary.200">Copy Logs</Text>
                </Button>
              </HStack>
              <Input
                isReadOnly={true}
                multiline
                placeholder="Logs will be displayed here..."
                height={200}
                color="gray.400"
                value={logs.join('\n')}
              ></Input>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Settings;
