'use client';

import React from 'react';
import Sidebar from '../../sidebar';
import Header from '../../header';
import TreeMenu from '../../tree-menu';
import MenusForm from '../../forms/menus/main-form';

const MenuPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Header />
        <div className="flex space-x-10">
          <TreeMenu />
          <MenusForm />
        </div>
      </main>
    </div>
  );
};

export default MenuPage;
