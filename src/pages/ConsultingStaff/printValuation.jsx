import axios from "axios";

const handlePrintValuationPaper = async (record, signatureUrl, signName) => {
    const { requestId } = record;

    try {
        const response = await axios.get(
            `https://dvs-be-sooty.vercel.app/api/print-valuation-report?requestId=${requestId}`,
            { withCredentials: true }
        );

        if (response.status === 200) {
            const valuationData = response.data;

            const printableContent = `
                <html>
                <head>
                    <title>Insurance Valuation Report</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.16.13/antd.min.css">
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            margin: 20px;
                            background-color: #f0f2f5;
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
                            margin: 0;
                            font-size: 28px;
                            color: #333;
                        }
                        .details {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 20px;
                        }
                        .details .info, .details .diamond-image {
                            flex: 1;
                            padding: 10px;
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
                            <h1>Insurance Valuation Report</h1>
                        </div>
                        <div class="details">
                            <div class="info">
                                <p><strong>Customer:</strong> ${valuationData.customerFirstName} ${valuationData.customerLastName}</p>
                                <p><strong>Certificate Number:</strong> ${valuationData.certificateId || "Not Available"}</p>
                                <p><strong>Carat Weight:</strong> ${valuationData.caratWeight || "Not Available"}</p>
                                <p><strong>Cut:</strong> ${valuationData.cut || "Not Available"}</p>
                                <p><strong>Color:</strong> ${valuationData.color || "Not Available"}</p>
                                <p><strong>Clarity:</strong> ${valuationData.clarity || "Not Available"}</p>
                                <p><strong>Shape:</strong> ${valuationData.shape || "Not Available"}</p>
                                <p><strong>Proportions:</strong> ${valuationData.proportions || "Not Available"}</p>
                                <p><strong>Measurements:</strong> ${valuationData.measurements || "Not Available"}</p>
                                <p><strong>Polish:</strong> ${valuationData.polish || "Not Available"}</p>
                                <p><strong>Fluorescence:</strong> ${valuationData.fluorescence || "Not Available"}</p>
                                <p><strong>Symmetry:</strong> ${valuationData.symmetry || "Not Available"}</p>
                                <p><strong>Diamond Origin:</strong> ${valuationData.diamondOrigin || "Not Available"}</p>
                                <p><strong>Price:</strong> $${valuationData.diamondPrice || "Not Available"}</p>
                            </div>
                            <div class="diamond-image">
                                <img src="${valuationData.requestImage}" alt="Diamond Image"/>
                            </div>
                        </div>
                        <p><strong>Print Date:</strong> ${new Date().toLocaleString("en-US")}</p>
                        <div class="signature">
                            <p>Authorized Signature:</p>
                            <img src=${signatureUrl} alt="Signature"/>
                            <p><strong>${signName}</strong></p>
                            <p>Valuation Expert</p>
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

            const printWindow = window.open("", "_blank");
            if (printWindow) {
                printWindow.document.open();
                printWindow.document.write(printableContent);
                printWindow.document.close();
                printWindow.print();
            } else {
                console.error(
                    "Failed to open print window. Please allow pop-ups for this site."
                );
            }
        } else if (response.status === 404) {
            console.error("Valuation report not found. Please check the request ID.");
        } else {
            console.error(
                "Failed to fetch valuation report. Please try again later."
            );
        }
    } catch (error) {
        console.error("Error fetching valuation report:", error);
        console.error("Error fetching valuation report. Please try again later.");
    }
};

export default handlePrintValuationPaper;
