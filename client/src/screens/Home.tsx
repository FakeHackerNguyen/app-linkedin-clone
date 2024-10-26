import React from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResultSearch from '../components/ResultSearch';
import Post from './features/post/Post';
import CustomSearchHeaderDrawer from '../components/CustomSearchHeaderDrawer';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {Store} from '../redux/store';

type HomeProps = {
  navigation: DrawerNavigationProp<any>;
};

export default function Home({navigation}: HomeProps): React.JSX.Element {
  const {isSearchFocus} = useSelector((state: Store) => state.search);

  return (
    <SafeAreaView className="bg-white flex-1">
      <CustomSearchHeaderDrawer navigation={navigation} />
      {isSearchFocus ? (
        <ResultSearch />
      ) : (
        <FlatList
          className="bg-[#eaeaea]"
          data={[1, 2]}
          renderItem={({item}) => <Post data={item} />}
          keyExtractor={(_, index) => index.toString()}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              enableSomeButton();
            }
          }}
          scrollEventThrottle={400}
        />
      )}
    </SafeAreaView>
  );
}
