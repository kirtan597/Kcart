import React, { useEffect, useState } from "react";
import axios from "axios";
import { backEndURL, currency } from "../App";

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const BarChart = ({ data, maxVal }) => (
  <div className="flex items-end gap-3 h-36 mt-2">
    {data.map(({ label, value, color }) => {
      const pct = maxVal > 0 ? (value / maxVal) * 100 : 0;
      return (
        <div key={label} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-xs font-semibold text-gray-700">{value}</span>
          <div className="w-full rounded-t-lg transition-all duration-500" style={{ height: `${Math.max(pct, 4)}%`, background: color }} />
          <span className="text-xs text-gray-500 truncate w-full text-center">{label}</span>
        </div>
      );
    })}
  </div>
);

const DonutChart = ({ segments, size = 120 }) => {
  const r = 40, cx = 60, cy = 60, circ = 2 * Math.PI * r;
  let offset = 0;
  const total = segments.reduce((s, d) => s + d.value, 0);
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="18" />
      {segments.map((seg, i) => {
        const dash = total > 0 ? (seg.value / total) * circ : 0;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth="18"
            strokeDasharray={`${dash} ${circ}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px" }}
          />
        );
        offset += dash;
        return el;
      })}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1f2937">{total}</text>
    </svg>
  );
};

const STATUS_COLORS = {
  "Delivered": "#22c55e",
  "Order Placed": "#6366f1",
  "Packing": "#f59e0b",
  "Order Shipped": "#3b82f6",
  "Out for Delivery": "#8b5cf6",
  "Cancelled": "#ef4444",
};

const CAT_COLORS = { Men: "#6366f1", Women: "#ec4899", Kids: "#f59e0b" };
const SUB_COLORS = { Topwear: "#6366f1", Bottomwear: "#22c55e", Winterwear: "#f59e0b" };

const Dashboard = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, oRes] = await Promise.all([
          axios.get(`${backEndURL}/products`),
          axios.post(`${backEndURL}/orders`, {}, { headers: { token } }),
        ]);
        if (pRes.data.success) setProducts(pRes.data.products);
        if (oRes.data.success) setOrders(oRes.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (_) {}
      setLoading(false);
    };
    load();
  }, [token]);

  const totalRevenue = orders.filter(o => o.payment).reduce((s, o) => s + o.amount, 0);
  const pendingOrders = orders.filter(o => !["Delivered", "Cancelled"].includes(o.status)).length;
  const bestsellers = products.filter(p => p.bestseller).length;

  const catCount = products.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc; }, {});
  const subCount = products.reduce((acc, p) => { acc[p.subCategory] = (acc[p.subCategory] || 0) + 1; return acc; }, {});
  const statusCount = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {});

  const catBars = Object.entries(catCount).map(([k, v]) => ({ label: k, value: v, color: CAT_COLORS[k] || "#6366f1" }));
  const subBars = Object.entries(subCount).map(([k, v]) => ({ label: k, value: v, color: SUB_COLORS[k] || "#6366f1" }));
  const statusSegments = Object.entries(statusCount).map(([k, v]) => ({ label: k, value: v, color: STATUS_COLORS[k] || "#9ca3af" }));

  const maxCat = Math.max(...catBars.map(b => b.value), 1);
  const maxSub = Math.max(...subBars.map(b => b.value), 1);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
    </div>
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-800 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-semibold tracking-wide">Dashboard Overview</h1>
        <p className="text-indigo-200 text-sm mt-1">Welcome back, Admin — here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          color="bg-indigo-100"
          icon={<svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
          label="Total Products" value={products.length} sub={`${bestsellers} bestsellers`}
        />
        <StatCard
          color="bg-green-100"
          icon={<svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          label="Total Revenue" value={`${currency}${totalRevenue.toLocaleString()}`} sub="Paid orders only"
        />
        <StatCard
          color="bg-purple-100"
          icon={<svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
          label="Total Orders" value={orders.length} sub={`${pendingOrders} pending`}
        />
        <StatCard
          color="bg-yellow-100"
          icon={<svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
          label="Bestsellers" value={bestsellers} sub={`of ${products.length} products`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Products by Category</h2>
          <p className="text-xs text-gray-400 mb-2">Distribution across Men, Women, Kids</p>
          <BarChart data={catBars} maxVal={maxCat} />
          <div className="flex flex-wrap gap-2 mt-3">
            {catBars.map(b => (
              <span key={b.label} className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: b.color }} />{b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Subcategory Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Products by Subcategory</h2>
          <p className="text-xs text-gray-400 mb-2">Topwear, Bottomwear, Winterwear</p>
          <BarChart data={subBars} maxVal={maxSub} />
          <div className="flex flex-wrap gap-2 mt-3">
            {subBars.map(b => (
              <span key={b.label} className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: b.color }} />{b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Order Status Donut */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Order Status</h2>
          <p className="text-xs text-gray-400 mb-2">Breakdown of all order statuses</p>
          <div className="flex items-center gap-4 mt-2">
            <DonutChart segments={statusSegments} />
            <div className="flex flex-col gap-1.5">
              {statusSegments.map(s => (
                <span key={s.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="truncate">{s.label}</span>
                  <span className="font-semibold text-gray-800 ml-auto pl-2">{s.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Recent Orders</h2>
            <p className="text-xs text-gray-400">Latest 5 orders</p>
          </div>
          <a href="/orders" className="text-xs text-indigo-600 hover:underline font-medium">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Order ID</th>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left">Items</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Payment</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.slice(0, 5).map(order => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{order.address.firstName} {order.address.lastName}</td>
                  <td className="px-5 py-3 text-gray-500">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: (STATUS_COLORS[order.status] || "#9ca3af") + "22", color: STATUS_COLORS[order.status] || "#6b7280" }}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium ${order.payment ? "text-green-600" : "text-yellow-600"}`}>
                      {order.payment ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-800">{currency}{order.amount.toLocaleString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Top Products</h2>
            <p className="text-xs text-gray-400">Bestsellers in your catalog</p>
          </div>
          <a href="/list" className="text-xs text-indigo-600 hover:underline font-medium">View all →</a>
        </div>
        <div className="divide-y divide-gray-50">
          {products.filter(p => p.bestseller).slice(0, 5).map(p => (
            <div key={p._id} className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors">
              <img src={p.image[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                <p className="text-xs text-gray-400">{p.category} · {p.subCategory}</p>
              </div>
              <span className="text-sm font-semibold text-gray-700">{currency}{p.price.toLocaleString()}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Bestseller</span>
            </div>
          ))}
          {products.filter(p => p.bestseller).length === 0 && (
            <p className="px-6 py-8 text-center text-gray-400 text-sm">No bestsellers marked yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
