
import type { JSX } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownContent = `
# Getting Started with ReachDem

Welcome to ReachDem! We're excited to have you on board. This guide will walk you through the basics of setting up your workspace and launching your first campaign.

## 1. Setting up your Workspace

The first step is to configure your workspace. Navigate to the settings page and fill in your company details. This information will be used to personalize your campaigns.

## 2. Importing Contacts

You can import contacts in bulk using a CSV file. Go to the "Contacts" section and click "Import". Make sure your CSV has headers and is properly formatted.

## 3. Creating your first Campaign

Once you have your audience ready, head over to "Campaigns" and click "New Campaign". Choose a template or start from scratch. Our editor is quite intuitive!

## 4. Tracking Performance

After launching a campaign, you can track its performance in real-time. Check the "Analytics" tab to see open rates, click-through rates, and other key metrics.

## Need more help?
Visit our [Support Page](/support) if you have any questions or encounter any issues.
`;

export default function GettingStartedDoc(): JSX.Element {
  return (
    <div className="bg-sand-100 min-h-screen py-16 md:py-24">
      <div className="container max-w-2xl prose prose-neutral prose-lg bg-background rounded-xl p-10 shadow-sm font-neue">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
