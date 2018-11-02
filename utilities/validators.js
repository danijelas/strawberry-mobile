const required = value => (value ? undefined : 'Required');
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email' : undefined);
const minLength = min => value => (value && (value.length < min) ? `Min ${min} chars` : undefined);

function equalTo(field) {
  return function (value) {
    if (field !== undefined) {
      return ((field.value !== undefined) && (field.value !== value) ? `Must match ${field.props.label}` : undefined);
    }
    return undefined;
  };
}

export { required, email, minLength, equalTo };
