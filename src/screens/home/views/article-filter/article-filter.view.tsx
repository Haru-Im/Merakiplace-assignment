import { memo, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type IArticleFilterViewProps = {};

export const ArticleFilterView = memo<IArticleFilterViewProps>(({}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const showDatePicker = () => {
    console.log(123);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.modalView}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.modalText}>Hello</Text>
      <Pressable style={[styles.button, styles.buttonClose]}>
        <Text style={styles.textStyle}>Hide Modal</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
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
