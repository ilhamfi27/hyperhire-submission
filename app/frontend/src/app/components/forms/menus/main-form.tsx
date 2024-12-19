const MenusForm = () => {
  return (
    <form className="bg-white rounded-lg shadow p-8 space-y-4 w-[48%]">
      <div>
        <label className="block text-gray-600 mb-1">Menu ID</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 text-gray-600 bg-gray-50"
          value="56320ee9-6af6-11ed-a7ba-f220afe5e4a9"
          disabled
        />
      </div>
      <div>
        <label className="block text-gray-600 mb-1">Depth</label>
        <input
          type="number"
          className="w-full border rounded-lg p-2 text-gray-600 bg-gray-50"
          value="3"
          disabled
        />
      </div>
      <div>
        <label className="block text-gray-600 mb-1">Parent Data</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 text-gray-600 bg-gray-50"
          value="Systems"
          disabled
        />
      </div>
      <div>
        <label className="block text-gray-600 mb-1">Name</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 text-gray-600 bg-gray-50"
          value="System Code"
          disabled
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
};

export default MenusForm;
