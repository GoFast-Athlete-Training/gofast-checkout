import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { CheckCircle, Building, ArrowRight, Mail, Calendar, MapPin } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('bgr_checkout');
    if (data) {
      setCheckoutData(JSON.parse(data));
    }
    // Show email notification after a short delay
    setTimeout(() => {
      setShowEmail(true);
    }, 2000);
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

            {/* Email Notification Demo */}
            {showEmail && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6 mt-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Welcome Email Sent!</h3>
                    <p className="text-xs text-gray-600">Check your inbox for registration details</p>
                  </div>
                </div>
                
                {/* Sample Email Preview */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-left">
                  <div className="border-b border-gray-200 pb-3 mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <img src="/logo.avif" alt="Boys Gotta Run" className="w-6 h-6" />
                      <span className="font-semibold text-sm">Boys Gotta Run</span>
                    </div>
                    <p className="text-xs text-gray-500">Welcome to Boys Gotta Run!</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Hi there!</p>
                      <p className="text-gray-700 leading-relaxed">
                        Welcome to Boys Gotta Run! We're thrilled that {checkoutData?.siteName ? `your child will be joining us at ${checkoutData.siteName}` : 'your child will be joining our program'}.
                      </p>
                    </div>
                    
                    {checkoutData && (
                      <div className="bg-orange-50 rounded-lg p-3 space-y-2">
                        <div className="flex items-center space-x-2 text-xs">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold text-orange-900">Program Details:</span>
                        </div>
                        <div className="text-xs text-gray-700 space-y-1 pl-6">
                          <p><strong>Site:</strong> {checkoutData.siteName}</p>
                          <p><strong>Payment Plan:</strong> {checkoutData.pricingType.charAt(0).toUpperCase() + checkoutData.pricingType.slice(1)}</p>
                          <p><strong>Amount:</strong> ${checkoutData.price}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">What's Next?</p>
                      <ul className="text-gray-700 space-y-1 text-xs pl-4 list-disc">
                        <li>You'll receive program schedule information within 24 hours</li>
                        <li>Our coach will reach out to introduce themselves</li>
                        <li>Check your Parent Portal for weekly updates and progress reports</li>
                      </ul>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        Questions? Reply to this email or contact us at{' '}
                        <a href="mailto:support@gofast.com" className="text-orange-600 hover:underline">support@gofast.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!showEmail && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Sending welcome email...
                </p>
              </div>
            )}

            <div className="pt-4 space-y-2">
              <Button
                onClick={() => navigate('/')}
                className="w-full"
                variant="outline"
              >
                Register Another Child
              </Button>
              <Button
                onClick={() => window.location.href = 'https://runprogramparent.gofastcrushgoals.com'}
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

