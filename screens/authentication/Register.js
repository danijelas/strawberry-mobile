import React, { Component } from 'react';
import {
  Container,
  Button,
  Content,
  Text,
  Form,
  Spinner
} from 'native-base';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import CustomTextInput from '../../components/CustomTextInput';
import CustomPickerInput from '../../components/CustomPickerInput';
import { required, email, minLength, equalTo } from '../../utilities/validators';
import { register } from '../../actions';
import { CURRENCY } from '../../constants';

class Register extends Component {

  static navigationOptions = {
    title: 'Register',
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {    
    if (this.props.isAuthenticated && !prevProps.isAuthenticated) {
      this.props.navigation.navigate('AppStack');
    }
  }

  async onSubmit(props) {
    this.props.register(props);
  }

  renderRegisterButton() {
    if (this.props.isLoading) {
      return <Spinner />;
    }

    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <Button
        block
        primary
        disabled={pristine || submitting}
        onPress={handleSubmit(this.onSubmit)}
      >
        <Text>Register</Text>
      </Button>
    );
  }

  renderForm() {
    return (
      <Form style={styles.form}>
        <Field
          name={'email'}
          component={CustomTextInput}
          placeholder={'email'}
          autoCorrect={false}
          autoCapitalize={'none'}
          validate={[required, email]}
        />
        <Field
          name={'password'}
          secureTextEntry
          component={CustomTextInput}
          placeholder={'password'}
          autoCorrect={false}
          autoCapitalize={'none'}
          ref={(input) => { this.password = input; }}
          validate={[required, minLength(6)]}
        />
        <Field
          name={'password_confirmation'}
          secureTextEntry
          component={CustomTextInput}
          placeholder={'password_confirmation'}
          autoCorrect={false}
          autoCapitalize={'none'}
          validate={[required, minLength(6), equalTo(this.password)]}
        />
        <Field
          name={'first_name'}
          component={CustomTextInput}
          placeholder={'first_name'}
          autoCorrect={false}
          autoCapitalize={'none'}
          validate={required}
        />
        <Field
          name={'last_name'}
          component={CustomTextInput}
          placeholder={'last_name'}
          autoCorrect={false}
          autoCapitalize={'none'}
          validate={required}
        />
        <Field
          name={'currency'}
          component={CustomPickerInput}
          placeholder={'currency'}
          items={CURRENCY}
        />
        {this.renderRegisterButton()}
      </Form>
    );
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content} scrollEnabled >
          <Text style={styles.errorTextStyle}>
            {this.props.errorMessage}
          </Text>
          {this.renderForm()}
        </Content>
      </Container>
    )
  }
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const RegisterForm = reduxForm({
  form: 'registerForm'  // a unique identifier for this form
})(Register);

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.loading
});

export default connect(mapStateToProps, { register })(RegisterForm);

const styles = {
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 5
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#FF0000'
  },
};
