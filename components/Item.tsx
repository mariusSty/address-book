import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from './Text';

type ItemProps = { item: { id: string; name: string }; pathname: string };

export default function Item({ item, pathname }: ItemProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname,
          params: { id: item.id },
        })
      }>
      {({ pressed }) => (
        <View style={styles(pressed).itemLink}>
          <Text text={item.name} />
          <FontAwesome style={styles().itemArrow} name="chevron-right" size={20} color="#fafafa" />
        </View>
      )}
    </Pressable>
  );
}

const styles = (pressed?: boolean) =>
  StyleSheet.create({
    itemArrow: { verticalAlign: 'middle' },
    itemLink: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: pressed ? '#1e1e59' : '#00002b',
    },
  });
