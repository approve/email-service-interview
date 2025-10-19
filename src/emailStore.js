const { v4: uuidv4 } = require('uuid');
const { EmailStatus } = require('./constants');

/**
 * In-memory email storage
 */
class EmailStore {
  constructor() {
    this.emails = new Map();
  }

  /**
   * Create a new email record
   */
  create(emailData) {
    const email = {
      id: uuidv4(),
      ...emailData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: EmailStatus.PENDING
    };

    this.emails.set(email.id, email);
    return email;
  }

  /**
   * Update email by ID
   */
  update(id, updates) {
    const email = this.emails.get(id);
    if (!email) {
      return null;
    }

    const updatedEmail = {
      ...email,
      ...updates,
      updatedAt: new Date()
    };

    this.emails.set(id, updatedEmail);
    return updatedEmail;
  }
}

module.exports = EmailStore;
