import Modal from "../common/Modal";

interface DeleteTicketModalProps {
    isOpen: boolean;
    loading: boolean;
    ticketSubject?: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteTicketModal({
    isOpen,
    loading,
    ticketSubject,
    onClose,
    onConfirm,
}: DeleteTicketModalProps) {

    return (

        <Modal
            isOpen={isOpen}
            title="Delete Ticket"
            onClose={onClose}
        >

            <div className="space-y-6">

                <p className="text-slate-600">

                    Are you sure you want to permanently delete this ticket?

                </p>

                <div className="rounded-xl border bg-slate-50 p-4">

                    <p className="text-sm text-slate-500">

                        Ticket

                    </p>

                    <p className="mt-1 font-semibold">

                        {ticketSubject}

                    </p>

                </div>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-xl border px-5 py-3 hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete Ticket"}
                    </button>

                </div>

            </div>

        </Modal>

    );

}