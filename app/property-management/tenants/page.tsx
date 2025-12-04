// CR PROPERTY MANAGEMENT - TENANTS LIST
// Created: December 3, 2025

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  FileText,
  DollarSign,
  Download,
  UserPlus,
  CheckCircle,
  AlertTriangle,
  Clock,
} from 'lucide-react';

interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'active' | 'prospect' | 'notice_given' | 'moved_out';
  property: string;
  unit: string;
  leaseEnd: string;
  monthlyRent: number;
  balance: number;
  aiScore?: number;
}

// Mock data
const mockTenants: Tenant[] = [
  { id: '1', firstName: 'John', lastName: 'Smith', email: 'john.smith@email.com', phone: '(239) 555-0101', status: 'active', property: 'Sunset Apartments', unit: '204', leaseEnd: '2025-06-30', monthlyRent: 1850, balance: 0, aiScore: 92 },
  { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@email.com', phone: '(239) 555-0102', status: 'active', property: 'Oak Street Townhomes', unit: '3B', leaseEnd: '2025-08-15', monthlyRent: 2200, balance: 0, aiScore: 88 },
  { id: '3', firstName: 'Michael', lastName: 'Chen', email: 'm.chen@email.com', phone: '(239) 555-0103', status: 'notice_given', property: 'Sunset Apartments', unit: '118', leaseEnd: '2025-01-31', monthlyRent: 1650, balance: 0, aiScore: 85 },
  { id: '4', firstName: 'Emily', lastName: 'Davis', email: 'emily.d@email.com', phone: '(239) 555-0104', status: 'active', property: 'Palm Plaza', unit: '502', leaseEnd: '2025-09-30', monthlyRent: 1950, balance: 1950, aiScore: 79 },
  { id: '5', firstName: 'Robert', lastName: 'Wilson', email: 'r.wilson@email.com', phone: '(239) 555-0105', status: 'prospect', property: 'Sunset Apartments', unit: '305', leaseEnd: '', monthlyRent: 1750, balance: 0, aiScore: 94 },
  { id: '6', firstName: 'Jennifer', lastName: 'Brown', email: 'j.brown@email.com', phone: '(239) 555-0106', status: 'active', property: 'River View Condos', unit: '201', leaseEnd: '2025-04-15', monthlyRent: 2100, balance: 0, aiScore: 91 },
];

const statusConfig = {
  active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700' },
  prospect: { label: 'Prospect', color: 'bg-blue-100 text-blue-700' },
  notice_given: { label: 'Notice Given', color: 'bg-amber-100 text-amber-700' },
  moved_out: { label: 'Moved Out', color: 'bg-gray-100 text-gray-700' },
};

function TenantCard({ tenant }: { tenant: Tenant }) {
  const status = statusConfig[tenant.status];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold">
            {tenant.firstName[0]}{tenant.lastName[0]}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{tenant.firstName} {tenant.lastName}</h3>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                <Link href={`/property-management/tenants/${tenant.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Eye className="w-4 h-4" /> View Details
                </Link>
                <Link href={`/property-management/tenants/${tenant.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Edit className="w-4 h-4" /> Edit Tenant
                </Link>
                <Link href={`/property-management/leases?tenant=${tenant.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <FileText className="w-4 h-4" /> View Lease
                </Link>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          {tenant.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          {tenant.phone}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          {tenant.property} • Unit {tenant.unit}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-50">
        <div>
          <p className="text-xs text-gray-500">Rent</p>
          <p className="font-semibold text-gray-900">${tenant.monthlyRent.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Balance</p>
          <p className={`font-semibold ${tenant.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
            ${tenant.balance.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">AI Score</p>
          <p className={`font-semibold ${
            (tenant.aiScore || 0) >= 85 ? 'text-emerald-600' :
            (tenant.aiScore || 0) >= 70 ? 'text-amber-600' :
            'text-red-600'
          }`}>
            {tenant.aiScore || 'N/A'}
          </p>
        </div>
      </div>

      <Link
        href={`/property-management/tenants/${tenant.id}`}
        className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 transition-colors"
      >
        View Profile
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function TenantRow({ tenant }: { tenant: Tenant }) {
  const status = statusConfig[tenant.status];

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
            {tenant.firstName[0]}{tenant.lastName[0]}
          </div>
          <div>
            <p className="font-medium text-gray-900">{tenant.firstName} {tenant.lastName}</p>
            <p className="text-sm text-gray-500">{tenant.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
          {status.label}
        </span>
      </td>
      <td className="px-4 py-4">
        <p className="text-gray-900">{tenant.property}</p>
        <p className="text-sm text-gray-500">Unit {tenant.unit}</p>
      </td>
      <td className="px-4 py-4 text-gray-900">${tenant.monthlyRent.toLocaleString()}</td>
      <td className={`px-4 py-4 font-medium ${tenant.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
        ${tenant.balance.toLocaleString()}
      </td>
      <td className="px-4 py-4">
        <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-medium ${
          (tenant.aiScore || 0) >= 85 ? 'bg-emerald-50 text-emerald-700' :
          (tenant.aiScore || 0) >= 70 ? 'bg-amber-50 text-amber-700' :
          'bg-red-50 text-red-700'
        }`}>
          {tenant.aiScore || 'N/A'}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Link href={`/property-management/tenants/${tenant.id}`} className="p-2 hover:bg-gray-100 rounded-lg">
            <Eye className="w-4 h-4 text-gray-500" />
          </Link>
          <Link href={`/property-management/tenants/${tenant.id}/edit`} className="p-2 hover:bg-gray-100 rounded-lg">
            <Edit className="w-4 h-4 text-gray-500" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default function TenantsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTenants = mockTenants.filter(t => {
    const matchesSearch = 
      t.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockTenants.length,
    active: mockTenants.filter(t => t.status === 'active').length,
    withBalance: mockTenants.filter(t => t.balance > 0).length,
    totalBalance: mockTenants.reduce((sum, t) => sum + t.balance, 0),
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
          <p className="text-gray-500 mt-1">Manage your tenant relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <Link
            href="/property-management/tenants/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Tenant</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">Total Tenants</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Active</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span className="text-sm text-gray-500">With Balance Due</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.withBalance}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-500">Total Outstanding</span>
          </div>
          <p className="text-3xl font-bold text-red-600">${stats.totalBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tenants..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'active', label: 'Active' },
              { value: 'prospect', label: 'Prospects' },
              { value: 'notice_given', label: 'Notice Given' },
            ].map((status) => (
              <button
                key={status.value}
                onClick={() => setStatusFilter(status.value)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  statusFilter === status.value
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-gray-50 rounded-xl p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tenants */}
      {filteredTenants.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tenants found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <Link
            href="/property-management/tenants/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4" />
            Add Your First Tenant
          </Link>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenants.map((tenant) => (
            <TenantCard key={tenant.id} tenant={tenant} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tenant</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Property</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rent</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Balance</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">AI Score</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredTenants.map((tenant) => (
                  <TenantRow key={tenant.id} tenant={tenant} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
