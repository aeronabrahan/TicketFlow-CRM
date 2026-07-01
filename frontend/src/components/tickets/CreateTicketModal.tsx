import { useState } from "react";
import { toast } from "sonner";

import Modal from "../common/Modal";
import TicketForm from "./TicketForm";

import { createTicket } from "../../services/tickets";

import type { CreateTicketRequest } from "../../types/ticket";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateTicketModal({
    isOpen,
    onClose,
    onSuccess,
}: Props) {

    const [loading, setLoading] = useState(false);

    async function handleCreateTicket(
        data: CreateTicketRequest
    ) {

        try {

            setLoading(true);

            await createTicket(data);

            toast.success(
                "Ticket created successfully."
            );

            onSuccess();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to create ticket."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <Modal
            isOpen={isOpen}
            title="Create New Ticket"
            onClose={onClose}
        >

            <TicketForm
                loading={loading}
                submitText="Create Ticket"
                onSubmit={handleCreateTicket}
            />

        </Modal>

    );

}