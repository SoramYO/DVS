import axios from 'axios';

const handlePrintCommitmentReport = async (recordForPrint, signatureUrl, signName, preview = false) => {
    const { requestId } = recordForPrint;

    try {
        const response = await axios.get(`https://dvs-be-sooty.vercel.app/api/requests/${requestId}`, { withCredentials: true });

        if (response.status === 200) {
            const valuationData = response.data.request;
            const currentDate = new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'medium' });

            const printableContent = `
                <html>
                <head>
                    <title>Diamond Return Commitment</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.16.13/antd.min.css">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f2f5;
                            margin: 20px;
                            padding: 20px;
                        }
                        .container {
                            width: 800px;
                            margin: auto;
                            padding: 20px;
                            background: #fff;
                            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                            border-radius: 10px;
                            border: 1px solid #ccc;
                        }
                        .header, .footer {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .header img {
                            max-width: 150px;
                            margin-bottom: 10px;
                        }
                        .header h1 {
                            color: #333;
                            margin: 0;
                            font-size: 28px;
                        }
                        .details {
                            margin-bottom: 20px;
                        }
                        .details p {
                            margin: 10px 0;
                            font-size: 1.1em;
                            color: #666;
                        }
                        .details p strong {
                            color: #1890ff;
                        }
                        .signature {
                            text-align: right;
                            margin-top: 50px;
                            padding-top: 20px;
                            border-top: 1px solid #ccc;
                        }
                        .signature img {
                            max-width: 100px;
                            height: auto;
                        }
                        .signature .sign {
                            margin-top: 20px;
                            font-size: 1.2em;
                            font-weight: bold;
                        }
                        .footer h3 {
                            color: #1890ff;
                            margin: 0;
                        }
                        .footer p {
                            margin: 5px 0;
                        }
                        .terms {
                            margin-top: 20px;
                            padding: 10px;
                            background-color: #f9f9f9;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="https://marketplace.canva.com/EAFqberfhMA/1/0/1600w/canva-black-gold-luxury-modern-diamond-brand-store-logo-VmwEPkcpqzE.jpg" alt="Logo"/>
                            <h1>Diamond Return Commitment</h1>
                        </div>
                        <div class="details">
                            <p><strong>Print Date:</strong> ${currentDate}</p>
                            <p><strong>Customer:</strong> ${valuationData.firstName} ${valuationData.lastName}</p>
                            <p><strong>Transaction ID:</strong> ${valuationData.requestId}</p>
                            <p><strong>Appointment Date:</strong> ${valuationData.appointmentDate ? new Date(valuationData.appointmentDate).toLocaleDateString('en-US') : 'Not available'}</p>
                            <p><strong>Details:</strong> ${valuationData.note}</p>
                            <div class="terms">
                                <p><strong>Terms and Conditions:</strong></p>
                                <p>I, <strong>${valuationData.firstName} ${valuationData.lastName}</strong>, hereby acknowledge the receipt of the diamond(s) described in the details above and agree to the terms and conditions specified in the original transaction agreement.</p>
                            </div>
                        </div>
                        <div class="signature">
                            ${preview ? `
                                <p><strong>Signature:</strong> ____________________</p>
                                <p><strong>Date:</strong> ____________________</p>
                            ` : `
                                <p>Customer Signature:</p>
                                <img src="${signatureUrl}" alt="Signature"/>
                                <p class="sign">${signName}</p>
                                <p><strong>Date:</strong> ${new Date().toLocaleString("en-US")}</p>
                            `}
                        </div>
                        <div class="footer">
                            <h3>Diamond Valuation</h3>
                            <p>VRG2+27 Dĩ An, Bình Dương, Việt Nam</p>
                            <p>Phone: 0976457150</p>
                            <p>Email: diamondreturn@gmail.com</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.open();
                printWindow.document.write(printableContent);
                printWindow.document.close();
                if (!preview) {
                    printWindow.print();
                }
            } else {
                console.error('Failed to open print window. Please allow pop-ups for this site.');
            }
        } else if (response.status === 404) {
            console.error('Return record not found. Please check the request ID.');
        } else {
            console.error('Failed to fetch return record. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching return record:', error);
        console.error('Error fetching return record. Please try again later.');
    }
};

export default handlePrintCommitmentReport;
