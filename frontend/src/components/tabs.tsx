import { useState } from 'react';

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const ActiveComponent = tabs.find(tab => tab.label === activeTab).component;

  return (
    <div>
      <div className="flex space-x-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`py-2 px-4 ${
              activeTab === tab.label
                ? 'border-b-2 border-blue-600 font-semibold'
                : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        <ActiveComponent />
      </div>
    </div>
  );
}

export default Tabs;
