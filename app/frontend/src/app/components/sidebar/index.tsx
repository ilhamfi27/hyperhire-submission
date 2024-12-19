import { type SidebarMenus } from '../../../../@types/menu';

const Sidebar = () => {
  const menuItems: SidebarMenus[] = [
    {
      title: 'Systems',
      children: [
        { title: 'Menus', href: '#' },
        { title: 'System Code', href: '#' },
        { title: 'Properties', href: '#' },
        { title: 'API List', href: '#' },
      ],
    },
    { title: 'Users & Group', href: '#' },
    { title: 'Competition', href: '#' },
  ];

  const renderMenu = (items: SidebarMenus[], depth = 0) => {
    return (
      <ul
        className={`space-y-${depth === 0 ? 4 : 2} ${
          depth > 0 ? 'ml-4 mt-2' : ''
        }`}
      >
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.href || '#'}
              className={`flex items-center ${
                depth === 0
                  ? 'text-gray-400'
                  : 'p-2 rounded-lg hover:bg-gray-800'
              } ${depth > 0 && item.children ? 'justify-between' : ''}`}
            >
              <span>{item.title}</span>
            </a>
            {item.children && renderMenu(item.children, depth + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <aside className="bg-gray-900 text-white w-64 p-6 rounded-lg shadow-lg relative top-4 left-4">
      <div className="text-2xl font-bold mb-8">CLOIT</div>
      <nav>{renderMenu(menuItems)}</nav>
    </aside>
  );
};

export default Sidebar;