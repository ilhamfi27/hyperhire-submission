import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FC } from 'react';
import { GoChevronDown } from 'react-icons/go';

type DropdownProps = {
  items: string[];
  selected?: string | null;
  onSelect?: (item: string) => void;
};

const Dropdown: FC<DropdownProps> = ({ items = [], selected, onSelect }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="bg-gray-200 px-4 py-2 rounded-md shadow-md text-sm font-medium hover:bg-gray-300 focus:outline-none flex items-center space-x-2">
        <span>{selected ?? 'Select Options'}</span> <GoChevronDown />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className="bg-gray-100 rounded-lg shadow-lg w-96"
        >
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={`${index}-${item}`}
              className="px-5 py-3 text-base text-gray-800 hover:bg-gray-200 focus:outline-none"
              onSelect={() => onSelect && onSelect(item)}
            >
              {item}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
