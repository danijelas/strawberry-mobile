import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Spinner
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import CustomTextInput from '../../components/CustomTextInput';
import { required, email, minLength } from '../../utilities/validators';
import { login } from '../../actions';

class Login extends Component {
  
  static navigationOptions = {
    title: 'Login',
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

  onSubmit(props) {
    this.props.login(props);
  }

  renderLoginButton() {
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
        <Text>Login</Text>
      </Button>
    );
  }

  renderRegisterButton() {
    return (
      <Button
        primary
        bordered
        block
        style={styles.registerBtn}
        onPress={() => { this.props.navigation.push('Register'); }}
      >
        <Text>Register</Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Text style={styles.errorTextStyle}>
            {this.props.errorMessage}
          </Text>
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
              validate={required}
            />
             {this.renderLoginButton()}
             <Text>or</Text>
             {this.renderRegisterButton()}
          </Form>
        </Content>
      </Container>
    );
  }

}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const LoginForm = reduxForm({
  form: 'loginForm'  // a unique identifier for this form
})(Login);


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.error,
  isLoading: state.auth.loading
});

export default connect(mapStateToProps, { login })(LoginForm);

const styles = {
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex: 1,
    alignItems: 'center',
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
  registerBtn: {
    alignSelf: 'center'
  }
};