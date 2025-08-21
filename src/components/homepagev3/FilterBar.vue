<template>
  <div class="bg-white rounded-lg shadow-sm mb-4 filter-bar-root">
    <!-- Desktop and tablet filters -->
    <div class="hidden sm:flex sm:items-center sm:flex-wrap px-4 py-3 gap-3">
      <button
        class="filter-button flex items-center px-3 py-2 text-sm border rounded-md transition-all hover:border-primary-500"
        :class="
          activeFiltersCount > 0
            ? 'border-primary-500 text-primary-500 bg-primary-50'
            : 'border-gray-300'
        "
        @click="showFilterModal = true"
      >
        <FilterIcon class="w-4 h-4 mr-2" />
        <span>Filters</span>
        <span
          v-if="activeFiltersCount > 0"
          class="ml-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ activeFiltersCount }}
        </span>
      </button>

      <!-- Category filter button -->
      <div class="relative filter-dropdown">
        <button
          class="filter-button filter-button-category flex items-center px-3 py-2 text-sm border rounded-md transition-all hover:border-primary-500"
          :class="
            selectedCategory
              ? 'border-primary-500 text-primary-500 bg-primary-50'
              : 'border-gray-300'
          "
          @click="toggleCategoryDropdown"
        >
          <span>{{ selectedCategory || 'Category' }}</span>
          <ChevronDownIcon
            class="w-4 h-4 ml-2 transition-transform"
            :class="{ 'rotate-180': showCategoryDropdown }"
          />
        </button>

        <div
          v-if="showCategoryDropdown"
          class="absolute left-0 top-full mt-1 w-[300px] bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto animate-fadeIn"
        >
          <div class="p-2">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectCategory(category)"
                class="px-3 py-1 text-sm rounded-full border transition-colors"
                :class="
                  selectedCategory === category
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-gray-300 hover:border-primary-300'
                "
              >
                {{ category }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Price filter -->
      <div class="relative filter-dropdown">
        <button
          class="filter-button flex items-center px-3 py-2 text-sm border rounded-md transition-all hover:border-primary-500"
          :class="
            priceRange.min !== null || priceRange.max !== null
              ? 'border-primary-500 text-primary-500 bg-primary-50'
              : 'border-gray-300'
          "
          @click="togglePriceDropdown"
        >
          <span>
            {{
              priceRange.min !== null || priceRange.max !== null
                ? `₦${priceRange.min?.toLocaleString() || '0'} - ₦${priceRange.max?.toLocaleString() || '∞'}`
                : 'Price'
            }}
          </span>
          <ChevronDownIcon
            class="w-4 h-4 ml-2 transition-transform"
            :class="{ 'rotate-180': showPriceDropdown }"
          />
        </button>

        <div
          v-if="showPriceDropdown"
          class="absolute left-0 top-full mt-1 w-[300px] bg-white border rounded-md shadow-lg z-50 p-4 animate-fadeIn"
        >
          <h4 class="font-medium mb-3 !text-xl">Price Range (₦)</h4>
          <div class="flex items-center justify-between mb-4">
            <input
              type="number"
              placeholder="Min"
              class="w-[45%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              v-model.number="priceRange.min"
            />
            <span class="mx-2">-</span>
            <input
              type="number"
              placeholder="Max"
              class="w-[45%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              v-model.number="priceRange.max"
            />
          </div>
          <div class="flex justify-between space-x-2">
            <button
              class="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              @click="clearPrice"
            >
              Clear
            </button>
            <button
              class="w-1/2 px-3 py-2 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600"
              @click="applyFilters"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <!-- Make filter -->
      <div class="relative filter-dropdown">
        <button
          class="filter-button flex items-center px-3 py-2 text-sm border rounded-md transition-all hover:border-primary-500"
          :class="
            selectedMake ? 'border-primary-500 text-primary-500 bg-primary-50' : 'border-gray-300'
          "
          @click="toggleMakeDropdown"
        >
          <span>{{ selectedMake || 'Make' }}</span>
          <ChevronDownIcon
            class="w-4 h-4 ml-2 transition-transform"
            :class="{ 'rotate-180': showMakeDropdown }"
          />
        </button>

        <div
          v-if="showMakeDropdown"
          class="absolute left-0 top-full mt-1 w-[300px] bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto animate-fadeIn"
        >
          <div class="p-2">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="make in makes"
                :key="make"
                @click="selectMake(make)"
                class="px-3 py-1 text-sm rounded-full border transition-colors"
                :class="
                  selectedMake === make
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-gray-300 hover:border-primary-300'
                "
              >
                {{ make }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop sort and view options -->
    <div class="hidden sm:flex items-center justify-between px-4 py-3 border-t">
      <div class="flex items-center">
        <span class="text-sm text-gray-600 mr-2">Sort by:</span>
        <div class="relative filter-dropdown">
          <button
            class="filter-button flex items-center text-sm font-medium text-primary-600"
            @click="toggleSortDropdown"
          >
            <span>{{ selectedSort }}</span>
            <ChevronDownIcon
              class="w-4 h-4 ml-1 transition-transform"
              :class="{ 'rotate-180': showSortDropdown }"
            />
          </button>

          <div
            v-if="showSortDropdown"
            class="absolute top-full mt-1 left-0 w-full bg-white border rounded-md shadow-lg z-50 animate-fadeIn"
          >
            <button
              v-for="option in sortOptions"
              :key="option"
              @click="handleSortChange(option)"
              class="flex items-center justify-between w-full text-left px-3 py-2 hover:bg-gray-100"
              :class="selectedSort === option ? 'bg-primary-50 text-primary-500' : ''"
            >
              <span>{{ option }}</span>
              <CheckIcon v-if="selectedSort === option" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <div class="relative filter-dropdown">
          <button
            class="filter-button flex items-center text-sm text-gray-600"
            @click="toggleTimeDropdown"
          >
            <ClockIcon class="w-4 h-4 mr-1" />
            <span>{{ selectedTime }}</span>
            <ChevronDownIcon
              class="w-4 h-4 ml-1 transition-transform"
              :class="{ 'rotate-180': showTimeDropdown }"
            />
          </button>

          <div
            v-if="showTimeDropdown"
            class="absolute top-full mt-1 right-0 w-full bg-white border rounded-md shadow-lg z-50 animate-fadeIn"
          >
            <button
              v-for="option in timeOptions"
              :key="option"
              @click="handleTimeChange(option)"
              class="flex items-center justify-between w-full text-left px-3 py-2 hover:bg-gray-100"
              :class="selectedTime === option ? 'bg-primary-50 text-primary-500' : ''"
            >
              <span>{{ option }}</span>
              <CheckIcon v-if="selectedTime === option" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-1 border-l pl-3">
          <button
            class="p-1 rounded-md hover:bg-gray-100 transition-colors"
            @click="handleViewChange('grid')"
          >
            <GridIcon
              :class="['w-5 h-5', view === 'grid' ? 'text-primary-600' : 'text-gray-400']"
            />
          </button>
          <button
            class="p-1 rounded-md hover:bg-gray-100 transition-colors"
            @click="handleViewChange('list')"
          >
            <ListIcon
              :class="['w-5 h-5', view === 'list' ? 'text-primary-600' : 'text-gray-400']"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile filter buttons -->
    <div class="sm:hidden flex flex-wrap gap-2 p-3">
      <button
        class="flex-grow flex items-center justify-center px-3 py-2 text-sm border rounded-md"
        :class="
          activeFiltersCount > 0
            ? 'border-primary-500 text-primary-500 bg-primary-50'
            : 'border-gray-300'
        "
        @click="showFilterModal = true"
      >
        <FilterIcon class="w-4 h-4 mr-1" />
        <span>Filters</span>
        <span
          v-if="activeFiltersCount > 0"
          class="ml-1 bg-primary-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
        >
          {{ activeFiltersCount }}
        </span>
      </button>

      <button
        class="flex-grow flex items-center justify-center px-3 py-2 text-sm border rounded-md border-gray-300"
        @click="showMobileSort = true"
      >
        <SlidersHorizontalIcon class="w-4 h-4 mr-1" />
        <span>Sort</span>
      </button>

      <div class="flex-grow flex border border-gray-300 rounded-md">
        <button
          class="flex-1 flex items-center justify-center py-2"
          :class="view === 'grid' ? 'text-primary-500' : 'text-gray-400'"
          @click="handleViewChange('grid')"
        >
          <GridIcon class="w-5 h-5" />
        </button>
        <div class="h-6 border-l border-gray-300 my-auto"></div>
        <button
          class="flex-1 flex items-center justify-center py-2"
          :class="view === 'list' ? 'text-primary-500' : 'text-gray-400'"
          @click="handleViewChange('list')"
        >
          <ListIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile quick filters (Category/Price/Make) -->
    <div class="sm:hidden flex flex-wrap gap-2 px-3 pb-3">
      <button
        class="px-3 py-1 text-sm rounded-full border transition-colors"
        :class="
          selectedCategory ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-300'
        "
        @click="toggleCategoryDropdown"
      >
        {{ selectedCategory || 'Category' }} {{ showCategoryDropdown ? '▲' : '▼' }}
      </button>

      <button
        class="px-3 py-1 text-sm rounded-full border transition-colors"
        :class="
          priceRange.min !== null || priceRange.max !== null
            ? 'bg-primary-500 text-white border-primary-500'
            : 'border-gray-300'
        "
        @click="togglePriceDropdown"
      >
        {{ priceRange.min !== null || priceRange.max !== null ? 'Price ✓' : 'Price' }}
        {{ showPriceDropdown ? '▲' : '▼' }}
      </button>

      <button
        class="px-3 py-1 text-sm rounded-full border transition-colors"
        :class="selectedMake ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-300'"
        @click="toggleMakeDropdown"
      >
        {{ selectedMake || 'Make' }} {{ showMakeDropdown ? '▲' : '▼' }}
      </button>
    </div>

    <!-- Mobile dropdown panels (reused flags) -->
    <div
      v-if="showCategoryDropdown && isMobileView"
      class="sm:hidden p-3 border-t border-gray-200 bg-gray-50 animate-fadeIn"
    >
      <h4 class="font-medium mb-2 text-sm">Select Category</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          class="px-3 py-1 text-sm rounded-full border transition-colors"
          :class="
            selectedCategory === category
              ? 'bg-primary-500 text-white border-primary-500'
              : 'border-gray-300 hover:border-primary-300'
          "
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div
      v-if="showPriceDropdown && isMobileView"
      class="sm:hidden p-3 border-t border-gray-200 bg-gray-50 animate-fadeIn"
    >
      <h4 class="font-medium mb-2 text-sm">Price Range (₦)</h4>
      <div class="flex items-center justify-between mb-3">
        <input
          type="number"
          placeholder="Min"
          class="w-[45%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          v-model.number="priceRange.min"
        />
        <span class="mx-2">-</span>
        <input
          type="number"
          placeholder="Max"
          class="w-[45%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          v-model.number="priceRange.max"
        />
      </div>
      <div class="flex justify-between space-x-2">
        <button
          class="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
          @click="clearPrice"
        >
          Clear
        </button>
        <button
          class="w-1/2 px-3 py-2 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600"
          @click="applyFilters"
        >
          Apply
        </button>
      </div>
    </div>

    <div
      v-if="showMakeDropdown && isMobileView"
      class="sm:hidden p-3 border-t border-gray-200 bg-gray-50 animate-fadeIn"
    >
      <h4 class="font-medium mb-2 text-sm">Select Make</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="make in makes"
          :key="make"
          @click="selectMake(make)"
          class="px-3 py-1 text-sm rounded-full border transition-colors"
          :class="
            selectedMake === make
              ? 'bg-primary-500 text-white border-primary-500'
              : 'border-gray-300 hover:border-primary-300'
          "
        >
          {{ make }}
        </button>
      </div>
    </div>

    <!-- Reset Filters (visible when active) -->
    <div v-if="activeFiltersCount > 0" class="px-4 py-2 flex justify-end border-t">
      <button class="text-primary-500 text-sm hover:underline" @click="clearFilters">
        Reset Filters
      </button>
    </div>

    <!-- Filter Modal -->
    <div
      v-if="showFilterModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 animate-fadeIn"
    >
      <div class="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-bold">All Filters</h3>
          <button @click="showFilterModal = false" class="p-1 rounded-full hover:bg-gray-100">
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <div class="p-4">
          <!-- Category -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">Category</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectCategory(category)"
                class="px-3 py-1 text-sm rounded-full border transition-colors"
                :class="
                  selectedCategory === category
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-gray-300 hover:border-primary-300'
                "
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">Price Range (₦)</h4>
            <div class="flex items-center space-x-3">
              <input
                type="number"
                placeholder="Min"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                v-model.number="priceRange.min"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                v-model.number="priceRange.max"
              />
            </div>
          </div>

          <!-- Make -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">Make</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="make in makes.slice(0, 12)"
                :key="make"
                @click="selectMake(make)"
                class="px-3 py-1 text-sm rounded-full border transition-colors"
                :class="
                  selectedMake === make
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-gray-300 hover:border-primary-300'
                "
              >
                {{ make }}
              </button>
            </div>
            <button v-if="makes.length > 12" class="mt-2 text-primary-500 text-sm hover:underline">
              Show more makes
            </button>
          </div>

          <!-- Condition -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">Condition</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="cond in conditionOptions"
                :key="cond"
                @click="toggleCondition(cond)"
                class="px-3 py-1 text-sm rounded-full border transition-colors"
                :class="
                  selectedConditions.includes(cond)
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-gray-300 hover:border-primary-300'
                "
              >
                {{ cond }}
              </button>
            </div>
          </div>

          <!-- Color -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">Color</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in colorOptions"
                :key="c"
                @click="toggleColor(c)"
                class="px-3 py-1 text-sm rounded-full border transition-colors"
                :class="
                  selectedColors.includes(c)
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-gray-300 hover:border-primary-300'
                "
              >
                {{ c }}
              </button>
            </div>
          </div>

          <!-- Discount -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">Discount</h4>
            <div class="space-y-3">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="has-discount"
                  class="w-4 h-4 text-primary-500 focus:ring-primary-500 rounded"
                  v-model="hasDiscount"
                />
                <label for="has-discount" class="ml-2 text-sm">Only show discounted items</label>
              </div>
              <div v-if="hasDiscount">
                <label class="block text-sm mb-1">Minimum discount</label>
                <select
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  v-model.number="minDiscount"
                >
                  <option :value="null">Any discount</option>
                  <option value="10">10% or more</option>
                  <option value="20">20% or more</option>
                  <option value="30">30% or more</option>
                  <option value="50">50% or more</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Verified -->
          <div class="mb-6">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="verified-only"
                class="w-4 h-4 text-primary-500 focus:ring-primary-500 rounded"
                v-model="verifiedOnly"
              />
              <label for="verified-only" class="ml-2 text-sm">Verified Sellers Only</label>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t">
            <button class="px-4 py-2 text-gray-600 hover:text-gray-900" @click="clearFilters">
              Clear All
            </button>
            <button
              class="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              @click="applyFilters"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Sort Modal -->
    <div
      v-if="showMobileSort"
      class="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 animate-fadeIn sm:hidden"
    >
      <div class="bg-white rounded-t-lg w-full animate-slideUp">
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-bold">Sort By</h3>
          <button @click="showMobileSort = false" class="p-1 rounded-full hover:bg-gray-100">
            <XIcon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-2">
          <button
            v-for="option in sortOptions"
            :key="option"
            @click="handleSortChange(option)"
            class="flex items-center justify-between w-full text-left px-4 py-3 hover:bg-gray-100"
            :class="selectedSort === option ? 'text-primary-500' : ''"
          >
            <span>{{ option }}</span>
            <CheckIcon v-if="selectedSort === option" class="w-5 h-5 text-primary-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FilterIcon,
  ChevronDownIcon,
  ClockIcon,
  GridIcon,
  ListIcon,
  XIcon,
  SlidersHorizontalIcon,
  CheckIcon,
} from 'lucide-vue-next'

export default {
  name: 'FilterBar',
  components: {
    FilterIcon,
    ChevronDownIcon,
    ClockIcon,
    GridIcon,
    ListIcon,
    XIcon,
    SlidersHorizontalIcon,
    CheckIcon,
  },
  props: {
    onFilterChange: { type: Function, required: false },
    onSortChange: { type: Function, required: false },
    onViewChange: { type: Function, required: false },
    onResetFilters: { type: Function, required: false },
  },
  data() {
    return {
      view: 'grid',
      showFilterModal: false,
      showCategoryDropdown: false,
      showPriceDropdown: false,
      showMakeDropdown: false,
      showSortDropdown: false,
      showTimeDropdown: false,
      showMobileSort: false,

      // Filter states
      selectedCategory: null,
      priceRange: { min: null, max: null },
      selectedMake: null,
      selectedSort: 'Recommended',
      selectedTime: 'Any time',
      selectedConditions: [],
      selectedColors: [],
      verifiedOnly: false,
      hasDiscount: false,
      minDiscount: null,

      // Options
      categories: [
        'Engines',
        'Tires',
        'Brakes',
        'Lights',
        'Body Parts',
        'Suspension',
        'AC & Heating',
        'Electrical',
        'Interior',
        'Exhaust',
        'Fuel System',
        'Cooling System',
        'Transmission',
        'Steering',
        'Wheels & Rims',
        'Batteries',
        'Accessories',
      ],
      makes: [
        'Toyota',
        'Honda',
        'Mercedes-Benz',
        'BMW',
        'Lexus',
        'Ford',
        'Nissan',
        'Hyundai',
        'Kia',
        'Volkswagen',
        'Audi',
        'Chevrolet',
        'Land Rover',
        'Volvo',
        'Mazda',
        'Subaru',
        'Jeep',
        'Mitsubishi',
      ],
      sortOptions: [
        'Recommended',
        'Newest',
        'Price: Low to High',
        'Price: High to Low',
        'Most Popular',
        'Best Rated',
        'Discount: High to Low',
      ],
      timeOptions: ['Any time', 'Today', 'Last 3 days', 'Last week', 'Last month'],
      conditionOptions: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'],
      colorOptions: ['Black', 'White', 'Silver', 'Red', 'Blue', 'Green', 'Yellow', 'Chrome'],
    }
  },
  computed: {
    activeFiltersCount() {
      return [
        this.selectedCategory !== null,
        this.priceRange.min !== null || this.priceRange.max !== null,
        this.selectedMake !== null,
        this.selectedConditions.length > 0,
        this.selectedColors.length > 0,
        this.verifiedOnly,
        this.hasDiscount,
        this.minDiscount !== null,
      ].filter(Boolean).length
    },
    isMobileView() {
      return window.innerWidth < 640
    },
    currentFilters() {
      const filters = {
        category: this.selectedCategory,
        priceMin: this.priceRange.min,
        priceMax: this.priceRange.max,
        make: this.selectedMake,
        conditions: this.selectedConditions.length > 0 ? this.selectedConditions.map(this.getApiConditionKey) : null,
        colors: this.selectedColors.length > 0 ? this.selectedColors : null,
        verifiedOnly: this.verifiedOnly || null,
        hasDiscount: this.hasDiscount || null,
        minDiscount: this.minDiscount,
        sort: this.getApiSortKey(this.selectedSort),
        time: this.getApiTimeKey(this.selectedTime),
      }
      return Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== null && value !== '' && (Array.isArray(value) ? value.length > 0 : true))
      )
    },
  },
  mounted() {
    document.addEventListener('mousedown', this.handleClickOutside)
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.$forceUpdate()
    },
    handleClickOutside(e) {
      const target = e.target
      if (!target.closest('.filter-dropdown') && !target.closest('.filter-button')) {
        this.showCategoryDropdown = false
        this.showPriceDropdown = false
        this.showMakeDropdown = false
        this.showSortDropdown = false
        this.showTimeDropdown = false
      }
    },

    getApiSortKey(sortOption) {
      const sortMap = {
        'Recommended': 'recommended',
        'Newest': 'newest',
        'Price: Low to High': 'price_asc',
        'Price: High to Low': 'price_desc',
        'Most Popular': 'popular',
        'Best Rated': 'rated',
        'Discount: High to Low': 'discount_desc',
      };
      return sortMap[sortOption] || 'recommended';
    },

    getApiTimeKey(timeOption) {
      const timeMap = {
        'Any time': 'any_time',
        'Today': 'today',
        'Last 3 days': 'last_3_days',
        'Last week': 'last_week',
        'Last month': 'last_month',
      };
      return timeMap[timeOption] || 'any_time';
    },

    getApiConditionKey(condition) {
      return condition.toLowerCase().replace(/[\s-]/g, '_');
    },

    handleViewChange(newView) {
      this.view = newView
      if (typeof this.onViewChange === 'function') this.onViewChange(newView)
    },

    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown
      this.showPriceDropdown = false
      this.showMakeDropdown = false
      this.showSortDropdown = false
      this.showTimeDropdown = false
    },
    togglePriceDropdown() {
      this.showPriceDropdown = !this.showPriceDropdown
      this.showCategoryDropdown = false
      this.showMakeDropdown = false
      this.showSortDropdown = false
      this.showTimeDropdown = false
    },
    toggleMakeDropdown() {
      this.showMakeDropdown = !this.showMakeDropdown
      this.showPriceDropdown = false
      this.showCategoryDropdown = false
      this.showSortDropdown = false
      this.showTimeDropdown = false
    },
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown
      this.showCategoryDropdown = false
      this.showPriceDropdown = false
      this.showMakeDropdown = false
      this.showTimeDropdown = false
    },
    toggleTimeDropdown() {
      this.showTimeDropdown = !this.showTimeDropdown
      this.showCategoryDropdown = false
      this.showPriceDropdown = false
      this.showMakeDropdown = false
      this.showSortDropdown = false
    },

    selectCategory(category) {
      this.selectedCategory = this.selectedCategory === category ? null : category
      this.showCategoryDropdown = false
      this.applyFilters()
    },
    selectMake(make) {
      this.selectedMake = this.selectedMake === make ? null : make
      this.showMakeDropdown = false
      this.applyFilters()
    },
    clearPrice() {
      this.priceRange = { min: null, max: null }
      this.showPriceDropdown = false
      this.applyFilters()
    },

    toggleCondition(condition) {
      const idx = this.selectedConditions.indexOf(condition)
      if (idx >= 0) this.selectedConditions.splice(idx, 1)
      else this.selectedConditions.push(condition)
    },
    toggleColor(color) {
      const idx = this.selectedColors.indexOf(color)
      if (idx >= 0) this.selectedColors.splice(idx, 1)
      else this.selectedColors.push(color)
    },

    handleSortChange(option) {
      this.selectedSort = option
      this.showSortDropdown = false
      this.showMobileSort = false
      this.applyFilters()
    },
    handleTimeChange(option) {
      this.selectedTime = option
      this.showTimeDropdown = false
      this.applyFilters()
    },

    applyFilters() {
      // Create a copy of the current filters to avoid reactivity issues
      const filters = { ...this.currentFilters }
      if (typeof this.onFilterChange === 'function') {
        this.onFilterChange(filters)
      }
      this.showFilterModal = false
    },
    clearFilters() {
      this.selectedCategory = null
      this.priceRange = { min: null, max: null }
      this.selectedMake = null
      this.selectedConditions = []
      this.selectedColors = []
      this.verifiedOnly = false
      this.hasDiscount = false
      this.minDiscount = null
      if (typeof this.onResetFilters === 'function') {
        this.onResetFilters()
      }
    },
  },
}
</script>

<style scoped>
/* Force override Bootstrap where needed (use !important) */
.filter-button {
  border: 1px solid #d1d5db !important;
  border-radius: 0.375rem !important;
  padding: 0.5rem 0.75rem !important;
  background: transparent !important;
  color: inherit !important;
}

/* Primary utilities (override) */
.border-primary-500 {
  border-color: #3b82f6 !important;
}
.text-primary-500 {
  color: #3b82f6 !important;
}
.bg-primary-50 {
  background-color: #eff6ff !important;
}
.bg-primary-500 {
  background-color: #3b82f6 !important;
}
.text-white {
  color: #fff !important;
}

/* animate */
.animate-fadeIn {
  animation: fadeIn 0.25s ease-in-out !important;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ensure lucide svgs respect sizes */
svg {
  width: 1rem !important;
  height: 1rem !important;
}
.w-4.h-4 svg,
.w-5.h-5 svg {
  width: auto !important;
  height: auto !important;
}

/* small helpers to ensure buttons look right */
button[disabled] {
  opacity: 0.6 !important;
  pointer-events: none !important;
}
</style>
