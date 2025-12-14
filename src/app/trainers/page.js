'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { trainers as initialTrainers, members } from '@/data/mockData';
import toast from 'react-hot-toast';

export default function Trainers() {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignClientModalOpen, setIsAssignClientModalOpen] = useState(false);

  const handleViewTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const handleEditTrainer = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleAssignClient = () => {
    setIsModalOpen(false);
    setIsAssignClientModalOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success('Trainer profile updated successfully!');
    setIsEditModalOpen(false);
    setSelectedTrainer(null);
  };

  const handleSaveAssignment = () => {
    toast.success('Client assigned to trainer successfully!');
    setIsAssignClientModalOpen(false);
    setSelectedTrainer(null);
  };

  const handleAddTrainer = () => {
    toast.success('New trainer added successfully!');
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header title="Trainers" />
      
      <div className="p-4 lg:p-8">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your gym trainers</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Trainer</Button>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="text-center hover:shadow-xl transition-shadow">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold text-lg text-gray-900 mb-1">{trainer.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{trainer.specialization}</p>
              
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold">{trainer.rating}</span>
                <span className="text-gray-500 text-sm">({trainer.clients} clients)</span>
              </div>

              <Badge variant={trainer.status === 'Available' ? 'success' : 'warning'}>
                {trainer.status}
              </Badge>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">📧 {trainer.email}</p>
                <p className="text-sm text-gray-600">📱 {trainer.phone}</p>
                <p className="text-sm text-gray-600">💼 {trainer.experience}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1 text-xs"
                  onClick={() => handleViewTrainer(trainer)}
                >
                  View Profile
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1 text-xs"
                  onClick={() => {
                    setSelectedTrainer(trainer);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <Card className="text-center">
            <p className="text-3xl font-bold text-primary mb-2">{trainers.length}</p>
            <p className="text-gray-600">Total Trainers</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-green-600 mb-2">
              {trainers.filter(t => t.status === 'Available').length}
            </p>
            <p className="text-gray-600">Available Now</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-yellow-600 mb-2">
              {trainers.reduce((sum, t) => sum + t.clients, 0)}
            </p>
            <p className="text-gray-600">Total Clients</p>
          </Card>
        </div>
      </div>

      {/* Trainer Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Trainer Profile"
      >
        {selectedTrainer && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <img
                src={selectedTrainer.image}
                alt={selectedTrainer.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{selectedTrainer.name}</h3>
                <p className="text-gray-600">{selectedTrainer.specialization}</p>
                <Badge variant={selectedTrainer.status === 'Available' ? 'success' : 'warning'}>
                  {selectedTrainer.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <p><strong>Email:</strong> {selectedTrainer.email}</p>
              <p><strong>Phone:</strong> {selectedTrainer.phone}</p>
              <p><strong>Experience:</strong> {selectedTrainer.experience}</p>
              <p><strong>Rating:</strong> ⭐ {selectedTrainer.rating}/5.0</p>
              <p><strong>Active Clients:</strong> {selectedTrainer.clients}</p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" className="flex-1" onClick={handleAssignClient}>Assign Client</Button>
              <Button variant="outline" className="flex-1" onClick={handleEditTrainer}>Edit Profile</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Trainer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Trainer"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleAddTrainer(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input type="text" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specialization</label>
            <input type="text" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input type="tel" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience</label>
            <input type="text" required placeholder="e.g., 5 years" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" className="flex-1">Add Trainer</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Trainer Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Trainer Profile"
      >
        {selectedTrainer && (
          <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input type="text" defaultValue={selectedTrainer.name} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specialization</label>
              <input type="text" defaultValue={selectedTrainer.specialization} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" defaultValue={selectedTrainer.email} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select defaultValue={selectedTrainer.status} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Available</option>
                <option>Busy</option>
              </select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" className="flex-1">Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Assign Client Modal */}
      <Modal
        isOpen={isAssignClientModalOpen}
        onClose={() => setIsAssignClientModalOpen(false)}
        title="Assign Client"
      >
        {selectedTrainer && (
          <form onSubmit={(e) => { e.preventDefault(); handleSaveAssignment(); }} className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Assign a client to <strong>{selectedTrainer.name}</strong>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Member</label>
              <select required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Choose a member...</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Training Goal</label>
              <select required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select goal...</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>Endurance</option>
                <option>Flexibility</option>
                <option>General Fitness</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
              <input type="date" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAssignClientModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" className="flex-1">Assign Client</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
