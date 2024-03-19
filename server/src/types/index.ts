export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export type Output = {
    isValid: boolean
    issues: {
        email?: string
        firstName?: string
        lastName?: string
        invalidField?: string
    }
}