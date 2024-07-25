import jwt from 'jsonwebtoken';

export function generateAccessToken(username: string): string {
    const payload = { username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
    return token;
}
