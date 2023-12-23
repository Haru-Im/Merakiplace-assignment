import { ReactNode, createContext, useContext, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

export type IModalContext = {
  openModal: ({ prop }: { prop: ReactNode }) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<IModalContext | null>(null);

type IModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = ({ prop }: { prop: ReactNode }) => {
    setModalVisible(true);
    setContent(prop);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <View style={styles.container}>
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
              <TouchableWithoutFeedback>
                <View style={styles.contentContainer}>{content}</View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('need Modal provider');
  }

  return context;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
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
  contentContainer: {
    width: Dimensions.get('screen').width - 24,
    minHeight: 400,
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
});
