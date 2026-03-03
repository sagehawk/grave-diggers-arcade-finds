import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'games',
    access: (allow) => ({
        'games/*': [
            allow.guest.to(['read']),
            allow.authenticated.to(['read', 'write', 'delete']),
        ]
    }),
});
