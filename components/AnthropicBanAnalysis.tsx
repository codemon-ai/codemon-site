'use client';

import React, { useState } from 'react';

export default function AnthropicBanAnalysis() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    { 
      id: 1, 
      title: 'Commercial Service Implications', 
      content: 'Anthropic\'s Commercial Terms strictly prohibit wrapping their API into a direct commercial competitor (Foundation Models). Building vertical applications or internal tools is generally safe, but creating a direct conversational AI interface wrapper carries significant ban risk if it directly competes with Claude.ai.' 
    },
    { 
      id: 2, 
      title: 'Data Privacy & Training', 
      content: 'Unlike the consumer-facing Claude.ai interface, Anthropic explicitly states they do not use customer data submitted via the API for training their base models. This guarantees enterprise data privacy when building via the API.' 
    },
    { 
      id: 3, 
      title: 'Rate Limits & Fair Use', 
      content: 'Exceeding the specified tier-based rate limits (Tokens Per Minute / Requests Per Minute) will result in throttling. Sustained abuse or bypassing rate limits using multiple accounts can trigger automated fraud detection systems, leading to API suspension.' 
    },
    { 
      id: 4, 
      title: 'Prohibited Use Cases', 
      content: 'Usage involving explicit content, self-harm, weapons development, automated political campaigning, or performing illegal acts is actively monitored and strictly prohibited. Violations lead to immediate termination and permanent bans.' 
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden my-6 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
      <div className="bg-gray-50 dark:bg-neutral-800 px-4 py-3 border-b border-gray-200 dark:border-neutral-800 font-semibold text-gray-800 dark:text-gray-200">
        Anthropic API Risk Assessment Matrix
      </div>
      {sections.map((section, index) => (
        <div key={section.id} className={`${index !== 0 ? 'border-t border-gray-200 dark:border-neutral-800' : ''}`}>
          <button
            className="w-full text-left px-5 py-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 flex justify-between items-center transition-colors focus:outline-none"
            onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">{section.title}</span>
            <span className="text-gray-500 dark:text-gray-400 text-xl font-light">
              {openSection === section.id ? '−' : '+'}
            </span>
          </button>
          {openSection === section.id && (
            <div className="px-5 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
