import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';

interface Props {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const KeywordFilter: React.VFC<Props> = ({ className, value, onChange }) => {
  const handleChange: TextFieldProps['onChange'] = (event) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      className={className}
      id="filter"
      name="filter"
      label="Filter Courses"
      placeholder="e.g. ML4T, 6501, Network..."
      size="small"
      autoComplete="filter"
      variant="filled"
      value={value}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default KeywordFilter;
