export const isValidEmail = (email) => {
  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
// Function to validate password format
export const isValidPassword = (password) => {
  // Regular expression for validating password format
  const passwordRegex =
    /^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:[^a-z]*[a-z]){2})(?=(?:[^0-9]*[0-9]){2})(?=(?:[^!@#$%^&*()_+{}|:"<>?`~\-=[\];',./])*[^!@#$%^&*()_+{}|:"<>?`~\-=[\];',./]){2}.*$/;
  return passwordRegex.test(password);
};
export const isValidFastName = (name) => {
  const nameRegex = /^[a-zA-Z]{2,50}$/;
  return nameRegex.test(name);
};
export const isValidLastName = (lastName) => {
  // Check if the last name is not empty and contains only alphabets
  const lastNameRegex = /^[a-zA-Z]*$/;
  return lastName === "" || lastNameRegex.test(lastName);
};
export const isValidPhoneNumber = (phoneNumber) => {
  // Check if the phone number contains exactly 10 digits
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(phoneNumber);
};
export const isValidCountryCode = (countryCode) => {
  // Check if the country code is either India (+91) or America (+1)
  return countryCode === "+91" || countryCode === "+1";
};
export const isValidTermsAndCondition = (acceptTermsAndCondition) => {
  return acceptTermsAndCondition === true;
};
