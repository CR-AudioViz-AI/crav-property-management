// CR PROPERTY MANAGEMENT - PROPERTIES LIST
// Created: December 3, 2025
// Full-featured property listing with filters, search, and views

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Home,
  Store,
  Factory,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Users,
  DollarSign,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Settings,
  Download,
  Upload,
} from 'lucide-react';

interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  category: 'residential' | 'commercial' | 'industrial';
  type: string;
  units: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  occupancyRate: number;
  image?: string;
}

// Mock data - replace with API call
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Sunset Blvd',
    city: 'Fort Myers',
    state: 'FL',
    zip: '33901',
    category: 'residential',
    type: 'Apartment Complex',
    units: 48,
    occupiedUnits: 46,
    monthlyRevenue: 86400,
    occupancyRate: 96,
  },
  {
    id: '2',
    name: 'Oak Street Townhomes',
    address: '456 Oak Street',
    city: 'Cape Coral',
    state: 'FL',
    zip: '33990',
    category: 'residential',
    type: 'Townhouse',
    units: 12,
    occupiedUnits: 11,
    monthlyRevenue: 26400,
    occupancyRate: 92,
  },
  {
    id: '3',
    name: 'Palm Plaza Office',
    address: '789 Palm Drive',
    city: 'Fort Myers',
    state: 'FL',
    zip: '33901',
    category: 'commercial',
    type: 'Office Building',
    units: 24,
    occupiedUnits: 22,
    monthlyRevenue: 48000,
    occupancyRate: 92,
  },
  {
    id: '4',
    name: 'Gateway Industrial Park',
    address: '321 Gateway Blvd',
    city: 'Lehigh Acres',
    state: 'FL',
    zip: '33936',
    category: 'industrial',
    type: 'Warehouse',
    units: 8,
    occupiedUnits: 7,
    monthlyRevenue: 32000,
    occupancyRate: 88,
  },
  {
    id: '5',
    name: 'Downtown Retail Center',
    address: '555 Main Street',
    city: 'Fort Myers',
    state: 'FL',
    zip: '33901',
    category: 'commercial',
    type: 'Retail',
    units: 16,
    occupiedUnits: 14,
    monthlyRevenue: 42000,
    occupancyRate: 88,
  },
  {
    id: '6',
    name: 'Riverside Condos',
    address: '888 River Road',
    city: 'Fort Myers',
    state: 'FL',
    zip: '33901',
    category: 'residential',
    type: 'Condo',
    units: 32,
    occupiedUnits: 31,
    monthlyRevenue: 64000,
    occupancyRate: 97,
  },
];

const categoryConfig = {
  residential: {
    icon: Home,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  commercial: {
    icon: Store,
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
  },
  industrial: {
    icon: Factory,
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
  },
};

function PropertyCard({ property }: { property: Property }) {
  const config = categoryConfig[property.category];
  const Icon = config.icon;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 transition-all group">
      {/* Image/Header */}
      <div className={`h-32 relative ${
        property.category === 'residential' ? 'bg-gradient-to-br from-emerald-400 to-teal-500' :
        property.category === 'commercial' ? 'bg-gradient-to-br from-blue-400 to-indigo-500' :
        'bg-gradient-to-br from-orange-400 to-amber-500'
      }`}>
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id={`grid-${property.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#grid-${property.id})`} />
          </svg>
        </div>
        <div className="absolute top-4 left-4">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium bg-white/20 text-white backdrop-blur-sm`}>
            {property.type}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-white" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                  <Link href={`/property-management/properties/${property.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Eye className="w-4 h-4" /> View Details
                  </Link>
                  <Link href={`/property-management/properties/${property.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Edit className="w-4 h-4" /> Edit Property
                  </Link>
                  <Link href={`/property-management/units?property=${property.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Building2 className="w-4 h-4" /> Manage Units
                  </Link>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white rounded-xl shadow-lg">
              <Icon className={`w-5 h-5 ${
                property.category === 'residential' ? 'text-emerald-600' :
                property.category === 'commercial' ? 'text-blue-600' :
                'text-orange-600'
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {property.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{property.address}, {property.city}, {property.state}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Units</p>
            <p className="font-semibold text-gray-900">{property.occupiedUnits}/{property.units}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
            <p className="font-semibold text-gray-900">${property.monthlyRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Occupancy Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-500">Occupancy</span>
            <span className={`font-semibold ${
              property.occupancyRate >= 90 ? 'text-emerald-600' :
              property.occupancyRate >= 70 ? 'text-amber-600' :
              'text-red-600'
            }`}>{property.occupancyRate}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                property.occupancyRate >= 90 ? 'bg-emerald-500' :
                property.occupancyRate >= 70 ? 'bg-amber-500' :
                'bg-red-500'
              }`}
              style={{ width: `${property.occupancyRate}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <Link
          href={`/property-management/properties/${property.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 transition-colors"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function PropertyRow({ property }: { property: Property }) {
  const config = categoryConfig[property.category];
  const Icon = config.icon;

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl ${config.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{property.name}</p>
            <p className="text-sm text-gray-500">{property.type}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          {property.city}, {property.state}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${config.badge}`}>
          {property.category}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-900">{property.occupiedUnits}/{property.units}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                property.occupancyRate >= 90 ? 'bg-emerald-500' :
                property.occupancyRate >= 70 ? 'bg-amber-500' :
                'bg-red-500'
              }`}
              style={{ width: `${property.occupancyRate}%` }}
            />
          </div>
          <span className={`text-sm font-medium ${
            property.occupancyRate >= 90 ? 'text-emerald-600' :
            property.occupancyRate >= 70 ? 'text-amber-600' :
            'text-red-600'
          }`}>{property.occupancyRate}%</span>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900">${property.monthlyRevenue.toLocaleString()}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/property-management/properties/${property.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-500" />
          </Link>
          <Link
            href={`/property-management/properties/${property.id}/edit`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-500" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default function PropertiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort properties
  const filteredProperties = mockProperties
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'revenue': return b.monthlyRevenue - a.monthlyRevenue;
        case 'occupancy': return b.occupancyRate - a.occupancyRate;
        case 'units': return b.units - a.units;
        default: return 0;
      }
    });

  // Calculate totals
  const totals = {
    properties: filteredProperties.length,
    units: filteredProperties.reduce((sum, p) => sum + p.units, 0),
    occupied: filteredProperties.reduce((sum, p) => sum + p.occupiedUnits, 0),
    revenue: filteredProperties.reduce((sum, p) => sum + p.monthlyRevenue, 0),
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-500 mt-1">Manage your property portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <Link
            href="/property-management/properties/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Total Properties</p>
          <p className="text-3xl font-bold text-gray-900">{totals.properties}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Total Units</p>
          <p className="text-3xl font-bold text-gray-900">{totals.units}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Occupied Units</p>
          <p className="text-3xl font-bold text-gray-900">{totals.occupied}</p>
          <p className="text-sm text-emerald-600 mt-1">
            {((totals.occupied / totals.units) * 100).toFixed(1)}% occupancy
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
          <p className="text-3xl font-bold text-gray-900">${totals.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            {[
              { value: 'all', label: 'All', icon: Building2 },
              { value: 'residential', label: 'Residential', icon: Home },
              { value: 'commercial', label: 'Commercial', icon: Store },
              { value: 'industrial', label: 'Industrial', icon: Factory },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  categoryFilter === cat.value
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="occupancy">Sort by Occupancy</option>
            <option value="units">Sort by Units</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-50 rounded-xl p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Properties */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-16">
          <Building2 className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <Link
            href="/property-management/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Your First Property
          </Link>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Units</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Occupancy</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProperties.map((property) => (
                  <PropertyRow key={property.id} property={property} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
