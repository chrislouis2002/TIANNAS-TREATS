<template>
  <q-page class="q-pa-md">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">🍴 Tianna's Treats Cafe - Admin Dashboard</div>
      <div class="row q-gutter-sm">
        <q-btn dense flat color="primary" label="Settings" @click="tab = 'settings'" />
        <q-btn label="Logout" color="negative" @click="logout" />
      </div>
    </div>

    <!-- Tabs -->
    <q-tabs v-model="tab" class="text-red" dense>
      <q-tab name="overview" label="Overview" />
      <q-tab name="orders" label="Orders" />
      <q-tab name="menu" label="Menu Management" />
      <q-tab name="analytics" label="Analytics" />
      <q-tab name="settings" label="Settings" />
    </q-tabs>

    <q-separator spaced />

    <!-- Tab Panels -->
    <q-tab-panels v-model="tab" animated>

      <!-- OVERVIEW TAB -->
      <q-tab-panel name="overview">
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-12 col-md-4">
            <q-card class="q-pa-md text-center bg-primary text-white">
              <div class="text-h6">Total Orders</div>
              <div class="text-h4">{{ orders.length }}</div>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card class="q-pa-md text-center bg-green text-white">
              <div class="text-h6">Total Revenue</div>
              <div class="text-h4">₦{{ totalRevenue.toLocaleString() }}</div>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card class="q-pa-md text-center bg-orange text-white">
              <div class="text-h6">Customers</div>
              <div class="text-h4">{{ totalCustomers }}</div>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- ORDERS TAB -->
      <q-tab-panel name="orders">
        <div class="row justify-end q-mb-sm">
          <q-btn color="negative" label="🧹 Clear All Orders" @click="clearAllOrders" />
        </div>

        <q-table
  title="Menu Items"
  :rows="filteredMenu"
  :columns="menuColumns"
  row-key="id"
  flat
  bordered
>
  <template v-slot:body-cell-actions="props">
    <q-td align="center">
      <q-btn dense flat icon="edit" color="primary" @click="openEditDialog(props.row)" />
      <q-btn dense flat icon="delete" color="negative" @click="deleteMenuItem(props.row.id)" />
    </q-td>
  </template>
</q-table>
      </q-tab-panel>

      <!-- MENU TAB -->
      <q-tab-panel name="menu">
        <div class="row justify-end q-mb-md">
          <q-btn color="primary" label="Add New Item" @click="openAddDialog" />
        </div>

         <div class="q-pa-md flex flex-center">
      <q-input
        v-model="searchQuery"
        placeholder="Search for a food item..."
        filled
        dense

        standout="bg-red text-white"
        input-class="text-white"
        class="search-bar"
      >
        <template v-slot:append>
          <q-icon name="search" color="white" />
        </template>
      </q-input>
    </div>


       <q-table
  title="Menu Items"
  :rows="filteredMenu"
  :columns="menuColumns"
  row-key="id"
  flat
  bordered
>
          <template v-slot:body-cell-actions="props">
            <q-td align="center">
              <q-btn dense flat icon="edit" color="primary" @click="openEditDialog(props.row)" />
              <q-btn dense flat icon="delete" color="negative" @click="deleteMenuItem(props.row.id)" />
            </q-td>
          </template>
        </q-table>

        <!-- ADD / EDIT DIALOG -->
        <q-dialog v-model="showDialog">
          <q-card style="min-width: 380px">
            <q-card-section>
              <div class="text-h6">{{ editingItem ? "Edit Item" : "Add Menu Item" }}</div>
            </q-card-section>

            <q-card-section>
              <q-input v-model="menuForm.name" label="Item Name" outlined class="q-mb-sm" />
              <q-input v-model.number="menuForm.price" label="Price (₦)" outlined class="q-mb-sm" />
              <q-input v-model="menuForm.category" label="Category" outlined class="q-mb-sm" />
              <q-input v-model="menuForm.description" label="Description (optional)" outlined class="q-mb-sm" />
              <q-input v-model="menuForm.image" label="Image (optional)" outlined class="q-mb-sm" />
              <q-toggle v-model="menuForm.available" label="Available (show to customers)" />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="grey" v-close-popup />
              <q-btn label="Save" color="primary" @click="saveMenuItem" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-tab-panel>

      <!-- ANALYTICS TAB -->
      <q-tab-panel name="analytics">
        <div class="text-h6 q-mb-md">Coming soon: Order & Revenue Charts 📊</div>
      </q-tab-panel>

      <!-- SETTINGS TAB -->
      <q-tab-panel name="settings">
        <div class="q-card q-pa-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="settings.restaurantName" label="Restaurant Name" outlined />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="settings.contactEmail" label="Contact Email" outlined />
            </div>
            <div class="col-12 col-md-6 q-mt-sm">
              <q-input v-model="settings.contactPhone" label="Contact Phone" outlined />
            </div>
            <div class="col-12 col-md-6 q-mt-sm">
              <q-input v-model="settings.currencySymbol" label="Currency Symbol" outlined />
            </div>

            <div class="col-12 q-mt-sm">
              <q-input v-model="settings.operatingHours" label="Operating Hours (text)" outlined />
            </div>

            <div class="col-12 q-mt-sm">
              <q-toggle v-model="settings.showOnlyAvailable" label="Show only available items on public menu" />
            </div>

            <div class="col-12 q-mt-md">
              <q-btn label="Save Settings" color="primary" @click="saveSettings" />
              <q-btn flat label="Reset to Defaults" color="grey" @click="loadDefaultSettings" class="q-ml-sm" />
            </div>
          </div>
        </div>
      </q-tab-panel>

    </q-tab-panels>
  </q-page>
</template>

<script setup>
/*
  AdminPage.vue
  - Menu management now saves richer menu items to the 'menu' collection
  - Settings are stored in a single document: collection 'settings' doc 'site'
  - Orders remain in 'orders', unchanged
*/

import { ref, computed, onMounted } from "vue"
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore"
import { signOut } from "firebase/auth"
import { auth, db } from "src/firebase"
import { useRouter } from "vue-router"

const router = useRouter()
const tab = ref("overview")

const orders = ref([])
const menu = ref([])
const searchQuery = ref("")

const showDialog = ref(false)
const menuForm = ref({
  name: "",
  price: 0,
  category: "",
  description: "",
  image: "",
  available: true
})
const editingItem = ref(null)

// settings object (will be loaded/saved to Firestore)
const settings = ref({
  restaurantName: "Tianna's Treats Cafe",
  contactEmail: "",
  contactPhone: "",
  currencySymbol: "₦",
  operatingHours: "",
  showOnlyAvailable: true
})

// ORDERS TABLE COLUMNS
const columns = [
  { name: "id", label: "Order ID", field: "id" },
  { name: "customerName", label: "Customer", field: "customerName" },
  { name: "customerPhone", label: "Phone", field: "customerPhone" },
  { name: "total", label: "Total (₦)", field: "total" },
  { name: "status", label: "Status", field: "status" },
  {
    name: "createdAt",
    label: "Created",
    field: row => row.createdAt?.toDate ? row.createdAt.toDate().toLocaleString() : ""
  },
  { name: "actions", label: "Actions", align: "center" }
]

// MENU TABLE COLUMNS
const menuColumns = [
  { name: "name", label: "Item", field: "name" },
  { name: "price", label: "Price (₦)", field: row => (row.price || 0).toLocaleString() },
  { name: "category", label: "Category", field: "category" },
  { name: "available", label: "Available", field: row => row.available ? "Yes" : "No" },
  { name: "actions", label: "Actions", align: "center" }
]

// FETCH ORDERS + MENU + SETTINGS IN REALTIME / ONCE
onMounted(async () => {
  // orders (real-time)
  const ordersRef = collection(db, "orders")
  onSnapshot(ordersRef, snapshot => {
    orders.value = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
  })

  // menu (real-time)
  const menuRef = collection(db, "menu")
  onSnapshot(menuRef, snapshot => {
  menu.value = snapshot.docs
    .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
    .sort((a, b) => a.name.localeCompare(b.name)) // <-- Sort alphabetically by name
})

  // load settings (once)
  await loadSettings()
})

// COMPUTED STATS
const totalRevenue = computed(() =>
  orders.value.reduce((sum, order) => sum + Number(order.total || 0), 0)
)
const totalCustomers = computed(() => {
  const uniqueEmails = new Set(orders.value.map(o => o.customerEmail))
  return uniqueEmails.size
})

// ORDERS FUNCTIONS
async function deleteOrder(orderId) {
  if (!confirm("Are you sure you want to delete this order?")) return
  await deleteDoc(doc(db, "orders", orderId))
  // Firestore onSnapshot will update table automatically
}

async function clearAllOrders() {
  if (!confirm("⚠️ This will delete ALL orders permanently. Continue?")) return
  const ordersRef = collection(db, "orders")
  const snapshot = await getDocs(ordersRef)
  const deletions = snapshot.docs.map(docSnap => deleteDoc(docSnap.ref))
  await Promise.all(deletions)
  alert("All orders cleared.")
}

// MENU FUNCTIONS
function openAddDialog() {
  menuForm.value = { name: "", price: 0, category: "", description: "", image: "", available: true }
  editingItem.value = null
  showDialog.value = true
}

function openEditDialog(item) {
  // prepare menuForm for editing
  menuForm.value = {
    name: item.name || "",
    price: Number(item.price || 0),
    category: item.category || "",
    description: item.description || "",
    image: item.image || "",
    available: item.available === undefined ? true : item.available
  }
  editingItem.value = item
  showDialog.value = true
}

async function saveMenuItem() {
  if (!menuForm.value.name || menuForm.value.price === null || menuForm.value.price === undefined || !menuForm.value.category) {
    alert("Please fill: Name, Price and Category.")
    return
  }

  const payload = {
    name: menuForm.value.name,
    price: Number(menuForm.value.price),
    category: menuForm.value.category,
    description: menuForm.value.description || "",
    image: menuForm.value.image || "",
    available: !!menuForm.value.available,
    createdAt: serverTimestamp()
  }

  if (editingItem.value && editingItem.value.id) {
    await updateDoc(doc(db, "menu", editingItem.value.id), payload)
    alert("Menu item updated successfully.")
  } else {
    await addDoc(collection(db, "menu"), payload)
    alert("Menu item added successfully.")
  }

  showDialog.value = false
}

async function deleteMenuItem(id) {
  if (!confirm("Are you sure you want to delete this menu item?")) return
  await deleteDoc(doc(db, "menu", id))
  // onSnapshot will update UI
}

 // ✅ Filter menu by search
const filteredMenu = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return menu.value;

  return menu.value.filter(item =>
    item.name.toLowerCase().includes(query) ||
    (item.category && item.category.toLowerCase().includes(query))
  );
});


// SETTINGS FUNCTIONS
const settingsDocRef = doc(db, "settings", "site")

async function loadSettings() {
  try {
    const snap = await getDoc(settingsDocRef)
    if (snap.exists()) {
      settings.value = { ...settings.value, ...snap.data() }
    } else {
      // write defaults if not present
      await setDoc(settingsDocRef, settings.value)
    }
  } catch (err) {
    console.error("Failed to load settings:", err)
  }
}

async function saveSettings() {
  try {
    await setDoc(settingsDocRef, settings.value, { merge: true })
    alert("Settings saved.")
  } catch (err) {
    console.error("Failed to save settings:", err)
    alert("Failed to save settings.")
  }
}

function loadDefaultSettings() {
  settings.value = {
    restaurantName: "Tianna's Treats Cafe",
    contactEmail: "",
    contactPhone: "",
    currencySymbol: "₦",
    operatingHours: "",
    showOnlyAvailable: true
  }
}

// LOGOUT
async function logout() {
  await signOut(auth)
  router.push("/login")
}
</script>

<style scoped>
.q-card {
  border-radius: 12px;
}
</style>
