import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaSchool, FaCheckCircle } from "react-icons/fa"; // Import icons from React Icons
import Card from './Card';
import axios from 'axios'; 

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: null,
    totalTeachers: null,
    totalClasses: null,
    attendanceToday: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto max-w-screen-md p-5">
      <h1 className="text-3xl font-semibold mb-5">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Students" value={stats.totalStudents} isLoading={isLoading} icon={FaUserGraduate} />
        <Card title="Total Teachers" value={stats.totalTeachers} isLoading={isLoading} icon={FaChalkboardTeacher} />
        <Card title="Classes" value={stats.totalClasses} isLoading={isLoading} icon={FaSchool} />
        <Card title="Attendance Today" value={stats.attendanceToday} isLoading={isLoading} icon={FaCheckCircle} />
      </div>
    </div>
  );
}

export default Dashboard;
