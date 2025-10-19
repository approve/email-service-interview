const EmailStore = require('./emailStore');
const TemplateService = require('./templateService');
const EmailSender = require('./emailSender');
const { EmailStatus, EmailType } = require('./constants');

/**
 * Main email service that orchestrates email operations
 */
class EmailService {
  constructor() {
    this.emailStore = new EmailStore();
    this.templateService = new TemplateService();
    this.emailSender = new EmailSender();
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
  }

  //  implement your solution here
}

module.exports = EmailService;
