import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, FieldHelperText, FieldLabel } from '../field/field';
import { TextArea } from './textarea';

type Args = {
  label: string;
  placeholder: string;
  helperText: string;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
};

const meta = {
  title: 'DesignSystem/TextArea',
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: '',
    disabled: false,
    readOnly: false,
    invalid: false,
  },
  render: ({ label, placeholder, helperText, disabled, readOnly, invalid }) => (
    <Field
      label={<FieldLabel>{label}</FieldLabel>}
      helperText={<FieldHelperText invalid={invalid}>{helperText}</FieldHelperText>}
      className="max-w-sm"
    >
      <TextArea placeholder={placeholder} disabled={disabled} readOnly={readOnly} invalid={invalid} />
    </Field>
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
