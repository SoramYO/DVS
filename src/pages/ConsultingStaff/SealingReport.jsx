import axios from 'axios';

const handlePrintSealingReport = async (record, signatureUrl, signName) => {
    try {
        const response = await axios.get(`https://dvs-be-sooty.vercel.app/api/print-valuation-report?requestId=${record.requestId}`, { withCredentials: true });

        if (response.status === 200) {
            const requestData = response.data;
            const printableContent = `
                <html>
                <head>
                    <title>Sealing Report</title>
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
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 20px;
                        }
                        .info {
                            flex: 1;
                            padding-right: 10px;
                        }
                        .info p {
                            margin: 10px 0;
                            font-size: 1.1em;
                            color: #666;
                        }
                        .info p strong {
                            color: #1890ff;
                        }
                        .diamond-image {
                            flex: 1;
                            text-align: right;
                            margin-top: 20px;
                        }
                        .diamond-image img {
                            max-width: 70%;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            padding: 5px;
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
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                        <img src="https://marketplace.canva.com/EAFqberfhMA/1/0/1600w/canva-black-gold-luxury-modern-diamond-brand-store-logo-VmwEPkcpqzE.jpg" alt="Logo"/>
                            <h1>Sealing Report</h1>
                        </div>
                        <div class="details">
                            <div class="info">
                            <p><strong>Customer:</strong> ${requestData.customerFirstName} ${requestData.customerLastName}</p>
                            <p><strong>Sealing Date:</strong> ${new Date().toLocaleDateString('en-US')}</p>
                            <p><strong>Appointment Date:</strong> ${requestData.appointmentDate ? new Date(requestData.appointmentDate).toLocaleDateString('en-US') : 'Not available'}</p>
                            <p><strong>Note:</strong> ${requestData.note}</p>
                            <div class="diamond-image">
                                <img src="${requestData.requestImage}" alt="Diamond Image"/>
                            </div>
                            </div>
                        </div>
                        <div class="signature">
                            <p>Signature:</p>
                            <img src=${signatureUrl} alt="Signature"/>
                            <p><strong>${signName}</strong></p>
                            <p><strong>Date:</strong> ${new Date().toLocaleString("en-US")}</p>
                        </div>
                        <div class="footer">
                            <h3>Diamond Valuation</h3>
                            <p>VRG2+27 Dĩ An, Bình Dương, Việt Nam</p>
                            <p>Phone: 0976457150</p>
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
                console.error('Failed to open print window. Please allow pop-ups for this site.');
            }
        } else if (response.status === 404) {
            console.error('Sealing report not found. Please check the request ID.');
        } else {
            console.error('Error fetching sealing report data. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching sealing report data:', error);
        console.error('Error fetching sealing report data. Please try again later.');
    }
};

export default handlePrintSealingReport;
