import React from 'react';
import { Outlet } from 'react-router-dom';

// Minimal layout for test-taking — no navbar, no footer
const TestLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-dp-bg flex flex-col">
      <Outlet />
    </div>
  );
};

export default TestLayout;
