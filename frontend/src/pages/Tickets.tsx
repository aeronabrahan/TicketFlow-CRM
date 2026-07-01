import { useEffect, useState } from "react";
import { toast } from "sonner";

import MainLayout from "../components/layout/MainLayout";

import TicketTable from "../components/tickets/TicketTable";
import CreateTicketModal from "../components/tickets/CreateTicketModal";
import TicketDetailsModal from "../components/tickets/TicketDetailsModal";
import EditTicketModal from "../components/tickets/EditTicketModal";
import DeleteTicketModal from "../components/tickets/DeleteTicketModal";

import { getTickets, deleteTicket } from "../services/tickets";

import type { Ticket } from "../types/ticket";

export default function Tickets() {

    const [tickets, setTickets] = useState<Ticket[]>([]);

    const [search, setSearch] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [selectedTicket, setSelectedTicket] =
        useState<Ticket | null>(null);

    const [editingTicket, setEditingTicket] =
        useState<Ticket | null>(null);

    const [showDetailsModal, setShowDetailsModal] =
        useState(false);

    const [showEditModal, setShowEditModal] =
        useState(false);

    const [deletingTicket, setDeletingTicket] =
        useState<Ticket | null>(null);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    useEffect(() => {
        loadTickets();
    }, []);

    async function loadTickets() {

        const data = await getTickets();

        setTickets(data);

    }

    function handleView(ticket: Ticket) {

        setSelectedTicket(ticket);

        setShowDetailsModal(true);

    }

    function handleEdit(ticket: Ticket) {

        setEditingTicket(ticket);

        setShowEditModal(true);

    }

    function handleDelete(ticket: Ticket) {

        setDeletingTicket(ticket);

        setShowDeleteModal(true);

    }

    async function confirmDelete() {

        if (!deletingTicket) return;

        try {

            setDeleteLoading(true);

            await deleteTicket(deletingTicket.id);

            toast.success("Ticket deleted successfully.");

            await loadTickets();

            setShowDeleteModal(false);

            setDeletingTicket(null);

        } catch (error) {

            console.error(error);

            toast.error("Unable to delete ticket.");

        } finally {

            setDeleteLoading(false);

        }

    }

    const filteredTickets = tickets.filter(ticket =>
        ticket.customer.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <MainLayout>

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Tickets
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage customer support requests
                    </p>

                </div>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                    + New Ticket
                </button>

            </div>

            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <input
                    type="text"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3"
                />

            </div>

            <TicketTable
                tickets={filteredTickets}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CreateTicketModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={loadTickets}
            />

            <TicketDetailsModal
                ticket={selectedTicket}
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
            />

            <EditTicketModal
                ticket={editingTicket}
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSuccess={async () => {

                    await loadTickets();

                    setShowEditModal(false);

                }}
            />

            <DeleteTicketModal
                isOpen={showDeleteModal}
                loading={deleteLoading}
                ticketSubject={deletingTicket?.subject}
                onClose={() => {

                    setShowDeleteModal(false);

                    setDeletingTicket(null);

                }}
                onConfirm={confirmDelete}
            />

        </MainLayout>

    );

}