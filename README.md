# FoodWagon

**FoodWagon** is a modern food delivery web application built with Next.js, React, Redux Toolkit, and Tailwind CSS. It allows users to browse, search, add, edit, and delete meals, simulating a food delivery platform with a beautiful, responsive UI.

## Features

- **Browse Meals:** View a list of featured meals with images, ratings, prices, and restaurant info.
- **Search:** Search for meals by name or restaurant with instant feedback.
- **Add Meal:** Add a new meal using a modal form with validation.
- **Edit Meal:** Edit existing meal details in a modal.
- **Delete Meal:** Delete a meal with confirmation.
- **Delivery/Pickup Toggle:** Switch between delivery and pickup modes.
- **Theme Toggle:** Switch between light and dark themes.
- **Persistent State:** Meals are cached in localStorage for fast reloads.
- **Responsive Design:** Fully responsive and mobile-friendly.
- **Footer:** Includes company info, contact, legal links, social media, and newsletter subscription.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI:** [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/), [React-Redux](https://react-redux.js.org/)
- **API:** [Axios](https://axios-http.com/), [MockAPI](https://mockapi.io/) for backend simulation
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Notifications:** [react-hot-toast](https://react-hot-toast.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Other:** [TanStack React Query](https://tanstack.com/query/latest), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Testing:** [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (or pnpm/yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd foodwagon-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/                # Next.js app directory (pages, layout, loading, etc.)
components/         # Reusable UI components and modals
lib/                # API logic, types, state management, utilities
public/             # Static assets (images, logos)
styles/             # Global styles
hooks/              # Custom React hooks
```

## API

- Uses [MockAPI](https://mockapi.io/) as a backend for CRUD operations on meals.
- API base URL: `https://6852821e0594059b23cdd834.mockapi.io`
- Endpoints: `/Food` (GET, POST, PUT, DELETE)

## Customization

- **Theming:** Easily switch between light and dark mode.
- **Tailwind CSS:** Custom color palette and utility classes.
- **State:** Easily extendable Redux slices for more features.

## Testing

- **Jest** and **React Testing Library** are set up for unit and integration tests.
- To run tests:
  ```bash
  npm test
  # or
  npx jest
  ```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE) (add a license file if needed)