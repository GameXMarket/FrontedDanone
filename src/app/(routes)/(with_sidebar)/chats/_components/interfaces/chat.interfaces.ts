import { Dispatch, SetStateAction } from "react";

export interface ChatProps {
    sortedDialogs: Array<{}>
    setSortedDialogs: Dispatch<SetStateAction<Array<{}>>>
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