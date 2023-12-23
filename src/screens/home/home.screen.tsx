import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { memo, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, StyleSheet, Modal, Pressable, Text, TouchableOpacity } from 'react-native';
import { IMainTabParamsList } from '../main';
import { IArticleType, useFetchArticle } from './hooks';
import { EIconType, HeaderFilter } from '../../shared';
import { ArticleListView } from './views';

export type IHomeScreenParamList = {};

export type IHomeScreenNavigationProp = NativeStackNavigationProp<
  IMainTabParamsList,
  'HomeScreen',
  undefined
>;
export type IHomeScreenRouteProp = RouteProp<IMainTabParamsList, 'HomeScreen'>;

type IHomeScreenProps = {
  navigation: IHomeScreenNavigationProp;
  route: IHomeScreenRouteProp;
};
const mock_data = [
  {
    buttonTitle: '전체 헤드라인',
    buttonIconType: EIconType.Calendar,
    selected: false,
    onPress: () => console.log(123),
  },
  {
    buttonTitle: '헤드라인',
    buttonIconType: EIconType.Search,
    selected: false,
    onPress: () => console.log(123),
  },
  {
    buttonTitle: '전드라인',
    selected: false,
    onPress: () => console.log(123),
  },
];

export const HomeScreen = memo<IHomeScreenProps>(() => {
  const [articleList, setArticleList] = useState<IArticleType[] | []>([]);
  const [modalVisible, setModalVisible] = useState(true);

  const { getData } = useFetchArticle({
    beginDate: '20220101',
    endDate: '20220102',
    page: 1,
    query: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();

      if (!data) return;

      setArticleList(data);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderFilter filters={mock_data} />
      <ArticleListView articleList={articleList} />
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity
            style={styles.background}
            activeOpacity={1}
            onPressOut={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
