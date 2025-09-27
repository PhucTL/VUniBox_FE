/**
 * Utility functions for phone number handling
 */

/**
 * Convert Vietnamese phone number to international format (+84)
 * @param {string} phoneNumber - The phone number to convert
 * @returns {string} - The converted phone number in international format
 * 
 * Examples:
 * - "0982984753" → "+84982984753"
 * - "+84982984753" → "+84982984753" (no change)
 * - "84982984753" → "+84982984753"
 */
export const convertPhoneToInternational = (phoneNumber) => {
  if (!phoneNumber) return phoneNumber;
  
  // Remove all spaces and special characters
  const cleanPhone = phoneNumber.replace(/\s+/g, '').replace(/[-()]/g, '');
  
  // If starts with 0 and has 10 digits, convert to +84
  if (cleanPhone.startsWith('0') && cleanPhone.length === 10) {
    return '+84' + cleanPhone.substring(1);
  }
  
  // If already starts with +84, return as is
  if (cleanPhone.startsWith('+84')) {
    return cleanPhone;
  }
  
  // If starts with 84, add +
  if (cleanPhone.startsWith('84') && cleanPhone.length === 11) {
    return '+' + cleanPhone;
  }
  
  return phoneNumber; // Return original if no conversion needed
};

/**
 * Convert international phone number back to Vietnamese format (0...)
 * @param {string} phoneNumber - The international phone number
 * @returns {string} - The phone number in Vietnamese format
 * 
 * Examples:
 * - "+84982984753" → "0982984753"
 * - "0982984753" → "0982984753" (no change)
 */
export const convertPhoneToVietnamese = (phoneNumber) => {
  if (!phoneNumber) return phoneNumber;
  
  const cleanPhone = phoneNumber.replace(/\s+/g, '').replace(/[-()]/g, '');
  
  // If starts with +84, convert to 0
  if (cleanPhone.startsWith('+84') && cleanPhone.length === 12) {
    return '0' + cleanPhone.substring(3);
  }
  
  // If starts with 84, convert to 0
  if (cleanPhone.startsWith('84') && cleanPhone.length === 11) {
    return '0' + cleanPhone.substring(2);
  }
  
  return phoneNumber; // Return original if no conversion needed
};

/**
 * Validate Vietnamese phone number format
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if valid Vietnamese phone number
 */
export const isValidVietnamesePhone = (phoneNumber) => {
  if (!phoneNumber) return false;
  
  const cleanPhone = phoneNumber.replace(/\s+/g, '').replace(/[-()]/g, '');
  
  // Check Vietnamese format (10 digits starting with 0)
  const vietnamesePattern = /^0\d{9}$/;
  
  // Check international format (+84 followed by 9 digits)
  const internationalPattern = /^\+84\d{9}$/;
  
  return vietnamesePattern.test(cleanPhone) || internationalPattern.test(cleanPhone);
};