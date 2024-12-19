import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import TreeMenu from '../components/tree-menu';
import MenusForm from '../components/forms/menus/main-form';

const App = () => {
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

export default App;
