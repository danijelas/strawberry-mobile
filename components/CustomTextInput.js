import _ from 'lodash';
import React from 'react';
import { Item, Input, Text, Icon } from 'native-base';
// import { Palette } from '../styles';
import PropTypes from 'prop-types';

/**
 * to be wrapped with redux-form Field component
 */
export default function CustomTextInput(props) {
  const { input, meta, itemStyle, inputStyle, ...inputProps } = props;

  const hasError = ((meta.touched && !meta.active) && !_.isNil(meta.error));
  const isSuccess = ((meta.touched && !meta.active) && _.isNil(meta.error));
  const mergedInputStyle = { ...styles.input, ...inputStyle };

  return (
    <Item error={hasError} success={isSuccess} style={styles.item}>
      <Input
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={mergedInputStyle}
      />
      {hasError && (!_.isNil(meta.error) && <Text style={styles.invalid}>{meta.error}</Text>) }
      {isSuccess && (<Icon name="checkmark-circle" />)}
    </Item>
  );
}

CustomTextInput.propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    error: PropTypes.string,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    visited: PropTypes.bool.isRequired
  }).isRequired
};

const styles = {
  item: {
    marginLeft: 0,
    marginBottom: 5,
  },
  input: {
    color: '#000',
  },
  invalid: {
    color: '#FF0000',
  }
};
