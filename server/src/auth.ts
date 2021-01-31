import { sign } from 'jsonwebtoken';
import { User } from './entity/User';

export const createAccessToken = (user: User): string => {
    return sign(
        { userId: user.id, userEmail: user.email },
        process.env.ACCESS_TOKEN ?? 'accessToken',
        { expiresIn: '30m' }
    );
};

export const createRefreshToken = (user: User): string => {
    return sign(
        { userId: user.id, tokenVersion: user.tokenVersion },
        process.env.REFRESH_TOKEN ?? 'refreshToken',
        {
            expiresIn: '7d',
        }
    );
};
