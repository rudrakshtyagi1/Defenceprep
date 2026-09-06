import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dp-bg flex flex-col items-center justify-center p-8 text-center relative">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative">
        {/* Big 404 */}
        <div
          className="text-8xl md:text-9xl font-black mb-4 gradient-accent select-none"
        >
          404
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-dp-primary mb-3">
          Page Not Found
        </h1>
        <p className="text-dp-secondary max-w-sm mb-8 text-sm md:text-base">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">
            <Home size={16} />
            Go Home
          </Link>
          <Link to="/papers" className="btn-secondary">
            <ArrowLeft size={16} />
            Browse Papers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
