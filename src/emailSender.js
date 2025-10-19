const { EmailStatus } = require('./constants');

/**
 * Mock email sender service
 * In a real application, this would integrate with SMTP or email service provider
 */
class EmailSender {
  constructor() {
    this.sentEmails = [];
    this.failureRate = 0.1; // 10% failure rate for testing
  }

  /**
   * Send an email (mocked)
   */
  async sendEmail(email) {
    console.log(`📧 Sending email to: ${email.recipients.join(', ')}`);
    console.log(`📧 Subject: ${email.subject}`);
    console.log(`📧 From: ${email.from || 'noreply@company.com'}`);
    
    // Simulate network delay
    await this.delay(100 + Math.random() * 200);

    // Simulate occasional failures
    if (Math.random() < this.failureRate) {
      const error = new Error('SMTP connection failed');
      console.error(`❌ Email sending failed: ${error.message}`);
      throw error;
    }

    // Log successful send
    const sentEmail = {
      ...email,
      sentAt: new Date(),
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    this.sentEmails.push(sentEmail);
    console.log(`✅ Email sent successfully. Message ID: ${sentEmail.messageId}`);
    
    return {
      success: true,
      messageId: sentEmail.messageId,
      sentAt: sentEmail.sentAt
    };
  }

  /**
   * Get history of sent emails (for testing/debugging)
   */
  getSentEmails() {
    return [...this.sentEmails];
  }

  /**
   * Clear sent email history
   */
  clearHistory() {
    this.sentEmails = [];
  }

  /**
   * Set failure rate for testing
   */
  setFailureRate(rate) {
    this.failureRate = Math.max(0, Math.min(1, rate));
  }

  /**
   * Utility method to simulate async delay
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = EmailSender;
