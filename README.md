# Email Service - Senior Node.js Developer Interview

## Task Overview
Build a simplified email management service that can schedule and send emails with template support. This task is designed to assess your Node.js skills and system design thinking.

Validate you have Node 20 installed

### Core Functionality

#### 1. Email Operations
- **Create Email**: Store email data with scheduling information
- **Update Email**: Modify email status and metadata

#### 2. Email Scheduling & Sending
- **Immediate Send**: Send emails right away
- **Scheduled Send**: Send emails at a future date/time

### Technical Requirements

#### Data Model
Your email records should include:
```typescript
  Email {
  id: string;
  emailType: string;         // Template identifier
  recipients: string[];      // Email addresses
  subject: string;
  templateData: object;      // Data for template interpolation
  sendOn: Date;              // When to send (null = immediate)
  status: string;            // pending, sent, failed
  from?: string;             // Sender email
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  error?: string;            // Error message if failed
}
```

#### Template System
- Support at least 2 email templates (e.g., "welcome", "reminder")
- Use simple placeholder replacement (e.g., `{{name}}`, `{{date}}`)
- Templates should be configurable (not hardcoded)

#### Email Sending
- Mock the actual email sending (don't use real SMTP)
- Log email sending attempts with success/failure
- Handle sending errors gracefully

### Technical Stack
- **Node.js** with **Express.js**
- **In-memory storage** (arrays/objects) for simplicity
- Standard npm packages are allowed (lodash, moment, etc.)

### Constraints
- No database setup required - use in-memory storage
- No authentication/authorization required
- No real email sending - mock it with console logs
- Focus on clean code structure and error handling
- Include basic input validation

## Deliverables

**Working Node.js application**. BONUS - test coverage

## Time Expectation
- **1 hour** for implementation

Good luck!
