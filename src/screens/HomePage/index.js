import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import HeaderComponent from '../../components/header';
import movie from '../../api/resources/movie';
import CardComponent from '../../components/card-component';

const HomePage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMovies().then();
  }, []);

  const getMovies = async () => {
    try {
      let response = await movie.popular(page);
      setData(response.data);
      console.log(response.data.results[0].title);
    } catch (e) {
      console.log(e);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <CardComponent
        key={item.id}
        value={item}
        navigation={navigation}
        routeName={'HomeDetailScreen'}
      />
    );
  };

  const LoadMoreRandomData = () => {
    setPage(page => page+1)
    getMovies().then();
  }

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent handleNavigate={navigation} backButton={false} />
      <FlatList
        data={data.results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        enableEmptySections={true}
        //ListFooterComponent={renderFooter}
        //onEndReached={handleGetDate}
        onEndReachedThreshold={0.5}
        onEndReached={LoadMoreRandomData}
      />
    </View>
  );
};
export default HomePage;
