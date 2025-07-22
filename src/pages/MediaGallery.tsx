import React from 'react';

const MediaGallery: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Media Gallery</h1>
        <p className="text-gray-600 dark:text-gray-400">Upload and organize photos and videos from matches and training</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <p className="text-gray-600 dark:text-gray-400">Media gallery coming soon...</p>
      </div>
    </div>
  );
};

export default MediaGallery;