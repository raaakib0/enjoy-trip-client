import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Checkout from "../../Pages/Checkout/Checkout";
import AddVehicle from "../../Pages/Dashboard/AddVehicle/AddVehicle";
import AllOrder from "../../Pages/Dashboard/AllOrder/AllOrder";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ManageVehicle from "../../Pages/Dashboard/ManageVehicle/ManageVehicle";
import MyOrder from "../../Pages/Dashboard/MyOrder/MyOrder";
import Home from "../../Pages/Home/Home/Home";
import CatVehicles from "../../Pages/Home/Vehicles/CatVehicles";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

// import Payment from "../../Pages/Dashboard/Payment/Payment";
// import Home from "../../Pages/Home/Home/Home";
// import Login from "../../Pages/Login/Login";
// import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
// import SignUp from "../../Pages/SignUp/SignUp";
// import AdminRoute from "../AdminRoute/AdminRoute";
// import PrivateRoute from "../PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/checkout/:id',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/vehicles/${params.id}`)
      },
      {
        path: '/categorie/:categorie',
        element: <CatVehicles></CatVehicles>,
        loader: ({ params }) => fetch(`http://localhost:5000/vehicles3?categorie=${params.categorie}`)
      },
      {
        path: '/orders',
        element: <PrivateRoute><Orders></Orders></PrivateRoute>
      },
      {
        path: '/dashboard',
        // element: <AdminRoute> <DashboardLayout></DashboardLayout></AdminRoute>,
        // element: <SellerRoute> <DashboardLayout></DashboardLayout></SellerRoute>,
        element: <DashboardLayout></DashboardLayout>,
        // errorElement: <DisplayError></DisplayError>,
        children: [
          {
            path: '/dashboard',
            element: <MyOrder></MyOrder>
          },
          {
            path: '/dashboard/allusers',
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
          },
          {
            path: '/dashboard/allorders',
            element: <AdminRoute> <AllOrder></AllOrder> </AdminRoute>
          },
          // {
          //   path: '/dashboard/allusers',
          //   element: <AllUsers></AllUsers>
          // }
          {
            path: '/dashboard/addvehicle',
            // element:  <SellerRoute> <AddVehicle></AddVehicle></SellerRoute>,
            // element: <AdminRoute>  <AddVehicle></AddVehicle></AdminRoute>
            element:  <AddVehicle></AddVehicle>
          },
          {
            path: '/dashboard/managevehicle',
            // element: <SellerRoute><ManageVehicle></ManageVehicle> </SellerRoute>,
            // element: <AdminRoute>  <ManageVehicle></ManageVehicle></AdminRoute>
            element: <ManageVehicle></ManageVehicle>
          },
          // {
          //   path: '/dashboard/payment/:id',
          //   element: <Payment></Payment>,
          //   loader: ({ params }) => fetch(`https://doctors-portal-server-rust.vercel.app/bookings/${params.id}`)
          // },
        ]
      },
    ]
  },
  
  // {
  //   path: '/dashboard',
  //   element: <PrivateRoute></PrivateRoute>
  // }
]);

export default router;