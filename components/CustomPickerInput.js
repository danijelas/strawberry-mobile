import _ from 'lodash';
import React, { Component } from 'react';
import { Picker as AndroidPicker, Platform } from 'react-native';
import { Picker } from 'native-base';
// import { Palette } from '../styles';
import PropTypes from 'prop-types';

/**
 * to be wrapped with redux-form Field component
 */
class CustomPickerInput extends Component {

  constructor(props) {
    super(props);
  }

  renderPicker() {
    const { input, placeholder } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <Picker
          style={styles.pickerStyle}
          iosHeader="Select"
          supportedOrientations={['portrait', 'landscape']}
          mode="dropdown"
          selectedValue={input.value}
          onValueChange={input.onChange}
          placeholder={placeholder}
          textStyle={_.isEmpty(input.value) ? styles.pickerPlaceholderStyle : styles.pickerTextStyle}
        >
          {
            (this.props.placeholder == 'currency') ? this.props.items.map(item =>
                  <Picker.Item key={item.id} value={item.name} label={item.name} />
                ) : this.props.items.map(item =>
                  <Picker.Item key={item.id} value={item.id} label={item.name} />
                )
          }
        </Picker>
      );
    }

    return (
      <AndroidPicker
        style={styles.pickerStyle}
        selectedValue={input.value}
        onValueChange={input.onChange}
      >
        {
          (this.props.placeholder == 'currency') ? this.props.items.map(item =>
                <Picker.Item key={item.id} value={item.name} label={item.name} />
              ) : this.props.items.map(item =>
                <Picker.Item key={item.id} value={item.id} label={item.name} />
              )
        }
      </AndroidPicker>
    );
  }

  render() {
    return this.renderPicker();
  }

}

export default CustomPickerInput;

CustomPickerInput.propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired
  }).isRequired
};

const styles = {
  pickerStyle: {
    borderBottomWidth: 1,
    // borderBottomColor: '#f0f0f0',
    borderBottomColor: '#ffffff',
    // flex: 1,
    alignSelf: 'flex-start',
  },
  pickerTextStyle: {
    color: '#000000',
    marginLeft: -10,
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
    fontSize: 17,
  },
  pickerPlaceholderStyle: {
    color: '#575757',
    // color: '#000000',
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
    fontSize: 17,
    marginLeft: -10,
  },
  invalid: {
    color: '#FF0000',
  }
};
// <Picker.Item value="EUR" label="EUR" />
// <Picker.Item value="RSD" label="RSD" />
