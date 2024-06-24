import axios from 'axios';
import { message } from 'antd';

const handlePrintValuationPaper = async (record) => {
    const { requestId } = record;

    try {
        const response = await axios.get(`https://dvs-be-sooty.vercel.app/api/print-valuation-report?requestId=${requestId}`, { withCredentials: true });

        if (response.status === 200) {
            const valuationData = response.data;

            const printableContent = `
                <html>
                <head>
                    <title>Valuation Report</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.16.13/antd.min.css">
                    <style>
                            body {
                            font-family: 'Arial', sans-serif;
                            margin: 20px;
                            background-color: #f0f2f5;
                        }
                        .container {
                            max-width: 800px;
                            margin: auto;
                            padding: 20px;
                            background: #fff;
                            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                            border-radius: 5px;
                        }
                        .header, .footer {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .header h1, .footer h3 {
                            margin: 0;
                            color: #ff0000;
                        }
                        .details {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-start;
                            margin-bottom: 20px;
                        }
                        .details .info {
                            flex: 1;
                            padding-right: 10px; 
                        }
                        .details .info p {
                            margin: 10px 0;
                            font-size: 1.3em;
                            color: #666666;
                        }
                        .details .info p strong {
                            color: #1890ff;
                        }
                        .signature {
                            text-align: right;
                            margin-top: 50px; 
                            padding-top: 20px;
                            border-top: 1px solid #ccc;
                        }
                        .signature p {
                            margin: 0;
                        }
                        .signature p.sign {
                            margin-top: 20px;
                            font-size: 1.2em;
                            font-weight: bold;
                        }
                        .signature img {
                            max-width: 100px;
                            height: auto;
                            margin-top: 10px;
                        }
                        .footer {
                            margin-top: 20px;
                            text-align: center;
                        }
                        .footer h3 {
                            margin: 0;
                            color: #1890ff; 
                        }
                        .diamond-image {
                            flex: 1;
                            text-align: right;
                            margin-top: 20px;
                        }
                        .diamond-image img {
                            max-width: 70%; 
                            height: auto;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            padding: 5px;
                            margin-top: 10px;
                        }
                    </style>

                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1><strong>Valuation Report</strong></h1>
                        </div>
                        <div class="details">
                            <div class="info">
                                <p><strong>Request ID:</strong> ${valuationData.requestId}</p>
                                <p><strong>Print Date:</strong> ${new Date(valuationData.valuationDate).toLocaleDateString('en-US')}</p>
                                <p><strong>Appointment Date:</strong> ${new Date(valuationData.appointmentDate).toLocaleDateString('en-US')}</p>
                                <p><strong>Payment Status:</strong> ${valuationData.paymentStatus}</p>
                                <p><strong>Customer:</strong> ${valuationData.customerFirstName} ${valuationData.customerLastName}</p>
                                <p><strong>Note:</strong> ${valuationData.note}</p>
                                <p><strong>Carat Weight:</strong> ${valuationData.caratWeight || 'Not Available'}</p>
                                <p><strong>Cut:</strong> ${valuationData.cut || 'Not Available'}</p>
                                <p><strong>Color:</strong> ${valuationData.color || 'Not Available'}</p>
                                <p><strong>Clarity:</strong> ${valuationData.clarity || 'Not Available'}</p>
                                <p><strong>Shape:</strong> ${valuationData.shape || 'Not Available'}</p>
                                <p><strong>Proportions:</strong> ${valuationData.proportions || 'Not Available'}</p>
                                <p><strong>Measurements:</strong> ${valuationData.measurements || 'Not Available'}</p>
                                <p><strong>Polish:</strong> ${valuationData.polish || 'Not Available'}</p>
                                <p><strong>Fluorescence:</strong> ${valuationData.fluorescence || 'Not Available'}</p>
                                <p><strong>Symmetry:</strong> ${valuationData.symmetry || 'Not Available'}</p>
                                <p><strong>Diamond Origin:</strong> ${valuationData.diamondOrigin || 'Not Available'}</p>
                                <p><strong>Price:</strong> $${valuationData.price || 'Not Available'}</p>
                            </div>
                            <div class="diamond-image">
                                <img src="${valuationData.requestImage}" alt="Diamond Image"/>
                            </div>
                        </div>
                        <div class="signature">
                            <p>Authorized Signature:</p>
                            <img src="https://clipground.com/images/make-signature-clipart-1.jpg" alt="Signature"/>
                            <p class="sign">Brian</p>
                            <p>Valuation Expert</p>
                        </div>
                        <div class="footer">
                            <h3><strong>Diamond Valuation</strong></h3>
                            <p>VRG2+27 Dĩ An, Bình Dương, Việt Nam</p>
                            <p>Phone: 0032-3-233-91-60</p>
                            <p>Email: diamondvaluation@gmail.com</p>
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
                printWindow.print(); 
            } else {
                message.error('Failed to open print window. Please allow pop-ups for this site.');
            }
        } else if (response.status === 404) {
            message.error('Valuation report not found. Please check the request ID.');
        } else {
            message.error('Failed to fetch valuation report. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching valuation report:', error);
        message.error('Error fetching valuation report. Please try again later.');
    }
};

export default handlePrintValuationPaper;
