import { create } from 'zustand';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,

    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser;

        // Initialize blocking states
        let isCurrentUserBlocked = false;
        let isReceiverBlocked = false;

        // Check if currentUser and user are valid and have blocked properties
        if (currentUser && user) {
            // Check if the current user is blocked by the user in front
            if (user.blocked && user.blocked.includes(currentUser.id)) {
                isCurrentUserBlocked = true;
            }

            // Check if the user in front is blocked by the current user
            if (currentUser.blocked && currentUser.blocked.includes(user.id)) {
                isReceiverBlocked = true;
            }
        }

        set({
            chatId,
            user,
            isCurrentUserBlocked,
            isReceiverBlocked,
        });
    },

    changeBlock: () => {
        set((state) => ({
            isReceiverBlocked: !state.isReceiverBlocked,
        }));
    }
}));
