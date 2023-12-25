import { ReactNode, createContext, useContext, useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { scaleSize } from '../../shared';

export type IModalContext = {
  openModal: ({ prop }: { prop: ReactNode }) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<IModalContext | null>(null);

type IModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modalVisible, setModalVisible] = useState(false);
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
              <View style={styles.contentPadding}>
                <View style={styles.contentContainer}>
                  {/* <View style={{ width: 100, height: 400, backgroundColor: 'red' }} /> */}
                  {content}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
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
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentPadding: {
    paddingHorizontal: scaleSize(20),
    width: '100%',
  },
  contentContainer: {
    width: '100%',
    minHeight: 200,
    backgroundColor: 'white',
    padding: scaleSize(20),
    borderRadius: 20,
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
