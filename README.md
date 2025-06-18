# Glocal Content Platform

A content management system designed for businesses with a global presence but a need for localized content.

## Overview

The Glocal Content Platform helps organizations manage their content across multiple regions and languages while maintaining brand consistency. The platform provides a centralized repository for content with powerful localization tools, version control, and analytics to ensure effective global communication with local relevance.

## Key Features

### 1. Centralized Content Repository
- **Version Control**: Track changes and manage different versions of content
- **Asset Management**: Store and organize media files associated with content
- **Content Relationships**: Link related content pieces across markets and languages
- **Bulk Operations**: Import/export functionality for efficient content management

### 2. Localization Tools
- **Translation Management**: Track translation status and manage workflows
- **Language Variants**: Support for different dialects and regional variations
- **Cultural Adaptation**: Tools for adapting content to local customs and preferences
- **Market-Specific Metadata**: Add region-specific keywords, descriptions, and tags

### 3. Content Variation Management
- **Regional Content Differences**: Track which elements vary by region
- **Conditional Content**: Display different content based on location/language
- **Approval Workflows**: Market-specific review and approval processes
- **Content Reuse**: Easily repurpose global content for local markets

### 4. Analytics Dashboard
- **Performance Metrics**: Track content engagement across regions
- **Comparison Tools**: Compare content performance between markets
- **Localization Insights**: Identify which adaptations are most effective
- **User Behavior Analysis**: Understand how users interact with content in different regions

## Technical Architecture

### Frontend
- React.js for the user interface
- TypeScript for type safety
- TailwindCSS for responsive styling
- React Context API for state management
- React Router for navigation

### Backend
- Node.js with Express for the API server
- MongoDB for flexible content storage
- Redis for caching frequently accessed content
- JWT for authentication and authorization

### Infrastructure
- Docker for containerization
- GitHub Actions for CI/CD
- AWS S3 for media storage
- CDN for global content delivery

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB
- Docker (optional for containerized development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dxaginfo/glocal-content-platform.git
cd glocal-content-platform
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. Access the application at http://localhost:3000

## Folder Structure

```
/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service integrations
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json        # Frontend dependencies
│
├── server/                 # Backend Node.js/Express application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # MongoDB schema definitions
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── package.json        # Backend dependencies
│
├── docker/                 # Docker configuration
│   ├── Dockerfile.client   # Frontend container definition
│   └── Dockerfile.server   # Backend container definition
│
├── .github/                # GitHub Actions workflows
├── docker-compose.yml      # Docker composition for local development
└── package.json            # Root package.json for scripts
```

## Implementation Plan

### Phase 1: Core Platform (Current)
- Basic content repository with CRUD operations
- User authentication and authorization
- Simple localization workflow
- Initial UI for content management

### Phase 2: Enhanced Localization
- Advanced translation workflow
- Cultural adaptation tools
- Region-specific metadata and tagging
- Content variation management

### Phase 3: Analytics & Optimization
- Performance tracking across regions
- Content effectiveness comparisons
- User behavior analysis
- Optimization recommendations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.