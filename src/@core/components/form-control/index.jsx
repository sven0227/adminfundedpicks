import React from 'react'
import Input from './Input'
import PasswordInput from './password'
import SelectForm from './select'
// import Textarea from './Textarea';
// import Checkbox from './Checkbox';
// import MultiSelect from './Select/Multi';
// import SimpleInput from './Input/Simple_Input';
// import DatePicker from './DatePicker';
// import TimePicker from './TimePicker';
// import RangeInput from './RangeInput';
// import TagsInput from './TagsInput';

const FormControl = props => {
  const { inputType, ...rest } = props
  switch (inputType) {
    case 'input':
      return <Input {...rest} />
    // case 'simpleInput':
    //   return <SimpleInput {...rest} />;
    case 'select':
      return <SelectForm control={props.control} {...rest} />
    // case 'multiSelect':
    //   return <MultiSelect {...rest} />;
    // case 'tags':
    //   return <TagsInput {...rest} />;
    // case "checkbox":
    //   return <Checkbox {...rest} />;
    // // case "radio":
    // //   return <Radio {...rest} />;
    case 'password':
      return <PasswordInput {...rest} />
    // case "textarea":
    //   return <Textarea {...rest} />;
    // case "date":
    //   return <DatePicker {...rest} />;
    // case "time":
    //   return <TimePicker {...rest} />;
    // case "range":
    //   return <RangeInput {...rest} />;
    default:
      return <Input {...rest} />
  }
}

export default FormControl
