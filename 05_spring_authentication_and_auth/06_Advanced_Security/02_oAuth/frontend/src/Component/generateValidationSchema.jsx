import * as Yup from 'yup';

const generateValidationSchema = (inputFields) => {
  const schema = {};

  inputFields.forEach(({ name, type, error, required, minLength, min, maxLength, label, placeholder, isMulti }) => {
    let validator;

    // Basic type setup
    
    if (type === 'checkbox') {
      validator = Yup.boolean().oneOf([true], `You must be ${label || name}`);
    }
    else if (type === "time") {
  validator = Yup.string();
}
    else if (type === 'email') {
      validator = Yup.string().email('Invalid email');
    } else if (type === 'url') {
      validator = Yup.string().url('Please enter a valid URL');
    } else if (type === 'number') {
      validator = Yup.number();
      if (minLength && maxLength) {
        validator = validator.test('len', 'Invalid Number', val =>
          val && val.toString().length >= minLength && val.toString().length <= maxLength
        );
      }
    }
    else if (type == 'date') {
      if (min != undefined || min != null){
        const minDate = new Date(min);
        minDate.setHours(0, 0, 0, 0);
        
        validator = Yup.date()
        .min(minDate, error ? error : 'Date must be today or future');
      }
}
    else {
      validator = Yup.string();
    }

    // Custom named fields
    if (isMulti) {
      validator = Yup.array()
        .of(Yup.string()) // each item is string (e.g., "Mon", "Tue")

      if (required) {
        validator = validator.min(1, `Select at least one ${label || name}`);
      }
    }
    if (name === 'confirmPassword') {
      validator = Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required(`${placeholder || 'Confirm Password'} is required`);
    }

    if (name === "end_time") {
  validator = Yup.string()
    .required("End Time is required")
    .test(
      "is-after-start",
      "End Time must be greater than Start Time",
      function (value) {
        const { start_time } = this.parent;

        if (!start_time || !value) return true;

        return value > start_time;
      }
    );
}
    // Apply required if specified
    if (required) {
      validator = validator?.required('This field is required');
    }

    schema[name] = validator;
  });

  return Yup.object().shape(schema);
};

export default generateValidationSchema;
