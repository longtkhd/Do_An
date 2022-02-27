const validator = {
  validateEmail: (rule: any, value: any) => {
    /*eslint-disable */
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    /*eslint-enable */
    if (value && !emailRegex.test(value)) {
      return Promise.reject('Not a valid email!');
    } else {
      return Promise.resolve();
    }
  },
};

export default validator;
