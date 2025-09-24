import { Spinner } from '@koyeb/design-system';
import { UseComboboxReturnValue } from 'downshift';

import { CommandPalette, PaletteItem } from './use-command-palette';

type SearchInputProps = {
  palette: CommandPalette;
  combobox: UseComboboxReturnValue<PaletteItem>;
};

export function SearchInput({ palette, combobox }: SearchInputProps) {
  const { Icon, placeholder, value } = palette.input;

  return (
    <div className="row items-center gap-2 border-b px-3">
      {Icon && (
        <div>
          <Icon className="size-5 text-dim" />
        </div>
      )}

      <input
        autoFocus
        placeholder={placeholder}
        size={3}
        className="w-full py-3 outline-none"
        {...combobox.getInputProps({
          onKeyDown(event) {
            if (value === '') {
              if ((event.key === 'ArrowLeft' || event.key === 'Backspace') && palette.canGoBack) {
                palette.pop();
              }

              const item = palette.highlightedItem;

              if (event.key == 'ArrowRight' && item?.hasSubItems) {
                void palette.execute(item);
              }
            }
          },
        })}
      />

      {palette.loading && (
        <div>
          <Spinner className="size-5 text-dim" />
        </div>
      )}
    </div>
  );
}
