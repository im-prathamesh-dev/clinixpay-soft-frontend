import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Receipt,
} from 'lucide-react';

const Billing = () => {
  /* =====================
     STATE
  ===================== */
  const [searchQuery, setSearchQuery] = useState('');
  const [billItems, setBillItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [patient, setPatient] = useState({
    name: '',
    mobile: '',
    doctor: '',
  });

  

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMode, setPaymentMode] = useState('CASH');

  /* =====================
     DUMMY PRODUCTS
  ===================== */
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
  ];

  /* =====================
     HELPERS
  ===================== */
  const isExpired = (expiry) => new Date(expiry) < new Date();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const found = products.find((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setSelectedProduct(found || null);
    } else {
      setSelectedProduct(null);
    }
  };

  const addToBill = (product) => {
    if (isExpired(product.expiry)) {
      alert('❌ Expired medicine cannot be sold');
      return;
    }

    const existing = billItems.find((i) => i.id === product.id);
    if (existing) {
      updateQuantity(product.id, existing.quantity + 1);
    } else {
      setBillItems([...billItems, { ...product, quantity: 1, discount: 0 }]);
    }

    setSearchQuery('');
    setSelectedProduct(null);
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      setBillItems(billItems.filter((i) => i.id !== id));
      return;
    }

    setBillItems(
      billItems.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      )
    );
  };

  const updateDiscount = (id, discount) => {
    setBillItems(
      billItems.map((i) =>
        i.id === id ? { ...i, discount: Number(discount) || 0 } : i
      )
    );
  };

  const calculateItemTotal = (item) => {
    const base = item.mrp * item.quantity;
    const discount = (base * item.discount) / 100;
    const taxable = base - discount;
    const gst = (taxable * item.gst) / 100;
    return { taxable, discount, gst, total: taxable + gst };
  };

  const billSummary = billItems.reduce(
    (acc, item) => {
      const t = calculateItemTotal(item);
      acc.subtotal += t.taxable;
      acc.discount += t.discount;
      acc.gst += t.gst;
      return acc;
    },
    { subtotal: 0, discount: 0, gst: 0 }
  );

  billSummary.grandTotal = billSummary.subtotal + billSummary.gst;

  /* =====================
     JSX
  ===================== */
  return (
    <div className="space-y-4 pb-20">
      <h1 className="text-3xl font-bold">New Bill</h1>

      {/* PATIENT DETAILS */}
      <Card>
        <h2 className="font-semibold mb-3">Patient Details</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <Input
            placeholder="Patient Name"
            value={patient.name}
            onChange={(e) =>
              setPatient({ ...patient, name: e.target.value })
            }
          />
          <Input
            placeholder="Mobile Number"
            maxLength={10}
            value={patient.mobile}
            onChange={(e) =>
              setPatient({ ...patient, mobile: e.target.value })
            }
          />
          <Input
            placeholder="Doctor Name"
            value={patient.doctor}
            onChange={(e) =>
              setPatient({ ...patient, doctor: e.target.value })
            }
          />
        </div>

      </Card>

      {/* SEARCH */}
      <Card>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search medicine..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
         
        </div>

        {selectedProduct && (
          <div className="mt-3 p-3 border rounded flex justify-between">
            <div>
              <p className="font-semibold">{selectedProduct.name}</p>
              <p className="text-sm text-gray-500">
                MRP ₹{selectedProduct.mrp} | Stock {selectedProduct.stock}
              </p>
              <p className="text-xs">
                Batch {selectedProduct.batch} | Exp{' '}
                {selectedProduct.expiry}
              </p>
            </div>
            <Button onClick={() => addToBill(selectedProduct)}>
              <Plus size={16} /> Add
            </Button>
          </div>
        )}
      </Card>

      {/* BILL ITEMS */}
      <Card>
        <h2 className="font-semibold mb-3">
          Bill Items ({billItems.length})
        </h2>

        {billItems.length === 0 ? (
          <div className="text-center py-10">
            <Receipt size={50} className="mx-auto text-gray-300" />
            <p className="text-gray-500">No items added</p>
          </div>
        ) : (
          billItems.map((item) => {
            const t = calculateItemTotal(item);
            return (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.batch} | GST {item.gst}%
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    <Minus size={14} />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Plus size={14} />
                  </Button>
                </div>

                <input
                  type="number"
                  className="w-16 border rounded px-1 py-0.5 text-center"
                  placeholder="Disc %"
                  value={item.discount}
                  onChange={(e) =>
                    updateDiscount(item.id, e.target.value)
                  }
                />

                <p className="font-semibold">
                  ₹{t.total.toFixed(2)}
                </p>

                <button
                  onClick={() =>
                    setBillItems(
                      billItems.filter((i) => i.id !== item.id)
                    )
                  }
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })
        )}
      </Card>

      {/* SUMMARY */}
      <Card>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{billSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{billSummary.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST</span>
            <span>₹{billSummary.gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Grand Total</span>
            <span>₹{billSummary.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="mt-4"
          fullWidth
          size="lg"
          disabled={!patient.name || billItems.length === 0}
          onClick={() => setShowPayment(true)}
        >
          PAY ₹{billSummary.grandTotal.toFixed(2)}
        </Button>
      </Card>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <Card className="w-full max-w-sm">
            <h2 className="font-semibold mb-3">Payment Mode</h2>

            {['CASH', 'UPI', 'CARD'].map((m) => (
              <label key={m} className="flex gap-2 mb-2">
                <input
                  type="radio"
                  checked={paymentMode === m}
                  onChange={() => setPaymentMode(m)}
                />
                {m}
              </label>
            ))}

            <div className="flex gap-2 mt-4">
              <Button
                fullWidth
                onClick={() => {
                  console.log({
                    patient,
                    billItems,
                    billSummary,
                    paymentMode,
                  });
                  alert('✅ Bill Generated');
                  setBillItems([]);
                  setShowPayment(false);
                }}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowPayment(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Billing;
