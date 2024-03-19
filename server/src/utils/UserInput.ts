import { Output, User } from "../types"


export const validateUserInput = (user: User) => {
    const output: Output = {
        isValid: true,
        issues: {},
    }

    const { email, firstName, password } = user


    // validate email
    if (email && !emailValidator(email)) {
        output.isValid = false
        output.issues.email = 'invalid email'
    }

    // validate firstName
    if (firstName && !nameValidator(firstName)) {
        output.isValid = false
        output.issues.firstName = 'invalid firstname'
    }

    // validate password
    if (password && !passwordValidator(password)) {
        output.isValid = false
        output.issues.invalidField = 'password length is less then 8'
    }

    return output

}

const nameValidator = (firstName: string) => {
    const nameValidator = /^[a-zA-Z]+[a-zA-Z]+$/
    return nameValidator.test(firstName.toString())
}
const emailValidator = (email: string) => {
    const emailFilter =
        /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/

    return emailFilter.test(email)
}

const passwordValidator = (password: string) => {
    return password.length > 7 ? true : false
}