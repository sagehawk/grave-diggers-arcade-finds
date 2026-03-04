import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'games',
    access: (allow) => ({
        'game-thumbnails/*': [
            allow.guest.to(['read']),
            allow.authenticated.to(['read', 'write', 'delete']),
        ],
        'game-galleries/*': [
            allow.guest.to(['read']),
            allow.authenticated.to(['read', 'write', 'delete']),
        ],
    }),
});
