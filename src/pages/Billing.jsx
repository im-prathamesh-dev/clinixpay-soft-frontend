import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Search, Plus, Minus, Trash2, Barcode, Receipt } from 'lucide-react';

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [billItems, setBillItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Dummy products data
  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      mrp: 25,
      stock: 150,
      batch: 'BATCH-001',
      expiry: '2025-12-31',
      gst: 5,
      hsn: '30049090',
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      mrp: 45,
      stock: 80,
      batch: 'BATCH-002',
      expiry: '2025-10-15',
      gst: 5,
      hsn: '30041010',
    },
    {
      id: 3,
      name: 'Cough Syrup 100ml',
      mrp: 120,
      stock: 45,
      batch: 'BATCH-003',
      expiry: '2026-03-20',
      gst: 12,
      hsn: '30049090',
    },
    {
      id: 4,
      name: 'Bandage 5cm',
      mrp: 15,
      stock: 200,
      batch: 'BATCH-004',
      expiry: '2027-01-01',
      gst: 5,
      hsn: '30059090',
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const found = products.find(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.batch.toLowerCase().includes(query.toLowerCase())
      );
      setSelectedProduct(found || null);
    } else {
      setSelectedProduct(null);
    }
  };

  const addToBill = (product) => {
    const existingItem = billItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setBillItems([
        ...billItems,
        {
          ...product,
          quantity: 1,
          discount: 0,
        },
      ]);
    }
    setSearchQuery('');
    setSelectedProduct(null);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setBillItems(
      billItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setBillItems(billItems.filter((item) => item.id !== id));
  };

  const updateDiscount = (id, discount) => {
    setBillItems(
      billItems.map((item) =>
        item.id === id ? { ...item, discount: parseFloat(discount) || 0 } : item
      )
    );
  };

  const calculateItemTotal = (item) => {
    const basePrice = item.mrp * item.quantity;
    const discountAmount = (basePrice * item.discount) / 100;
    const taxableAmount = basePrice - discountAmount;
    const gstAmount = (taxableAmount * item.gst) / 100;
    return {
      basePrice,
      discountAmount,
      taxableAmount,
      gstAmount,
      total: taxableAmount + gstAmount,
    };
  };

  const calculateBillSummary = () => {
    const summary = billItems.reduce(
      (acc, item) => {
        const itemTotal = calculateItemTotal(item);
        acc.subtotal += itemTotal.taxableAmount;
        acc.totalGst += itemTotal.gstAmount;
        acc.totalDiscount += itemTotal.discountAmount;
        return acc;
      },
      { subtotal: 0, totalGst: 0, totalDiscount: 0 }
    );
    summary.grandTotal = summary.subtotal + summary.totalGst;
    return summary;
  };

  const billSummary = calculateBillSummary();

  const isExpiringSoon = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysDiff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysDiff <= 30 && daysDiff > 0;
  };

  const isExpired = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };

  return (
    <div className="space-y-4 pb-20 lg:pb-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            New Bill
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Scan barcode or search product
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Product Search & Bill Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Product Search */}
          <Card>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search product or scan barcode..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
              <Button variant="outline" className="px-4">
                <Barcode className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Suggestions */}
            {selectedProduct && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      MRP: ₹{selectedProduct.mrp} | Stock: {selectedProduct.stock}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                        Batch: {selectedProduct.batch}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          isExpired(selectedProduct.expiry)
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : isExpiringSoon(selectedProduct.expiry)
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        }`}
                      >
                        Exp: {new Date(selectedProduct.expiry).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => addToBill(selectedProduct)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Bill Items Table */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Bill Items ({billItems.length})
            </h2>
            {billItems.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No items added. Search and add products to create a bill.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Product
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Qty
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Rate
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Disc%
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Total
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {billItems.map((item) => {
                      const itemTotal = calculateItemTotal(item);
                      return (
                        <tr
                          key={item.id}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="py-3 px-2">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                {item.name}
                              </p>
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {item.batch}
                                </span>
                                <span
                                  className={`text-xs ${
                                    isExpired(item.expiry)
                                      ? 'text-red-600 dark:text-red-400'
                                      : isExpiringSoon(item.expiry)
                                      ? 'text-orange-600 dark:text-orange-400'
                                      : 'text-gray-500 dark:text-gray-400'
                                  }`}
                                >
                                  Exp: {new Date(item.expiry).toLocaleDateString()}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                GST {item.gst}% | HSN: {item.hsn}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-semibold text-gray-900 dark:text-gray-100">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-right text-sm text-gray-900 dark:text-gray-100">
                            ₹{item.mrp}
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={item.discount}
                              onChange={(e) => updateDiscount(item.id, e.target.value)}
                              className="w-16 px-2 py-1 text-sm text-right border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </td>
                          <td className="py-3 px-2 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                            ₹{itemTotal.total.toFixed(2)}
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors mx-auto block"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Right: Bill Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Bill Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  ₹{billSummary.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Discount</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  -₹{billSummary.totalDiscount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total GST</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  ₹{billSummary.totalGst.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold text-primary">
                    ₹{billSummary.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* GST Breakup */}
            {billItems.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  GST Breakup
                </h3>
                <div className="space-y-1 text-xs">
                  {[5, 12, 18].map((gstRate) => {
                    const gstItems = billItems.filter((item) => item.gst === gstRate);
                    if (gstItems.length === 0) return null;
                    const gstAmount = gstItems.reduce((sum, item) => {
                      const itemTotal = calculateItemTotal(item);
                      return sum + itemTotal.gstAmount;
                    }, 0);
                    return (
                      <div key={gstRate} className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          GST {gstRate}%
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          ₹{gstAmount.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payment Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={billItems.length === 0}
              className="mt-4 py-4 text-lg font-bold"
            >
              PAY ₹{billSummary.grandTotal.toFixed(2)}
            </Button>

            {/* Quick Actions */}
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setBillItems([])}
                disabled={billItems.length === 0}
              >
                Clear
              </Button>
              <Button variant="outline" size="md" fullWidth>
                Hold
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;

