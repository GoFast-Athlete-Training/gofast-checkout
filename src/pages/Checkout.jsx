import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Building, CreditCard, CheckCircle } from 'lucide-react';

// Mock sites with pricing (would come from Head Coach's Registration Setup)
const sites = [
  {
    id: '1',
    name: 'Discovery Elementary',
    location: 'Washington, DC',
    pricing: {
      monthly: 150,
      semester: 600,
      annual: 1100
    }
  },
  {
    id: '2',
    name: 'Hydrate',
    location: 'Bethesda, MD',
    pricing: {
      monthly: 175,
      semester: 650,
      annual: 1200
    }
  },
  {
    id: '3',
    name: 'North Site',
    location: 'Silver Spring, MD',
    pricing: {
      monthly: 150,
      semester: 600,
      annual: 1100
    }
  },
  {
    id: '4',
    name: 'South Site',
    location: 'Alexandria, VA',
    pricing: {
      monthly: 165,
      semester: 625,
      annual: 1150
    }
  }
];

// Checkout Form Component
function CheckoutForm({ selectedSite, selectedPricing, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardData, setCardData] = useState({
    cardNumber: '4242 4242 4242 4242',
    expiryDate: '12/25',
    cvv: '123',
    cardholderName: 'John Doe'
  });

  const handleChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardholderName) {
      setError('Please fill in all card fields');
      return;
    }

    setLoading(true);
    setError(null);

    // Demo: Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In real implementation, this would:
    // 1. Call backend to create Stripe payment intent
    // 2. Use Stripe Elements to securely process card
    // 3. Confirm payment with Stripe

    setLoading(false);
    onSuccess();
  };

  // Format card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData({ ...cardData, cardNumber: formatted });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Cardholder Name</label>
        <Input
          name="cardholderName"
          value={cardData.cardholderName}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Card Number</label>
        <Input
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={handleCardNumberChange}
          placeholder="4242 4242 4242 4242"
          maxLength="19"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Demo mode: Use any card number (e.g., 4242 4242 4242 4242)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Expiry Date</label>
          <Input
            name="expiryDate"
            value={cardData.expiryDate}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
              }
              setCardData({ ...cardData, expiryDate: value });
            }}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">CVV</label>
          <Input
            name="cvv"
            type="text"
            value={cardData.cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').substring(0, 4);
              setCardData({ ...cardData, cvv: value });
            }}
            placeholder="123"
            maxLength="4"
            required
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-orange-600">
            ${selectedPricing.price}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {selectedPricing.type} payment plan
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading}
      >
        {loading ? (
          'Processing...'
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Complete Payment
          </>
        )}
      </Button>
    </form>
  );
}

// Main Checkout Page
function Checkout() {
  const navigate = useNavigate();
  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [selectedPricingType, setSelectedPricingType] = useState('monthly');
  const [step, setStep] = useState('site'); // 'site' | 'payment'

  const selectedSite = sites.find(s => s.id === selectedSiteId);
  const selectedPricing = selectedSite
    ? {
        type: selectedPricingType,
        price: selectedSite.pricing[selectedPricingType]
      }
    : null;

  const handleSiteSelect = () => {
    if (selectedSiteId) {
      setStep('payment');
    }
  };

  const handleSuccess = () => {
    // Store checkout data
    localStorage.setItem('bgr_checkout', JSON.stringify({
      siteId: selectedSiteId,
      siteName: selectedSite?.name,
      pricingType: selectedPricingType,
      price: selectedPricing?.price,
      timestamp: new Date().toISOString()
    }));
    navigate('/success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building className="w-8 h-8 text-orange-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Boys Gotta Run</h1>
          </div>
          <p className="text-gray-600">Complete your registration</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step === 'site' ? 'text-orange-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'site' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
                {step === 'payment' ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className="ml-2 font-medium">Select Site</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step === 'payment' ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        {step === 'site' ? (
          <Card>
            <CardHeader>
              <CardTitle>Select Your Site</CardTitle>
              <CardDescription>
                Choose the location where your child will participate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Site Location</label>
                <select
                  value={selectedSiteId}
                  onChange={(e) => setSelectedSiteId(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
                >
                  <option value="">Select a site...</option>
                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.name} - {site.location}
                    </option>
                  ))}
                </select>
              </div>

              {selectedSite && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">{selectedSite.name}</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Location: {selectedSite.location}</p>
                    <div className="border-t pt-3 mt-3">
                      <label className="block text-sm font-medium mb-2">Payment Plan</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer hover:bg-orange-50">
                          <input
                            type="radio"
                            name="pricing"
                            value="monthly"
                            checked={selectedPricingType === 'monthly'}
                            onChange={(e) => setSelectedPricingType(e.target.value)}
                            className="text-orange-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium">Monthly</div>
                            <div className="text-sm text-gray-600">${selectedSite.pricing.monthly}/month</div>
                          </div>
                          <div className="text-lg font-bold">${selectedSite.pricing.monthly}</div>
                        </label>
                        <label className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer hover:bg-orange-50">
                          <input
                            type="radio"
                            name="pricing"
                            value="semester"
                            checked={selectedPricingType === 'semester'}
                            onChange={(e) => setSelectedPricingType(e.target.value)}
                            className="text-orange-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium">Semester</div>
                            <div className="text-sm text-gray-600">${selectedSite.pricing.semester} per semester</div>
                          </div>
                          <div className="text-lg font-bold">${selectedSite.pricing.semester}</div>
                        </label>
                        <label className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer hover:bg-orange-50">
                          <input
                            type="radio"
                            name="pricing"
                            value="annual"
                            checked={selectedPricingType === 'annual'}
                            onChange={(e) => setSelectedPricingType(e.target.value)}
                            className="text-orange-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium">Annual</div>
                            <div className="text-sm text-gray-600">${selectedSite.pricing.annual} per year</div>
                          </div>
                          <div className="text-lg font-bold">${selectedSite.pricing.annual}</div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleSiteSelect}
                className="w-full"
                size="lg"
                disabled={!selectedSiteId}
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                {selectedSite?.name} - {selectedPricingType} plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Site:</span>
                  <span className="font-semibold">{selectedSite?.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold capitalize">{selectedPricingType}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-xl font-bold text-orange-600">
                    ${selectedPricing?.price}
                  </span>
                </div>
              </div>

              <CheckoutForm
                selectedSite={selectedSite}
                selectedPricing={selectedPricing}
                onSuccess={handleSuccess}
              />

              <Button
                variant="ghost"
                onClick={() => setStep('site')}
                className="w-full mt-4"
              >
                ← Back to Site Selection
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Checkout;

