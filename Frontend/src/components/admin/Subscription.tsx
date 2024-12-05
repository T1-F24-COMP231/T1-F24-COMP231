import React, { useState, useEffect } from "react";
import { Button, Card, Table, Alert, Spinner } from "react-bootstrap";
import {
  getSubscriptionDetails,
  cancelSubscription,
  renewSubscription,
} from "../../api/subscriptionApi";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Loading";

const Subscription: React.FC = () => {
  const { isAdmin } = useAuth(); // Determine if the user is Admin
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

  const fetchSubscriptionDetails = async () => {
    setLoading(true);
    try {
      const data = await getSubscriptionDetails();
      setSubscriptions(Array.isArray(data) ? data : [data]); // Support for both single and multiple subscriptions
    } catch (err: any) {
      setError(err.message || "Failed to fetch subscription details");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (customerId: number) => {
    setLoading(true);
    try {
      await cancelSubscription(customerId);
      setSuccess("Subscription canceled successfully");
      fetchSubscriptionDetails();
    } catch (err: any) {
      setError(err.message || "Failed to cancel subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async (customerId: number) => {
    setLoading(true);
    try {
      await renewSubscription(customerId);
      setSuccess("Subscription renewed successfully");
      fetchSubscriptionDetails();
    } catch (err: any) {
      setError(err.message || "Failed to renew subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 pt-4">
      <h2>{isAdmin ? "Admin Subscription Management" : "Your Subscription Details"}</h2>
      {loading && <Loading />}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Customer View */}
      {!isAdmin && !loading && subscriptions.length === 1 && (
        <Card className="mt-3">
          <Card.Body>
            <h5>Subscription Information</h5>
            <p>
              <strong>Charge Date:</strong>{" "}
              {new Date(subscriptions[0].chargeDate).toLocaleString()}
            </p>
            <p>
              <strong>Expiry Date:</strong>{" "}
              {new Date(subscriptions[0].expiryDate).toLocaleString()}
            </p>
            <h5 className="mt-4">Billing Information</h5>
            <p>
              <strong>Name:</strong> {subscriptions[0].billingInfo.name}
            </p>
            <p>
              <strong>Card Number:</strong> **** **** ****{" "}
              {subscriptions[0].billingInfo.cardNumber.slice(-4)}
            </p>
            <p>
              <strong>Name on Card:</strong> {subscriptions[0].billingInfo.nameOnCard}
            </p>
            <p>
              <strong>Postal Code:</strong> {subscriptions[0].billingInfo.postalCode}
            </p>
            <div className="mt-3">
              <Button variant="danger" onClick={() => handleCancel(subscriptions[0].customerId)}>
                Cancel Subscription
              </Button>
              <Button variant="success" onClick={() => handleRenew(subscriptions[0].customerId)} className="ms-2">
                Renew Subscription
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Admin View */}
      {isAdmin && !loading && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Subscription ID</th>
              <th>Customer ID</th>
              <th>Billing ID</th>
              <th>Charge Date</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td>{subscription.id}</td>
                <td>{subscription.customerId}</td>
                <td>{subscription.billingId || "N/A"}</td>
                <td>{new Date(subscription.chargeDate).toLocaleString()}</td>
                <td>{new Date(subscription.expiryDate).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancel(subscription.customerId)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleRenew(subscription.customerId)}
                    className="ms-2"
                  >
                    Renew
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Subscription;
