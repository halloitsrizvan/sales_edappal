# Sales Edappal - Premium Real Estate Platform 🏡📍

**Sales Edappal** is a comprehensive, modern real estate platform designed for **Sameer Edappal**, a trusted real estate consultant based in Kerala. The platform enables users to browse, list, and inquire about properties while providing admins with powerful tools to manage inventory and analyze market trends.

---

## ✨ Key Features

### 🌍 **Public Facing**
- **Dynamic Property search**: Advanced filtering by type (House, Plot, Commercial), status (Buy, Rent, Lease), location, and budget.
- **Interactive Google Maps**: Integrated precise locations for properties using Google Maps Embed API.
- **Property Inquiry**: Direct WhatsApp and phone integration with "Call Agent" and tailored inquiry forms.
- **List Your Property**: A dedicated portal for owners to submit their properties with image uploads and payment tracking.
- **Reviews & Feedback**: A built-in system for clients to share their experiences and view verified testimonials.

### 🛡️ **Admin Dashboard**
- **Inventory Management**: Full CRUD operations for properties, including featured listings toggle and approval workflows.
- **Visual Analytics**: Dynamic charts (Bar Charts, Pie Charts) showing inventory distribution across Sale, Rent, and Lease statuses.
- **Review Moderation**: Manage and approve client feedback before it goes live.
- **Automated Data Processing**: Smart extraction of amenities like "Water Source" and "Road Access" from textual descriptions.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: React Hooks with custom validation logic

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB Connection URI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sales_edappal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```bash
├── app/                  # Next.js App Router (Pages & API)
│   ├── admin/            # Admin Dashboard & Management
│   ├── api/              # Backend API Routes (Properties, Reviews)
│   ├── properties/       # Public Property Listing & Details
│   └── ...               # Home, About, Contact
├── components/           # Reusable UI Components
├── lib/                  # Database connection & Utility functions
├── models/               # Mongoose Schema Definitions
├── public/               # Static Assets (Logo, sameer.png)
└── ...
```

---

## 📞 Contact Information

**Sameer Edappal**  
*Property Consultant*  
📍 OMG Shoes Footwear, Amsakachery, Edappal, Kerala 679576  
📞 **Phone**: [+91 9895294949](tel:+919895294949)  
📧 **Email**: contact@salesedappal.com  

---

© 2026 Sales Edappal. All rights reserved.
