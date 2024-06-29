import React from "react";

const SealingReport = ({ reportData }) => {
    return (
        <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Diamond Sealing Record</title>
            <link rel="stylesheet" href="styles.css" />
            <style dangerouslySetInnerHTML={{ __html: "\n        body {\n            font-family: Arial, sans-serif;\n            background-color: #f4f4f4;\n            margin: 0;\n            padding: 0;\n        }\n\n        .container {\n            width: 80%;\n            margin: auto;\n            background: white;\n            padding: 20px;\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n        }\n\n        header {\n            text-align: center;\n            padding-bottom: 20px;\n            border-bottom: 1px solid #ddd;\n        }\n\n        header h1 {\n            margin: 0;\n            font-size: 24px;\n            color: #333;\n        }\n\n        header p {\n            margin: 0;\n            font-size: 16px;\n            color: #666;\n        }\n\n        .details, .security-features, .footer {\n            margin: 20px 0;\n        }\n\n        .details h2, .security-features h2 {\n            font-size: 20px;\n            color: #333;\n            border-bottom: 1px solid #ddd;\n            padding-bottom: 10px;\n        }\n\n        .row {\n            display: flex;\n            justify-content: space-between;\n            margin: 10px 0;\n        }\n\n        .column {\n            flex: 0 0 48%;\n        }\n\n        label {\n            display: block;\n            margin-bottom: 5px;\n            color: #555;\n        }\n\n        input[type=\"text\"] {\n            width: 100%;\n            padding: 8px;\n            margin-bottom: 10px;\n            border: 1px solid #ccc;\n            border-radius: 4px;\n        }\n\n        .signature {\n            margin: 20px 0;\n        }\n\n        .signature label {\n            display: block;\n            margin-bottom: 5px;\n            color: #555;\n        }\n\n        .signature input[type=\"text\"] {\n            width: 100%;\n            padding: 8px;\n            border: 1px solid #ccc;\n            border-radius: 4px;\n        }\n    " }} />
            <div className="container">
                <header>
                    <h1>Diamond Sealing Record</h1>
                    <p>Ensuring security, authenticity, and transparency</p>
                </header>
                <section className="details">
                    <h2>Diamond Information</h2>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="cert-number">Certificate Number:</label>
                            <input type="text" id="cert-number" name="cert-number" value={reportData.certNumber} readOnly />
                        </div>
                        <div className="column">
                            <label htmlFor="weight">Weight (carats):</label>
                            <input type="text" id="weight" name="weight" value={reportData.weight} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="color">Color Grade:</label>
                            <input type="text" id="color" name="color" value={reportData.color} readOnly />
                        </div>
                        <div className="column">
                            <label htmlFor="clarity">Clarity Grade:</label>
                            <input type="text" id="clarity" name="clarity" value={reportData.clarity} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="cut">Cut Grade:</label>
                            <input type="text" id="cut" name="cut" value={reportData.cut} readOnly />
                        </div>
                        <div className="column">
                            <label htmlFor="shape">Shape:</label>
                            <input type="text" id="shape" name="shape" value={reportData.shape} readOnly />
                        </div>
                    </div>
                </section>
                <section className="footer">
                    <div className="signature">
                        <label htmlFor="officer-signature">Officer's Signature:</label>
                        <input type="text" id="officer-signature" name="officer-signature" />
                    </div>
                    <div className="signature">
                        <label htmlFor="client-signature">Client's Signature:</label>
                        <input type="text" id="client-signature" name="client-signature" />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SealingReport;
