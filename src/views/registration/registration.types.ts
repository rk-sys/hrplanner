export type TRegistrationForm = {
  login: string,
  firstName: string,
  lastName: string,
  companyName: string,
  email: string,
  password: string,
  repeatPassword: string,
  registrationCode: string,
  rules: boolean | ''
}
