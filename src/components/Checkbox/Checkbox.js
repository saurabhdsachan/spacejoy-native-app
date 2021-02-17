import { theme } from '@constants/';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Block, Button, Text } from '..';

const Checkbox = ({
  label,
  value,
  checked,
  onChange,
  type = 'square',
  bgColor = 'transparent',
  iconColor = '#000',
  inline = true,
  checkboxStyle,
  checkIconStyle,
  labelBoxStyle,
  lableStyle,
  bold,
}) => {
  const onClick = () => {
    if (onChange) onChange(value);
  };

  const border = useMemo(() => {
    if (type === 'circle') {
      return { borderRadius: theme.SIZES.radius, borderColor: iconColor };
    } else {
      return { borderRadius: 2, borderColor: iconColor };
    }
  }, [type, iconColor]);

  const checkboxStyles = [styles.checkbox, border, inline && styles.inline, checkboxStyle];
  const labelStyles = [styles.label, inline && styles.labelInline, bold && styles.labelBold, lableStyle];

  return (
    <Button raw onPress={onClick}>
      <Block row={inline} center={inline} style={!inline && { marginTop: theme.SIZES.padding / 2 }}>
        <Block center middle flex={false} style={checkboxStyles} color={bgColor}>
          {checked && <Icon style={[styles.checkIcon, { color: iconColor }, checkIconStyle]} name="checkmark-sharp" />}
        </Block>
        <Block flex={false} style={[styles.label, labelBoxStyle]}>
          <Text style={[labelStyles]}>{label}</Text>
        </Block>
      </Block>
    </Button>
  );
};

const CheckboxGroup = ({ checkedValues, onChange, children }) => {
  const [userCheckedValues, setUserCheckedValues] = useState([]);

  useEffect(() => {
    setUserCheckedValues(checkedValues);
  }, [checkedValues]);

  const onClick = (value) => {
    let updatedArray = [...userCheckedValues];
    if (checkedValues.includes(value)) {
      updatedArray = updatedArray.filter((checkedValue) => checkedValue !== value);
    } else {
      updatedArray = [...updatedArray, value];
    }
    if (!checkedValues) {
      setUserCheckedValues(updatedArray);
    } else {
      setUserCheckedValues(updatedArray);
    }
    onChange(updatedArray);
  };

  return (
    <>
      {children.map((child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onChange: onClick,
            checked: userCheckedValues.includes(child.props?.value),
          });
        } else {
          return child;
        }
      })}
    </>
  );
};

Checkbox.Group = CheckboxGroup;

const styles = StyleSheet.create({
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  checkIcon: {
    fontSize: theme.SIZES.h3,
    fontWeight: '700',
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    zIndex: 1,
    height: 20,
  },
  labelInline: {
    marginTop: 0,
    marginLeft: theme.SIZES.base,
  },
  labelBold: {
    fontWeight: 'bold',
  },
});

export default Checkbox;
