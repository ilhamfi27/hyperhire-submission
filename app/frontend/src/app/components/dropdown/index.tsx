import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { GoChevronDown } from 'react-icons/go';

type DropdownProps<D = any> = {
  items: D[];
  selected?: string | null;
  onSelect?: (item: D | null) => void;
  renderItem?: (item: D) => any;
};

const Dropdown = <D,>({
  items = [],
  selected,
  onSelect,
  renderItem,
}: DropdownProps<D>) => {
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
          <DropdownMenu.Item
            className="px-5 py-3 text-base text-gray-800 hover:bg-gray-200 focus:outline-none"
            onSelect={() => onSelect && onSelect(null)}
          >
            Select Options
          </DropdownMenu.Item>
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={`${index}-${item}`}
              className="px-5 py-3 text-base text-gray-800 hover:bg-gray-200 focus:outline-none"
              onSelect={() => onSelect && onSelect(item)}
            >
              {renderItem ? renderItem(item) : item}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Item
            className="px-5 py-3 text-base text-gray-800 hover:bg-gray-200 focus:outline-none"
            onSelect={() => onSelect && onSelect(null)}
          >
            Create new menu
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
