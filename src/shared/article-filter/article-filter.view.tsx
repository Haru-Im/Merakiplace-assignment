import { memo, useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import { CalendarCheckSvgComponent, CtaButton, FilterOptionButton, scaleSize } from '..';
import dayjs from 'dayjs';
import { useModal } from '../../providers';
import { EGlocations, GLOCATIONS_KO, IFilter } from '../../types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IUseFetchArticleType } from '../../screens/home/hooks';

type IArticleFilterViewProps = {
  glocations: string[];
  applyFilter: (filterOptions: IUseFetchArticleType) => void;
  filter: IFilter;
};

export const ArticleFilterView = memo<IArticleFilterViewProps>(
  ({ glocations, applyFilter, filter }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [headline, setHeadline] = useState(filter.queryValue);
    const [selectedOptionButtonIndex, setSelectedOptionButtonIndex] = useState<number[]>(
      filter.countries.map((country) => {
        return glocations.indexOf(GLOCATIONS_KO[country as EGlocations]);
      }),
    );

    const { closeModal } = useModal();

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
      setSelectedDate(date);
      hideDatePicker();
    };

    const handlePressCalendar = () => {
      setDatePickerVisibility(true);
    };

    const selectedDateText = useMemo(() => {
      if (!selectedDate) return '날짜를 선택해주세요';

      const date = dayjs(selectedDate);
      const format = date.format('YYYY.MM.DD');
      const day = ['일', '월', '화', '수', '목', '금', '토'][date.day()];
      const formattedDate = `${format} (${day})`;

      return formattedDate;
    }, [selectedDate]);

    const searchArticleWithQuery = () => {
      let date = '';

      if (selectedDate) {
        date = dayjs(selectedDate).format('YYYYMMDD');
      }

      const selectedCountry = selectedOptionButtonIndex.map(
        (selectedIndex) => Object.values(EGlocations)[selectedIndex],
      );

      const filterOption = {
        beginDate: date,
        page: 1,
        query: headline,
        country: selectedCountry,
      };

      applyFilter(filterOption);

      closeModal();
    };

    return (
      <View style={styles.modalView}>
        <View style={styles.fieldContainer}>
          <Text>헤드라인</Text>
          <TextInput
            style={styles.input}
            onChangeText={setHeadline}
            value={headline}
            placeholder="검색하실 헤드라인을 입력해주세요."
            defaultValue={filter.queryValue}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text>날짜</Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Pressable onPress={handlePressCalendar}>
            <View style={styles.datebox}>
              <Text style={selectedDate ? [] : styles.placeholder}>
                {filter.dateValue || selectedDateText}
              </Text>
              <CalendarCheckSvgComponent fill={'#6D6D6D'} />
            </View>
          </Pressable>
        </View>
        <View style={styles.fieldContainer}>
          <Text>국가</Text>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', gap: scaleSize(8) }}>
            {glocations.map((glocation, i: number) => {
              const handlePressOptionButton = () => {
                if (selectedOptionButtonIndex.includes(i)) {
                  setSelectedOptionButtonIndex(selectedOptionButtonIndex.filter((e) => e !== i));
                } else {
                  setSelectedOptionButtonIndex([...selectedOptionButtonIndex, i]);
                }
              };

              const isSelected = selectedOptionButtonIndex.includes(i);

              return (
                <FilterOptionButton
                  key={i}
                  onPress={handlePressOptionButton}
                  buttonTitle={glocation}
                  selected={isSelected}
                  type="select"
                />
              );
            })}
          </View>
        </View>
        <CtaButton title="필터 적용하기" onPress={searchArticleWithQuery} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  modalView: {
    gap: scaleSize(40),
  },
  fieldContainer: {
    gap: scaleSize(8),
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  datebox: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: { color: '#C4C4C4' },
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
