import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Checkout from "../../Pages/Checkout/Checkout";
import AddVehicle from "../../Pages/Dashboard/AddVehicle/AddVehicle";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ManageVehicle from "../../Pages/Dashboard/ManageVehicle/ManageVehicle";
import MyOrder from "../../Pages/Dashboard/MyOrder/MyOrder";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

// import Vehicle from "../../Pages/Vehicle/Vehicle/Vehicle";
// import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
// import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
//import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
// import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
// import MyOrder from "../../Pages/Dashboard/MyOrder/MyOrder";
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
        path: '/orders',
        element: <PrivateRoute><Orders></Orders></PrivateRoute>
      },
      {
        path: '/dashboard',
        // element: <AdminRoute> <DashboardLayout></DashboardLayout></AdminRoute>,
        element: <SellerRoute> <DashboardLayout></DashboardLayout></SellerRoute>,
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
          // {
          //   path: '/dashboard/allusers',
          //   element: <AllUsers></AllUsers>
          // }
          {
            path: '/dashboard/addvehicle',
            element:  <SellerRoute> <AddVehicle></AddVehicle></SellerRoute>
          },
          {
            path: '/dashboard/managevehicle',
            element: <SellerRoute><ManageVehicle></ManageVehicle> </SellerRoute>
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