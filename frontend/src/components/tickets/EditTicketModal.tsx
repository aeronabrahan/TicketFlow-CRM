import { useState } from "react";
import { toast } from "sonner";

import Modal from "../common/Modal";
import TicketForm from "./TicketForm";

import { updateTicket } from "../../services/tickets";

import type { Ticket } from "../../types/ticket";

interface Props {
    ticket: Ticket | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditTicketModal({
    ticket,
    isOpen,
    onClose,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);

    if (!ticket) return null;

    async function handleSubmit(data: any) {
        try {
            setLoading(true);

            await updateTicket(ticket.id, data);

            toast.success("Ticket updated successfully.");

            onSuccess();

            onClose();
        } catch (error) {
            console.error(error);

            toast.error("Unable to update ticket.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            title="Edit Ticket"
            onClose={onClose}
        >
            <TicketForm
                defaultValues={{
                    customer: ticket.customer,
                    subject: ticket.subject,
                    description: ticket.description,
                    category: ticket.category,
                    priority: ticket.priority,
                    status: ticket.status,
                }}
                loading={loading}
                submitText="Save Changes"
                showStatus
                onSubmit={handleSubmit}
            />
        </Modal>
    );
}