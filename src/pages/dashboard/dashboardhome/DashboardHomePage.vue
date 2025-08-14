<template>
  <div class="!space-y-6">
    <div class="!flex !items-center !justify-between">
      <h1 class="!text-2xl !font-semibold !text-gray-900">Dashboard</h1>
    </div>

    <!-- Stats Grid -->
    <div class="!grid !grid-cols-1 !gap-5 sm:!grid-cols-2 lg:!grid-cols-3">
      <div
        v-for="(stat, index) in statCards"
        :key="index"
        class="!bg-white !overflow-hidden !shadow !rounded-lg"
      >
        <div class="!p-5">
          <div class="!flex !items-center">
            <div class="!flex-shrink-0">
              <component :is="stat.icon" class="!h-8 !w-8" />
            </div>
            <div class="!ml-5 !w-0 !flex-1">
              <dl>
                <dt class="!text-sm !font-medium !text-gray-500 !truncate">{{ stat.title }}</dt>
                <dd>
                  <div class="!text-lg !font-medium !text-gray-900">{{ stat.value }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="!bg-gray-50 !px-5 !py-3">
          <div class="!text-sm">
            <span class="!font-medium" :class="stat.changeColor">{{ stat.change }}</span>
            from previous period
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="!grid !grid-cols-1 !gap-5 lg:!grid-cols-2">
      <!-- User Activity Chart -->
      <div class="!bg-white !shadow !rounded-lg !p-4">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">User Activity</h2>
        <Line :data="userActivityChart" :options="chartOptions" class="!h-80" />
      </div>

      <!-- Sales Chart -->
      <div class="!bg-white !shadow !rounded-lg !p-4">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Sales Overview</h2>
        <Bar :data="salesChart" :options="chartOptions" class="!h-80" />
      </div>

      <!-- Inventory Distribution Chart -->
      <div class="!bg-white !shadow !rounded-lg !p-4">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Inventory Distribution</h2>
        <Pie :data="inventoryChart" :options="chartOptions" class="!h-80" />
      </div>

      <!-- Recent Activity -->
      <div class="!bg-white !shadow !rounded-lg !overflow-hidden">
        <div class="!px-4 !py-5 sm:!px-6">
          <h3 class="!text-lg !font-medium !text-gray-900">Recent Activity</h3>
        </div>
        <div class="!border-t !border-gray-200">
          <ul class="!divide-y !divide-gray-200">
            <li v-for="(activity, index) in recentActivity" :key="index" class="!px-4 !py-4">
              <div class="!flex !items-center !space-x-4">
                <div class="!flex-shrink-0">
                  <component :is="activity.icon" class="!h-6 !w-6 !text-gray-400" />
                </div>
                <div class="!flex-1 !min-w-0">
                  <p class="!text-sm !font-medium !text-gray-900 !truncate">{{ activity.title }}</p>
                  <p class="!text-sm !text-gray-500">{{ activity.subtitle }}</p>
                </div>
                <div>
                  <p class="!text-sm !text-gray-500">{{ activity.time }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { Line, Bar, Pie } from 'vue-chartjs'
import { Users, ShoppingBag, Car, DollarSign, TrendingUp, Package } from 'lucide-vue-next'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
)

const statCards = [
  {
    title: 'Total Users',
    value: '2,543',
    icon: Users,
    change: '+12%',
    changeColor: '!text-green-500',
  },
  {
    title: 'Total Orders',
    value: '1,345',
    icon: ShoppingBag,
    change: '+23%',
    changeColor: '!text-green-500',
  },
  {
    title: 'Vehicles Sold',
    value: '456',
    icon: Car,
    change: '+8%',
    changeColor: '!text-green-500',
  },
  {
    title: 'Parts Sold',
    value: '2,145',
    icon: Package,
    change: '+18%',
    changeColor: '!text-green-500',
  },
  {
    title: 'Revenue',
    value: '$345,765',
    icon: DollarSign,
    change: '+15%',
    changeColor: '!text-green-500',
  },
  {
    title: 'Growth',
    value: '24%',
    icon: TrendingUp,
    change: '+2%',
    changeColor: '!text-green-500',
  },
]

const recentActivity = [
  {
    icon: Users,
    title: 'New user registered',
    subtitle: 'John Doe created an account',
    time: '5m ago',
  },
  {
    icon: ShoppingBag,
    title: 'New order placed',
    subtitle: 'Order #12345 for $1,230.00',
    time: '15m ago',
  },
  {
    icon: Car,
    title: 'Vehicle added',
    subtitle: '2021 Toyota Camry added to inventory',
    time: '1h ago',
  },
  {
    icon: Package,
    title: 'Parts inventory updated',
    subtitle: '15 new brake pad sets added',
    time: '2h ago',
  },
]

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}

const userActivityChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    { label: 'Signups', data: [65, 59, 80, 81, 56, 55, 40], borderColor: '#8884d8', fill: false },
    {
      label: 'Logins',
      data: [120, 110, 140, 155, 135, 130, 100],
      borderColor: '#82ca9d',
      fill: false,
    },
  ],
}

const salesChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Vehicles',
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      backgroundColor: '#8884d8',
    },
    {
      label: 'Parts',
      data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
      backgroundColor: '#82ca9d',
    },
  ],
}

const inventoryChart = {
  labels: ['SUVs', 'Sedans', 'Trucks', 'Parts'],
  datasets: [
    {
      label: 'Inventory',
      data: [400, 300, 200, 500],
      backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    },
  ],
}
</script>
