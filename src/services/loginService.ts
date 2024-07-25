import { generateAccessToken } from './../utils/authUtil';

class LoginModel {

    static authenticateUser(username: string, password: string): string {
        const placeholderUser = {
            userName: 'Lucia',
            password: '12345'
        };

        if (username === placeholderUser.userName && password === placeholderUser.password) {
            const token = generateAccessToken(placeholderUser.userName);
            return token;
        } else {
            throw new Error('Invalid credentials');
        }
    }
}

export default LoginModel;
