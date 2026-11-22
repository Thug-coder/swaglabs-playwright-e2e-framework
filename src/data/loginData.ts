export const loginTestData = {
    lockedOutUser: {
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedError: 'Epic sadface: Sorry, this user has been locked out.'
    },

    invalidPassword: {
        username: 'standard_user',
        password: 'wrong_password',
        expectedError: 'Epic sadface: Username and password do not match any user in this service'
    },

    emptyUsername: {
        username: '',
        password: 'secret_sauce',
        expectedError: 'Epic sadface: Username is required'
    },

    emptyPassword: {
        username: 'standard_user',
        password: '',
        expectedError: 'Epic sadface: Password is required'
    },

    problemUser: {
        username: 'problem_user',
        password: 'secret_sauce',
    },

    performanceGlitchUser: {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
    },

    errorUser: {
        username: 'error_user',
        password: 'secret_sauce',
    },

    visualUser: {
        username: 'visual_user',
        password: 'secret_sauce',
    },
};