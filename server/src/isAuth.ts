import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from './MyContext';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
        throw new Error('not authenticated');
    }
    try {
        const token = authorization.split(' ')[1];
        const payload = verify(
            token,
            process.env.ACCESS_TOKEN ?? 'accessToken'
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context.payload = payload as any;
    } catch (error) {
        throw new Error('not authenticated');
    }
    return next();
};
