import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { CheckCircle, Building, ArrowRight } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('bgr_checkout');
    if (data) {
      setCheckoutData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <Card className="border-2 border-green-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl">Registration Complete!</CardTitle>
            <CardDescription>
              Your payment has been processed successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {checkoutData && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Site:</span>
                  <span className="font-semibold">{checkoutData.siteName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Payment Plan:</span>
                  <span className="font-semibold capitalize">{checkoutData.pricingType}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="text-lg font-bold text-green-600">
                    ${checkoutData.price}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                You will receive a confirmation email shortly with next steps and program information.
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <Button
                onClick={() => navigate('/')}
                className="w-full"
                variant="outline"
              >
                Register Another Child
              </Button>
              <Button
                onClick={() => window.location.href = 'https://parent.gofast.com'}
                className="w-full"
              >
                Go to Parent Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;

