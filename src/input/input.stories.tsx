import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, FieldHelperText, FieldLabel } from '../field/field';
import { controls } from '../utils/storybook';
import { Input, InputEnd, InputStart } from './input';

type Args = {
  size: 1 | 2 | 3;
  label: string;
  placeholder: string;
  helperText: string;
  value: string;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  start: boolean;
  end: boolean;
};

const meta = {
  title: 'DesignSystem/Input',
  args: {
    size: 2,
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: '',
    value: '',
    disabled: false,
    readOnly: false,
    invalid: false,
    start: false,
    end: false,
  },
  argTypes: {
    size: controls.inlineRadio([1, 2, 3]),
  },
  render: ({ size, label, placeholder, helperText, value, disabled, readOnly, invalid, start, end }) => (
    <Field
      label={<FieldLabel>{label}</FieldLabel>}
      helperText={<FieldHelperText invalid={invalid}>{helperText}</FieldHelperText>}
      className="max-w-sm"
    >
      <Input
        value={value}
        size={size}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        start={start && <InputStart>Start</InputStart>}
        end={end && <InputEnd>End</InputEnd>}
      />
    </Field>
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
