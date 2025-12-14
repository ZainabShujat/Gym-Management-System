'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Input, Select, Form } from '@/components/ui/Form';
import { members as initialMembers } from '@/data/mockData';
import { dataManager } from '@/utils/localStorage';
import toast from 'react-hot-toast';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'Basic',
    status: 'Active',
    joinDate: '',
    expiryDate: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Load members from localStorage or use initial data
  useEffect(() => {
    const storedMembers = dataManager.getMembers();
    if (storedMembers.length > 0) {
      setMembers(storedMembers);
    } else {
      setMembers(initialMembers);
      dataManager.setMembers(initialMembers);
    }
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      membershipType: 'Basic',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
    setFormErrors({});
    setIsAddEditModalOpen(true);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setFormData(member);
    setFormErrors({});
    setIsAddEditModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.joinDate) errors.joinDate = 'Join date is required';
    if (!formData.expiryDate) errors.expiryDate = 'Expiry date is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingMember) {
      // Update existing member
      const updatedMembers = members.map(m => 
        m.id === editingMember.id ? { ...formData, id: editingMember.id, image: editingMember.image } : m
      );
      setMembers(updatedMembers);
      dataManager.setMembers(updatedMembers);
      toast.success('Member updated successfully!');
    } else {
      // Add new member
      const newMember = {
        ...formData,
        id: Date.now(),
        image: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}&background=6366f1&color=fff`
      };
      const updatedMembers = [...members, newMember];
      setMembers(updatedMembers);
      dataManager.setMembers(updatedMembers);
      toast.success('Member added successfully!');
    }

    setIsAddEditModalOpen(false);
    setFormData({});
    setEditingMember(null);
  };

  const handleDeleteMember = (memberId) => {
    if (confirm('Are you sure you want to delete this member?')) {
      const updatedMembers = members.filter(m => m.id !== memberId);
      setMembers(updatedMembers);
      dataManager.setMembers(updatedMembers);
      toast.success('Member deleted successfully!');
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Members" />
      
      <div className="p-4 lg:p-8">
        {/* Actions Bar */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>All</option>
                <option>Active</option>
                <option>Expired</option>
              </select>
              <Button onClick={handleAddMember}>+ Add Member</Button>
            </div>
          </div>
        </Card>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <Badge variant={member.status === 'Active' ? 'success' : 'danger'}>
                      {member.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">📧 {member.email}</p>
                  <p className="text-sm text-gray-600 mb-1">📱 {member.phone}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    💳 <span className="font-medium">{member.membershipType}</span>
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="text-xs py-1 px-3"
                      onClick={() => handleViewMember(member)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="primary" 
                      className="text-xs py-1 px-3"
                      onClick={() => handleEditMember(member)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-gray-500 text-lg">No members found</p>
          </Card>
        )}
      </div>

      {/* Member Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Member Details"
      >
        {selectedMember && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                <Badge variant={selectedMember.status === 'Active' ? 'success' : 'danger'}>
                  {selectedMember.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <p><strong>Email:</strong> {selectedMember.email}</p>
              <p><strong>Phone:</strong> {selectedMember.phone}</p>
              <p><strong>Membership:</strong> {selectedMember.membershipType}</p>
              <p><strong>Join Date:</strong> {selectedMember.joinDate}</p>
              <p><strong>Expiry Date:</strong> {selectedMember.expiryDate}</p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => {
                  setIsModalOpen(false);
                  handleEditMember(selectedMember);
                }}
              >
                Edit Member
              </Button>
              <Button 
                variant="danger" 
                className="flex-1"
                onClick={() => handleDeleteMember(selectedMember.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add/Edit Member Modal */}
      <Modal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        title={editingMember ? 'Edit Member' : 'Add New Member'}
      >
        <Form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={formErrors.name}
            required
            placeholder="Enter member name"
          />
          
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={formErrors.email}
            required
            placeholder="member@email.com"
          />
          
          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={formErrors.phone}
            required
            placeholder="+91 98765-43210"
          />
          
          <Select
            label="Membership Type"
            name="membershipType"
            value={formData.membershipType}
            onChange={handleInputChange}
            options={[
              { value: 'Basic', label: 'Basic' },
              { value: 'Standard', label: 'Standard' },
              { value: 'Premium', label: 'Premium' }
            ]}
            required
          />
          
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Expired', label: 'Expired' }
            ]}
            required
          />
          
          <Input
            label="Join Date"
            name="joinDate"
            type="date"
            value={formData.joinDate}
            onChange={handleInputChange}
            error={formErrors.joinDate}
            required
          />
          
          <Input
            label="Expiry Date"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleInputChange}
            error={formErrors.expiryDate}
            required
          />

          <div className="flex gap-2 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              {editingMember ? 'Update Member' : 'Add Member'}
            </Button>
            <Button 
              type="button"
              variant="outline" 
              className="flex-1"
              onClick={() => setIsAddEditModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
