
export const checkoutData = {
    validCustomer: {
        firstName: 'Test',
        lastName: 'User',
        postalCode: '400001',
    },

    validationCases: [
        {
            scenario: 'First name is required',
            firstName: '',
            lastName: 'User',
            postalCode: '400001',
            expectedError: 'Error: First Name is required',
        },
        {
            scenario: 'Last name is required',
            firstName: 'Test',
            lastName: '',
            postalCode: '400001',
            expectedError: 'Error: Last Name is required',
        },
        {
            scenario: 'Postal code is required',
            firstName: 'Test',
            lastName: 'User',
            postalCode: '',
            expectedError: 'Error: Postal Code is required',
        },
    ],
};
