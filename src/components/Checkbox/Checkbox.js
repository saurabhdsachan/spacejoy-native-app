import { COLORS, SIZES } from '@constants/index';
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
  labelStyle,
  bold,
}) => {
  const onClick = () => {
    if (onChange) onChange(value);
  };

  const border = useMemo(() => {
    return type === 'circle'
      ? { borderRadius: SIZES.radius, borderColor: iconColor }
      : { borderRadius: SIZES.radius / 3, borderColor: iconColor };
  }, [type, iconColor]);

  const buttonStyle = [!inline && styles.buttonStyle];
  const checkboxStyles = [styles.checkbox, border, inline && styles.inline, checkboxStyle];
  const labelStyles = [
    styles.label,
    inline && styles.labelInline,
    bold && styles.labelBold,
    !inline && { marginTop: SIZES.base },
    labelStyle,
  ];

  return (
    <Button raw onPress={onClick} style={buttonStyle}>
      <Block row={inline} center={inline}>
        <Block center middle flex={false} style={checkboxStyles} color={checked && bgColor}>
          {checked && (
            <Icon
              style={[styles.checkIcon, { color: bgColor ? COLORS.white : iconColor }, checkIconStyle]}
              name="checkmark-sharp"
            />
          )}
        </Block>
        <Block flex={false} style={[styles.label, labelBoxStyle]}>
          <Text style={labelStyles}>{label}</Text>
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
  buttonStyle: {
    height: 45,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
  },
  checkIcon: {
    fontSize: SIZES.h3,
    fontWeight: '700',
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    zIndex: 1,
  },
  labelInline: {
    marginLeft: SIZES.base,
  },
  labelBold: {
    fontWeight: 'bold',
  },
});

export default Checkbox;
