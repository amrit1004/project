import React from 'react';
import { Book } from 'lucide-react';

interface ReadingMaterialProps {
  content: string[];
  keywords: string[];
}

export const ReadingMaterial: React.FC<ReadingMaterialProps> = ({ content, keywords }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Book className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Reading Material</h3>
      </div>
      
      <div className="prose prose-purple max-w-none">
        {content.map((section, index) => (
          <div 
            key={index}
            dangerouslySetInnerHTML={{ __html: section }}
            className="mb-4 last:mb-0"
          />
        ))}
      </div>

      {keywords.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-2">Key Concepts:</p>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};