<!-- eslint-disable vue/require-toggle-inside-transition -->
<!-- File: src/components/UsersPage.vue -->
<template>
  <div class="!space-y-6">
    <!-- Header -->
    <div class="!flex !items-center !justify-between">
      <h1 class="!text-2xl !font-semibold !text-gray-900">Users Management</h1>
      <button
        @click="showAddModal = true"
        class="!inline-flex !items-center !px-4 !py-2 !border !border-transparent !text-sm !font-medium !rounded-md !shadow-sm !text-white !bg-blue-600 hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500"
      >
        <UserPlus class="!h-5 !w-5 !mr-2" />
        Add User
      </button>
    </div>

    <!-- Search & Table Card -->
    <div class="!bg-white !shadow !rounded-lg">
      <!-- Search -->
      <div class="!p-4 !border-b !border-gray-200">
        <div class="!relative !rounded-md !shadow-sm">
          <div class="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
            <Search class="!h-5 !w-5 !text-gray-400" />
          </div>
          <input
            v-model="searchTerm"
            type="text"
            class="focus:!ring-blue-500 focus:!border-blue-500 !block !w-full !pl-10 sm:!text-sm !border-gray-300 !rounded-md"
            placeholder="Search users by name, email or role..."
          />
        </div>
      </div>

      <!-- Users Table -->
      <div class="!overflow-x-auto">
        <table class="!min-w-full !divide-y !divide-gray-200">
          <thead class="!bg-gray-50">
            <tr>
              <th scope="col" class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Name</th>
              <th scope="col" class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Email</th>
              <th scope="col" class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Role</th>
              <th scope="col" class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Status</th>
              <th scope="col" class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Last Login</th>
              <th scope="col" class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="!bg-white !divide-y !divide-gray-200">
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:!bg-gray-50">
              <td class="!px-6 !py-4 !whitespace-nowrap">
                <div class="!flex !items-center">
                  <div class="!flex-shrink-0 !h-10 !w-10">
                    <div class="!h-10 !w-10 !rounded-full !bg-gray-200 !flex !items-center !justify-center">
                      <span class="!text-gray-500 !font-medium">{{ user.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="!ml-4">
                    <div class="!text-sm !font-medium !text-gray-900">{{ user.name }}</div>
                  </div>
                </div>
              </td>
              <td class="!px-6 !py-4 !whitespace-nowrap">
                <div class="!text-sm !text-gray-900">{{ user.email }}</div>
              </td>
              <td class="!px-6 !py-4 !whitespace-nowrap">
                <span
                  :class="[
                    '!px-2 !inline-flex !text-xs !leading-5 !font-semibold !rounded-full',
                    user.role === 'Admin'
                      ? '!bg-purple-100 !text-purple-800'
                      : user.role === 'Seller'
                      ? '!bg-blue-100 !text-blue-800'
                      : '!bg-green-100 !text-green-800'
                  ]"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="!px-6 !py-4 !whitespace-nowrap">
                <span
                  :class="[
                    '!px-2 !inline-flex !text-xs !leading-5 !font-semibold !rounded-full',
                    user.status === 'Active' ? '!bg-green-100 !text-green-800' : '!bg-red-100 !text-red-800'
                  ]"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-500">{{ user.lastLogin }}</td>
              <td class="!px-6 !py-4 !whitespace-nowrap !text-right !text-sm !font-medium">
                <button @click="selectUser(user)" class="!text-gray-400 hover:!text-gray-600">
                  <MoreVertical class="!h-5 !w-5" />
                </button>
              </td>
            </tr>
            <tr v-if="paginatedUsers.length === 0">
              <td colspan="6" class="!px-6 !py-8 !text-center !text-sm !text-gray-500">No users found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="!flex !items-center !justify-between !px-4 !py-3 !border-t !border-gray-200">
        <div class="!flex !items-center !space-x-2">
          <span class="!text-sm !text-gray-700">Rows per page:</span>
          <select v-model.number="pageSize" class="!py-1 !px-2 !border !border-gray-300 !rounded-md !text-sm focus:!outline-none focus:!ring-2 focus:!ring-blue-500">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
          </select>
        </div>
        <div class="!flex !items-center !space-x-4">
          <span class="!text-sm !text-gray-700">
            Showing
            <span class="!font-medium">{{ startItem + 1 }}</span>
            to
            <span class="!font-medium">{{ endItem }}</span>
            of
            <span class="!font-medium">{{ filteredUsers.length }}</span>
          </span>
          <div class="!space-x-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="!inline-flex !items-center !px-3 !py-1.5 !border !border-gray-300 !rounded-md !text-sm !bg-white !text-gray-700 hover:!bg-gray-50 disabled:!opacity-50"
            >
              Prev
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages || totalPages === 0"
              class="!inline-flex !items-center !px-3 !py-1.5 !border !border-gray-300 !rounded-md !text-sm !bg-white !text-gray-700 hover:!bg-gray-50 disabled:!opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <transition enter-active-class="!transition !ease-out !duration-200" enter-from-class="!opacity-0" enter-to-class="!opacity-100" leave-active-class="!transition !ease-in !duration-150" leave-from-class="!opacity-100" leave-to-class="!opacity-0">
      <div v-if="showAddModal" class="!fixed !z-10 !inset-0 !overflow-y-auto">
        <div class="!flex !items-end !justify-center !min-h-screen !pt-4 !px-4 !pb-20 !text-center sm:!block sm:!p-0">
          <div class="!fixed !inset-0 !transition-opacity" aria-hidden="true" @click="showAddModal = false">
            <div class="!absolute !inset-0 !bg-gray-500 !opacity-75"></div>
          </div>
          <span class="!hidden sm:!inline-block sm:!align-middle sm:!h-screen" aria-hidden="true">&#8203;</span>
          <transition enter-active-class="!transform !transition !ease-out !duration-200" enter-from-class="!opacity-0 !translate-y-4 sm:!translate-y-0 sm:!scale-95" enter-to-class="!opacity-100 !translate-y-0 sm:!scale-100" leave-active-class="!transform !transition !ease-in !duration-150" leave-from-class="!opacity-100 !translate-y-0 sm:!scale-100" leave-to-class="!opacity-0 !translate-y-4 sm:!translate-y-0 sm:!scale-95">
            <div class="!inline-block !align-bottom !bg-white !rounded-lg !text-left !overflow-hidden !shadow-xl !transform !transition-all sm:!my-8 sm:!align-middle sm:!max-w-lg sm:!w-full">
              <div class="!bg-white !px-4 !pt-5 !pb-4 sm:!p-6 sm:!pb-4">
                <h3 class="!text-lg !leading-6 !font-medium !text-gray-900 !mb-4">Add New User</h3>
                <div class="!space-y-4">
                  <div>
                    <label for="name" class="!block !text-sm !font-medium !text-gray-700">Name</label>
                    <input
                      id="name"
                      v-model.trim="newUser.name"
                      type="text"
                      class="!mt-1 focus:!ring-blue-500 focus:!border-blue-500 !block !w-full !shadow-sm sm:!text-sm !border-gray-300 !rounded-md"
                    />
                  </div>
                  <div>
                    <label for="email" class="!block !text-sm !font-medium !text-gray-700">Email</label>
                    <input
                      id="email"
                      v-model.trim="newUser.email"
                      type="email"
                      class="!mt-1 focus:!ring-blue-500 focus:!border-blue-500 !block !w-full !shadow-sm sm:!text-sm !border-gray-300 !rounded-md"
                    />
                  </div>
                  <div>
                    <label for="role" class="!block !text-sm !font-medium !text-gray-700">Role</label>
                    <select
                      id="role"
                      v-model="newUser.role"
                      class="!mt-1 !block !w-full !py-2 !px-3 !border !border-gray-300 !bg-white !rounded-md !shadow-sm focus:!outline-none focus:!ring-blue-500 focus:!border-blue-500 sm:!text-sm"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Seller">Seller</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label for="status" class="!block !text-sm !font-medium !text-gray-700">Status</label>
                    <select
                      id="status"
                      v-model="newUser.status"
                      class="!mt-1 !block !w-full !py-2 !px-3 !border !border-gray-300 !bg-white !rounded-md !shadow-sm focus:!outline-none focus:!ring-blue-500 focus:!border-blue-500 sm:!text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="!bg-gray-50 !px-4 !py-3 sm:!px-6 sm:!flex sm:!flex-row-reverse">
                <button
                  type="button"
                  @click="handleAddUser"
                  class="!w-full !inline-flex !justify-center !rounded-md !border !border-transparent !shadow-sm !px-4 !py-2 !bg-blue-600 !text-base !font-medium !text-white hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500 sm:!ml-3 sm:!w-auto sm:!text-sm"
                >
                  Add User
                </button>
                <button
                  type="button"
                  @click="showAddModal = false"
                  class="!mt-3 !w-full !inline-flex !justify-center !rounded-md !border !border-gray-300 !shadow-sm !px-4 !py-2 !bg-white !text-base !font-medium !text-gray-700 hover:!bg-gray-50 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-indigo-500 sm:!mt-0 sm:!ml-3 sm:!w-auto sm:!text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <!-- Action Modal -->
    <transition enter-active-class="!transition !ease-out !duration-200" enter-from-class="!opacity-0" enter-to-class="!opacity-100" leave-active-class="!transition !ease-in !duration-150" leave-from-class="!opacity-100" leave-to-class="!opacity-0">
      <div v-if="showActionModal && selectedUser" class="!fixed !z-10 !inset-0 !overflow-y-auto">
        <div class="!flex !items-end !justify-center !min-h-screen !pt-4 !px-4 !pb-20 !text-center sm:!block sm:!p-0">
          <div class="!fixed !inset-0 !transition-opacity" aria-hidden="true" @click="closeActionModal">
            <div class="!absolute !inset-0 !bg-gray-500 !opacity-75"></div>
          </div>
          <span class="!hidden sm:!inline-block sm:!align-middle sm:!h-screen" aria-hidden="true">&#8203;</span>
          <transition enter-active-class="!transform !transition !ease-out !duration-200" enter-from-class="!opacity-0 !translate-y-4 sm:!translate-y-0 sm:!scale-95" enter-to-class="!opacity-100 !translate-y-0 sm:!scale-100" leave-active-class="!transform !transition !ease-in !duration-150" leave-from-class="!opacity-100 !translate-y-0 sm:!scale-100" leave-to-class="!opacity-0 !translate-y-4 sm:!translate-y-0 sm:!scale-95">
            <div class="!inline-block !align-bottom !bg-white !rounded-lg !text-left !overflow-hidden !shadow-xl !transform !transition-all sm:!my-8 sm:!align-middle sm:!max-w-lg sm:!w-full">
              <div class="!bg-white !px-4 !pt-5 !pb-4 sm:!p-6 sm:!pb-4">
                <h3 class="!text-lg !leading-6 !font-medium !text-gray-900 !mb-4">User Actions</h3>
                <p class="!text-sm !text-gray-500 !mb-4">
                  Select an action for user:
                  <span class="!font-medium">{{ selectedUser?.name }}</span>
                </p>
                <div class="!space-y-2">
                  <button
                    v-if="selectedUser?.status === 'Inactive'"
                    @click="handleUserAction('activate')"
                    class="!w-full !inline-flex !justify-center !items-center !px-4 !py-2 !border !border-transparent !text-sm !font-medium !rounded-md !text-white !bg-green-600 hover:!bg-green-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-green-500"
                  >
                    <Check class="!h-5 !w-5 !mr-2" /> Activate User
                  </button>

                  <button
                    v-if="selectedUser?.status === 'Active'"
                    @click="handleUserAction('deactivate')"
                    class="!w-full !inline-flex !justify-center !items-center !px-4 !py-2 !border !border-transparent !text-sm !font-medium !rounded-md !text-white !bg-yellow-600 hover:!bg-yellow-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-yellow-500"
                  >
                    <X class="!h-5 !w-5 !mr-2" /> Deactivate User
                  </button>

                  <button
                    @click="handleUserAction('delete')"
                    class="!w-full !inline-flex !justify-center !items-center !px-4 !py-2 !border !border-transparent !text-sm !font-medium !rounded-md !text-white !bg-red-600 hover:!bg-red-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-red-500"
                  >
                    <Trash2 class="!h-5 !w-5 !mr-2" /> Delete User
                  </button>
                </div>
              </div>
              <div class="!bg-gray-50 !px-4 !py-3 sm:!px-6 sm:!flex sm:!flex-row-reverse">
                <button
                  type="button"
                  @click="closeActionModal"
                  class="!mt-3 !w-full !inline-flex !justify-center !rounded-md !border !border-gray-300 !shadow-sm !px-4 !py-2 !bg-white !text-base !font-medium !text-gray-700 hover:!bg-gray-50 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-indigo-500 sm:!mt-0 sm:!ml-3 sm:!w-auto sm:!text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Vue & Icons
import { ref, computed, watch } from 'vue'
import { Search, MoreVertical, UserPlus, Check, X, Trash2 } from 'lucide-vue-next'


const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', lastLogin: '2023-05-10' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', status: 'Active', lastLogin: '2023-05-12' },
  { id: 3, name: 'Michael Johnson', email: 'michael@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-05-15' },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Customer', status: 'Inactive', lastLogin: '2023-04-20' },
  { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'Seller', status: 'Active', lastLogin: '2023-05-11' },
  { id: 6, name: 'Sarah Taylor', email: 'sarah@example.com', role: 'Customer', status: 'Active', lastLogin: '2023-05-14' },
  { id: 7, name: 'James Anderson', email: 'james@example.com', role: 'Customer', status: 'Inactive', lastLogin: '2023-04-25' },
  { id: 8, name: 'Lisa Thomas', email: 'lisa@example.com', role: 'Seller', status: 'Active', lastLogin: '2023-05-13' }
]

// State
const users = ref([...initialUsers])
const searchTerm = ref('')
const selectedUser = ref(null)
const showAddModal = ref(false)
const showActionModal = ref(false)
const newUser = ref({ name: '', email: '', role: 'Customer', status: 'Active' })

// Pagination
const currentPage = ref(1)
const pageSize = ref(10)

const filteredUsers = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  if (!q) return users.value
  return users.value.filter((u) =>
    u.name.toLowerCase().includes(q) ||
    u.email.toLowerCase().includes(q) ||
    u.role.toLowerCase().includes(q)
  )
})

const totalPages = computed(() => (filteredUsers.value.length === 0 ? 0 : Math.ceil(filteredUsers.value.length / pageSize.value)))
const startItem = computed(() => (filteredUsers.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize.value))
const endItem = computed(() => (filteredUsers.value.length === 0 ? 0 : Math.min(startItem.value + pageSize.value, filteredUsers.value.length)))
const paginatedUsers = computed(() => filteredUsers.value.slice(startItem.value, endItem.value))

// Reset to page 1 on filters/pageSize change
watch([searchTerm, pageSize], () => { currentPage.value = 1 })

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value += 1
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value -= 1
}

// Actions
function selectUser(user) {
  selectedUser.value = user
  showActionModal.value = true
}

function closeActionModal() {
  showActionModal.value = false
  selectedUser.value = null
}

function handleUserAction(action) {
  if (!selectedUser.value) return
  if (action === 'delete') {
    users.value = users.value.filter((u) => u.id !== selectedUser.value.id)
  } else if (action === 'activate') {
    users.value = users.value.map((u) => (u.id === selectedUser.value.id ? { ...u, status: 'Active' } : u))
  } else if (action === 'deactivate') {
    users.value = users.value.map((u) => (u.id === selectedUser.value.id ? { ...u, status: 'Inactive' } : u))
  }
  closeActionModal()
}

function handleAddUser() {
  const ids = users.value.map((u) => u.id)
  const id = ids.length ? Math.max(...ids) + 1 : 1
  const today = new Date().toISOString().split('T')[0]
  const payload = { id, ...newUser.value, lastLogin: today }
  users.value.push(payload)
  newUser.value = { name: '', email: '', role: 'Customer', status: 'Active' }
  showAddModal.value = false
}
</script>

<style scoped>
/* Only use for transition hooks where utility classes can't be applied; keep minimal. */
</style>
<!-- File: src/components/UsersPage.vue -->

