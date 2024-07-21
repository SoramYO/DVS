import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MySpin from "../components/MySpin";
import "../css/RequestDetail.css";

const RequestDetail = () => {
  const [request, setRequest] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getRequest = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://dvs-be-sooty.vercel.app/api/requests/${id}`, {
          withCredentials: true,
        });
        setRequest(res.data.request);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getRequest();
  }, [id]);

  if (loading) {
    return <MySpin />;
  }

  return (
    <div className="request-detail-container">
      <h1 className="page-title">Valuation Request Detail</h1>

      <div className="info-sections">
        <div className="info-card diamond-info-card">
          <h2>Diamond Information</h2>
          <div className="info-section">
            <div className="info-item">
              <strong>Created Date:</strong> {new Date(request?.createdDate).toLocaleDateString("en-GB")}
            </div>
            <div className="info-item">
              <strong>Appointed Date:</strong> {request.appointmentDate ? new Date(request?.appointmentDate)?.toLocaleDateString("en-GB") : "Chưa có"}
            </div>
            <div className="info-item">
              <strong>Note:</strong> {request.note}
            </div>
            <div className="info-item">
              <strong>Service Type:</strong> {request.serviceName}
            </div>
            <div className="info-item">
              <strong>Process Status:</strong> {request.processStatus}
            </div>
            {request.processStatus === "Done" && (
              <div className="additional-info">
                <div className="info-item">
                  <strong>Certificate ID:</strong> {request.certificateId}
                </div>
                <div className="info-item">
                  <strong>Clarity:</strong> {request.clarity}
                </div>
                <div className="info-item">
                  <strong>Color:</strong> {request.color}
                </div>
                <div className="info-item">
                  <strong>Cut:</strong> {request.cut}
                </div>
                <div className="info-item">
                  <strong>Diamond Origin:</strong> {request.diamondOrigin}
                </div>
                <div className="info-item">
                  <strong>Florescence:</strong> {request.fluorescence}
                </div>
                <div className="info-item">
                  <strong>Polish:</strong> {request.polish}
                </div>
                <div className="info-item">
                  <strong>Proportions:</strong> {request.proportions}
                </div>
                <div className="info-item">
                  <strong>Shape:</strong> {request.shape}
                </div>
                <div className="info-item">
                  <strong>Symmetry:</strong> {request.symmetry}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="info-card image-card">
          <img src={request.requestImage} alt="Diamond" className="diamond-image" />
        </div>

        <div className="info-card user-info-card">
          <h2>User Information</h2>
          <p><strong>Fullname:</strong> {`${request.firstName} ${request.lastName}`}</p>
          <p><strong>Email:</strong> {request.email}</p>
          <p><strong>Phone:</strong> {request.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
