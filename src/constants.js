/**
 * Email Status Enumeration
 */
const EmailStatus = {
  PENDING: 'pending',
  SENT: 'sent',
  FAILED: 'failed',
  EXPIRED: 'expired'
};

/**
 * Email Template Types
 */
const EmailType = {
  WELCOME: 'welcome',
  REMINDER: 'reminder',
  NOTIFICATION: 'notification'
};

module.exports = {
  EmailStatus,
  EmailType
};
