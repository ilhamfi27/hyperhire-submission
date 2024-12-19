import { FaFolder } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex items-end mb-8">
      <FaFolder className="text-gray-400 w-6 h-6" />
      <div className="text-gray-400 ml-2">/ Menus</div>
    </header>
  );
};

export default Header;
