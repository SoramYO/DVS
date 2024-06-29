import { message } from 'antd';
import axios from 'axios';

const handlePrintSealingReport = async (request) => {
    try {
        const response = await axios.get(`https://dvs-be-sooty.vercel.app/api/print-valuation-report?requestId=${request.requestId}`, { withCredentials: true });
        if (response.status === 200) {
            const requestData = response.data;
            const printableContent = `
                <html>
                <head>
                    <title>Biên bản niêm phong</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .report-wrapper {
                            max-width: 800px;
                            margin: 20px auto;
                            padding: 20px;
                            border: 2px solid #333;
                            border-radius: 10px;
                            background-color: #fff;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .report-header {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .report-header h1 {
                            font-size: 24px;
                            text-transform: uppercase;
                            margin: 10px 0;
                            color: #333;
                        }
                        .report-content {
                            margin-bottom: 20px;
                        }
                        .report-content p {
                            margin: 5px 0;
                        }
                        .report-footer {
                            text-align: center;
                            margin-top: 20px;
                            font-style: italic;
                            color: #555;
                        }
                    </style>
                </head>
                <body>
                    <div class="report-wrapper">
                        <div class="report-header">
                            <h1>Biên bản niêm phong</h1>
                        </div>
                        <div class="report-content">
                            <p><strong>Số yêu cầu:</strong> ${requestData.requestId}</p>
                            <p><strong>Ngày niêm phong:</strong> ${new Date(requestData.createdDate).toLocaleDateString('en-US')}</p>
                            <p><strong>Ngày hẹn:</strong> ${requestData.appointmentDate ? new Date(requestData.appointmentDate).toLocaleDateString('en-US') : 'Chưa có'}</p>
                            <p><strong>Tình trạng thanh toán:</strong> ${requestData.paymentStatus}</p>
                            <p><strong>Khách hàng:</strong> ${requestData.customerFirstName} ${requestData.customerLastName}</p>
                            <p><strong>Ghi chú:</strong> ${requestData.note}</p>
                            <p><strong>Hình ảnh yêu cầu:</strong> <br/><img src="${requestData.requestImage}" alt="Request Image" style="max-width: 100%; height: auto;"></p>
                            <!-- Các thông tin khác có thể bổ sung -->
                        </div>
                        <div class="report-footer">
                            <p>Được tạo bởi Công ty của bạn</p>
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
                message.error('Không thể mở cửa sổ in. Vui lòng cho phép pop-up cho trang này.');
            }
        } else if (response.status === 404) {
            message.error('Không tìm thấy báo cáo niêm phong. Vui lòng kiểm tra mã yêu cầu.');
        } else {
            message.error('Lỗi khi lấy dữ liệu báo cáo niêm phong. Vui lòng thử lại sau.');
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu báo cáo niêm phong:', error);
        message.error('Lỗi khi lấy dữ liệu báo cáo niêm phong. Vui lòng thử lại sau.');
    }
};

export default handlePrintSealingReport;
