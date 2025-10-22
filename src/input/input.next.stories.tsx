import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field } from '../field/field';
import { FieldHelperText, FieldLabel } from '../field/field.next';
import { controls } from '../utils/storybook';
import { Input, InputEnd, InputStart } from './input.next';

type Args = {
  label: string;
  size: 1 | 2 | 3;
  placeholder: string;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  helperText: string;
  start: boolean;
  end: boolean;
};

const meta = {
  title: 'DesignSystem/InputNext',
  args: {
    label: 'Label',
    size: 2,
    placeholder: 'Placeholder',
    disabled: false,
    readOnly: false,
    invalid: false,
    helperText: '',
    start: false,
    end: false,
  },
  argTypes: {
    size: controls.inlineRadio([1, 2, 3]),
  },
  render: ({ label, size, placeholder, disabled, readOnly, invalid, helperText, start, end }) => (
    <Field
      label={<FieldLabel>{label}</FieldLabel>}
      helperText={<FieldHelperText invalid={invalid}>{helperText}</FieldHelperText>}
      className="max-w-sm"
    >
      <Input
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
