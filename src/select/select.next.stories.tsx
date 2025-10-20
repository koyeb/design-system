import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dropdown, Menu, MenuItem } from '../dropdown/dropdown.next';
import { FieldHelperText, FieldLabel } from '../field/field.next';
import { controls } from '../utils/storybook';
import { Select, SelectToggleButton } from './select.next';

type Args = {
  label: string;
  size: 1 | 2 | 3;
  placeholder: string;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  helperText: string;
};

type Game = {
  name: string;
  released: string;
};

const games: Game[] = [
  { name: 'Pac-man', released: 'May 1980' },
  { name: 'Sonic', released: 'June 1991' },
  { name: 'Tetris', released: 'June 1984' },
  { name: 'Street Fighter', released: 'August 1987' },
  { name: 'Zelda', released: 'February 1886' },
  { name: 'Mario Bros', released: 'June 1983' },
  { name: 'Space Invaders', released: 'July 1998' },
  { name: 'Pong', released: 'November 1972' },
  { name: 'Donkey Kong', released: 'July 1981' },
];

const meta = {
  title: 'DesignSystem/SelectNext',
  args: {
    label: 'Favorite game',
    size: 2,
    placeholder: 'Pick a game',
    disabled: false,
    readOnly: false,
    invalid: false,
    helperText: '',
  },
  argTypes: {
    size: controls.inlineRadio([1, 2, 3]),
  },
  render: ({ label, size, placeholder, disabled, readOnly, invalid, helperText }) => (
    <Select
      select={{
        items: games,
      }}
      dropdown={{
        matchReferenceSize: true,
        offset: 8,
        flip: true,
      }}
      field={({ select }) => ({
        label: <FieldLabel {...select.getLabelProps()}>{label}</FieldLabel>,
        helperText: <FieldHelperText invalid={invalid} children={helperText} />,
        className: 'max-w-sm',
      })}
      toggleButton={({ select }) => (
        <SelectToggleButton
          size={size}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          invalid={invalid}
        >
          {select.selectedItem?.name}
        </SelectToggleButton>
      )}
      menu={({ select, dropdown }) => (
        <Dropdown dropdown={dropdown}>
          <Menu {...select.getMenuProps()}>
            {games.map((game, index) => (
              <MenuItem
                {...select.getItemProps({ item: game, index })}
                key={game.name}
                highlighted={index === select.highlightedIndex}
              >
                <span>{game.name}</span>
                <span className="text-dim ml-2">{game.released}</span>
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
      )}
    />
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
