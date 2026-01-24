import React, { type ReactElement } from 'react';
import { DocsGPTWidget } from 'docsgpt';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function DocsGPTChat(): ReactElement | null {
  const { siteConfig } = useDocusaurusContext();
  const apiKey = siteConfig.customFields?.docsGptApiKey as string;

  // Don't render if no API key configured
  if (!apiKey) {
    return null;
  }

  return (
    <DocsGPTWidget
      apiHost="https://gptcloud.arc53.com"
      apiKey={apiKey}
      title="Ask AI"
      description="Get instant answers about DP Systems documentation"
      heroTitle="Welcome!"
      heroDescription="Ask me anything about DP Systems products"
      theme="dark"
      buttonBg="#1b5e20"
      size="medium"
      showSources={true}
    />
  );
}
