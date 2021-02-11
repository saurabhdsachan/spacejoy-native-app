import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';

const Dropdown = ({ data, onChange, value }) => {
  const [formattedData, setFormattedData] = useState([]);
  useEffect(() => {
    const dataToRender = data.map((item) => {
      const { slug = '' } = item;
      const capitalizedlabel = slug.charAt(0).toUpperCase().concat(slug.substring(1, slug.length));
      return { ...item, label: `${capitalizedlabel} $${item?.salePrice.value}`, value: item?.slug };
    });

    setFormattedData(dataToRender);
  }, [data]);
  return (
    <RNPickerSelect
      items={formattedData}
      onValueChange={onChange}
      value={value}
      style={pickerSelectStyles}
      Icon={() => {
        return <Icon name="chevron-down-outline" size={14} color="#FA6400" />;
      }}
    />
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
export default Dropdown;
