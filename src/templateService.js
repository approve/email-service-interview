const { template } = require('lodash');
const { EmailType } = require('./constants');

/**
 * Email templates with placeholder support
 */
const templates = {
  [EmailType.WELCOME]: {
    subject: 'Welcome to {{companyName}}, {{name}}!',
    body: `
      <html>
        <body>
          <h1>Welcome {{name}}!</h1>
          <p>We're excited to have you join {{companyName}}.</p>
          <p>Your account has been created successfully.</p>
          <p>Login URL: {{loginUrl}}</p>
          <p>Best regards,<br>The {{companyName}} Team</p>
        </body>
      </html>
    `
  },

  [EmailType.REMINDER]: {
    subject: 'Reminder: {{title}}',
    body: `
      <html>
        <body>
          <h2>Reminder: {{title}}</h2>
          <p>Hello {{name}},</p>
          <p>This is a friendly reminder about: {{description}}</p>
          <p>Due Date: {{dueDate}}</p>
          <p>Please take action before the deadline.</p>
          <p>Best regards,<br>System Notifications</p>
        </body>
      </html>
    `
  },

  [EmailType.NOTIFICATION]: {
    subject: 'Notification: {{type}}',
    body: `
      <html>
        <body>
          <h2>{{type}} Notification</h2>
          <p>Hello {{name}},</p>
          <p>{{message}}</p>
          <p>Timestamp: {{timestamp}}</p>
          <p>Reference ID: {{referenceId}}</p>
        </body>
      </html>
    `
  }
};

/**
 * Template service for email generation
 */
class TemplateService {
  
  /**
   * Get available template types
   */
  getAvailableTypes() {
    return Object.keys(templates);
  }

  /**
   * Check if template type exists
   */
  hasTemplate(emailType) {
    return templates.hasOwnProperty(emailType);
  }

  /**
   * Generate email content from template
   */
  generateEmail(emailType, templateData) {
    if (!this.hasTemplate(emailType)) {
      throw new Error(`Template not found for email type: ${emailType}`);
    }

    const emailTemplate = templates[emailType];

    try {
      // Compile and render subject
      const subjectTemplate = template(emailTemplate.subject);
      const subject = subjectTemplate(templateData);

      // Compile and render body
      const bodyTemplate = template(emailTemplate.body);
      const body = bodyTemplate(templateData);

      return {
        subject: subject.trim(),
        body: body.trim()
      };
    } catch (error) {
      throw new Error(`Template rendering failed: ${error.message}`);
    }
  }

  /**
   * Validate template data has required fields
   */
  validateTemplateData(emailType, templateData) {
    if (!this.hasTemplate(emailType)) {
      throw new Error(`Template not found for email type: ${emailType}`);
    }

    const requiredFields = this.getRequiredFields(emailType);
    const missingFields = requiredFields.filter(field => 
      !templateData.hasOwnProperty(field) || 
      templateData[field] === null || 
      templateData[field] === undefined
    );

    if (missingFields.length > 0) {
      throw new Error(`Missing required template fields: ${missingFields.join(', ')}`);
    }

    return true;
  }

  /**
   * Extract required fields from template
   */
  getRequiredFields(emailType) {
    if (!this.hasTemplate(emailType)) {
      return [];
    }

    const emailTemplate = templates[emailType];
    const content = emailTemplate.subject + ' ' + emailTemplate.body;
    
    // Extract placeholders like {{fieldName}}
    const placeholderRegex = /\{\{(\w+)\}\}/g;
    const fields = new Set();
    let match;

    while ((match = placeholderRegex.exec(content)) !== null) {
      fields.add(match[1]);
    }

    return Array.from(fields);
  }
}

module.exports = TemplateService;
