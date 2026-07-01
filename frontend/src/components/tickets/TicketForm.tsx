import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type {
    CreateTicketRequest,
    UpdateTicketRequest,
} from "../../types/ticket";

type TicketFormData = CreateTicketRequest & {
    status?: string;
};

interface TicketFormProps {
    defaultValues?: TicketFormData;
    loading?: boolean;
    submitText?: string;
    showStatus?: boolean;
    onSubmit: (data: TicketFormData) => void;
}

const emptyForm: TicketFormData = {
    customer: "",
    subject: "",
    description: "",
    category: "Other",
    priority: "Medium",
    status: "Open",
};

export default function TicketForm({
    defaultValues = emptyForm,
    loading = false,
    submitText = "Save Ticket",
    showStatus = false,
    onSubmit,
}: TicketFormProps) {

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<TicketFormData>({
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Customer
                </label>

                <input
                    {...register("customer", {
                        required: true,
                    })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Subject
                </label>

                <input
                    {...register("subject", {
                        required: true,
                    })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Description
                </label>

                <textarea
                    rows={5}
                    {...register("description")}
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3"
                    placeholder="Describe the customer's issue..."
                />

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label className="mb-2 block text-sm font-medium">
                        Category
                    </label>

                    <select
                        {...register("category")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    >
                        <option value="Billing">Billing</option>
                        <option value="Refund">Refund</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Payment">Payment</option>
                        <option value="Damaged Item">Damaged Item</option>
                        <option value="Technical">Technical</option>
                        <option value="Sales">Sales</option>
                        <option value="Other">Other</option>
                    </select>

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">
                        Priority
                    </label>

                    <select
                        {...register("priority")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                </div>

            </div>

            {showStatus && (

                <div>

                    <label className="mb-2 block text-sm font-medium">
                        Status
                    </label>

                    <select
                        {...register("status")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    >
                        <option value="Open">Open</option>
                        <option value="Pending">Pending</option>
                        <option value="Closed">Closed</option>
                    </select>

                </div>

            )}

            <div className="flex justify-end">

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : submitText}
                </button>

            </div>

        </form>
    );
}