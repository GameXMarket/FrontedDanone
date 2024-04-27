export interface ChatProps {
    dialog: {
        chat_id: number;
        interlocutor_id: number;
        interlocutor_username?: string;
        interlocutor_files?: Array<string>;
    };
    dialogError?: boolean;
    userIdFromOffer?: number;
    offerId?: string
}