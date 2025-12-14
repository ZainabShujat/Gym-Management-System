'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { classes, trainers } from '@/data/mockData';
import toast from 'react-hot-toast';

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState('All');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleScheduleClass = () => {
    toast.success('Class scheduled successfully!');
    setIsScheduleModalOpen(false);
  };

  const handleViewClass = (classItem) => {
    setSelectedClass(classItem);
    setIsViewModalOpen(true);
  };

  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success('Class updated successfully!');
    setIsEditModalOpen(false);
    setSelectedClass(null);
  };
  
  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const filteredClasses = selectedDay === 'All' 
    ? classes 
    : classes.filter(c => c.day === selectedDay);

  const groupedClasses = filteredClasses.reduce((acc, classItem) => {
    if (!acc[classItem.day]) {
      acc[classItem.day] = [];
    }
    acc[classItem.day].push(classItem);
    return acc;
  }, {});

  const getCapacityBadge = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage === 100) return 'danger';
    if (percentage >= 80) return 'warning';
    return 'success';
  };

  return (
    <div className="min-h-screen">
      <Header title="Class Schedule" />
      
      <div className="p-4 lg:p-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Weekly Schedule</h2>
            <p className="text-gray-600 dark:text-gray-400">View and manage class schedules</p>
          </div>
          <Button onClick={() => setIsScheduleModalOpen(true)}>+ Schedule Class</Button>
        </div>

        {/* Day Filter */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDay === day
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </Card>

        {/* Schedule View */}
        <div className="space-y-6">
          {Object.entries(groupedClasses).map(([day, dayClasses]) => (
            <div key={day}>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                {day}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayClasses.map((classItem) => (
                  <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg text-gray-900">{classItem.name}</h4>
                      <Badge variant={getCapacityBadge(classItem.enrolled, classItem.capacity)}>
                        {classItem.enrolled}/{classItem.capacity}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span>👨‍🏫</span> {classItem.trainer}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span>🕐</span> {classItem.time} ({classItem.duration})
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span>📍</span> {classItem.room}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span>📊</span> Level: <Badge variant="info">{classItem.level}</Badge>
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 text-xs"
                        onClick={() => handleViewClass(classItem)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="primary" 
                        className="flex-1 text-xs"
                        onClick={() => handleEditClass(classItem)}
                      >
                        Edit
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-gray-500 text-lg">No classes scheduled for {selectedDay}</p>
          </Card>
        )}

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8">
          <Card className="text-center">
            <p className="text-3xl font-bold text-primary mb-2">{classes.length}</p>
            <p className="text-gray-600 text-sm">Total Classes</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-green-600 mb-2">
              {classes.filter(c => c.enrolled < c.capacity).length}
            </p>
            <p className="text-gray-600 text-sm">Available Spots</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-red-600 mb-2">
              {classes.filter(c => c.enrolled === c.capacity).length}
            </p>
            <p className="text-gray-600 text-sm">Fully Booked</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-yellow-600 mb-2">
              {classes.reduce((sum, c) => sum + c.enrolled, 0)}
            </p>
            <p className="text-gray-600 text-sm">Total Enrolled</p>
          </Card>
        </div>

        {/* Modals */}
        <Modal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          title="Schedule New Class"
        >
          <form onSubmit={(e) => { e.preventDefault(); handleScheduleClass(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class Name</label>
              <input type="text" required placeholder="e.g., HIIT Training" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trainer</label>
              <select required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select trainer...</option>
                {trainers.map(trainer => (
                  <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day</label>
                <select required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                <input type="time" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                <input type="text" required placeholder="e.g., 60 mins" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
                <input type="number" required min="1" placeholder="e.g., 20" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room</label>
              <input type="text" required placeholder="e.g., Studio A" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
              <select required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsScheduleModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" className="flex-1">Schedule Class</Button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Class Details"
        >
          {selectedClass && (
            <div className="space-y-4">
              <div className="pb-4 border-b">
                <h3 className="text-xl font-bold mb-2">{selectedClass.name}</h3>
                <Badge variant={getCapacityBadge(selectedClass.enrolled, selectedClass.capacity)}>
                  {selectedClass.enrolled}/{selectedClass.capacity} Enrolled
                </Badge>
              </div>
              <div className="space-y-2">
                <p><strong>Trainer:</strong> {selectedClass.trainer}</p>
                <p><strong>Day:</strong> {selectedClass.day}</p>
                <p><strong>Time:</strong> {selectedClass.time}</p>
                <p><strong>Duration:</strong> {selectedClass.duration}</p>
                <p><strong>Room:</strong> {selectedClass.room}</p>
                <p><strong>Level:</strong> {selectedClass.level}</p>
                <p><strong>Availability:</strong> {selectedClass.capacity - selectedClass.enrolled} spots remaining</p>
              </div>
              <div className="pt-4">
                <Button variant="primary" className="w-full" onClick={() => { setIsViewModalOpen(false); setIsEditModalOpen(true); }}>Edit Class</Button>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Class"
        >
          {selectedClass && (
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class Name</label>
                <input type="text" defaultValue={selectedClass.name} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                <input type="text" defaultValue={selectedClass.time} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
                <input type="number" defaultValue={selectedClass.capacity} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room</label>
                <input type="text" defaultValue={selectedClass.room} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1">Save Changes</Button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
}
