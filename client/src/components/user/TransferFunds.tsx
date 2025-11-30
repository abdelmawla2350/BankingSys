import React, { useState } from 'react';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";
import { Send, AlertTriangle, CheckCircle } from "lucide-react";

const TransferFunds: React.FC = () => {
  const [formData, setFormData] = useState({
    recipientAccount: '',
    amount: '',
    description: '',
    transferType: 'internal'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transferStatus, setTransferStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.recipientAccount.trim()) {
      newErrors.recipientAccount = 'Recipient account is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (parseFloat(formData.amount) > 12543.67) { // Current balance
      newErrors.amount = 'Insufficient funds';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setTransferStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setTransferStatus('success');
      // Reset form on success
      setFormData({
        recipientAccount: '',
        amount: '',
        description: '',
        transferType: 'internal'
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Transfer Funds</h1>
        <p className="text-muted-foreground">Send money to another account securely.</p>
      </div>

      {/* Current Balance */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-primary">$12,543.67</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Account</p>
            <p className="text-sm font-medium">****1234</p>
          </div>
        </div>
      </Card>

      {/* Transfer Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transfer Type */}
          <div className="space-y-2">
            <Label htmlFor="transferType">Transfer Type</Label>
            <Select
              value={formData.transferType}
              onValueChange={(value) => handleInputChange('transferType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select transfer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal Transfer</SelectItem>
                <SelectItem value="external">External Transfer</SelectItem>
                <SelectItem value="international">International Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Account */}
          <div className="space-y-2">
            <Label htmlFor="recipientAccount">
              {formData.transferType === 'internal' ? 'Recipient Account Number' : 'Recipient Details'}
            </Label>
            <Input
              id="recipientAccount"
              placeholder={formData.transferType === 'internal' ? 'Enter account number' : 'Enter recipient details'}
              value={formData.recipientAccount}
              onChange={(e) => handleInputChange('recipientAccount', e.target.value)}
              className={errors.recipientAccount ? 'border-red-500' : ''}
            />
            {errors.recipientAccount && (
              <p className="text-sm text-red-500">{errors.recipientAccount}</p>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a note for this transfer..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Security Notice */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please verify all details before proceeding. Transfers are irreversible once confirmed.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Processing Transfer...'
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Transfer ${formData.amount || '0.00'}
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Success Message */}
      {transferStatus === 'success' && (
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Transfer completed successfully! The funds have been sent to the recipient.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default TransferFunds;
