import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })

    console.log("payment history", payments);

    return (
        <div>
            <SectionTitle heading="Payment History" subHeading="What you ordered" />

            <h2 className="text-3xl my-6">Total Payments: {payments.length}</h2>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>transaction Id</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, idx) => (
                                    <tr key={payment._id}>

                                        <td>{idx + 1}</td>
                                        <td>{payment.email}</td>
                                        <td>{payment.transactionId}</td>
                                        <td>$ {payment.price}</td>
                                        <td>{payment.status}</td>

                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default PaymentHistory;