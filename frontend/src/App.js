import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/Login-Logout/AuthContext";

import Navbar from "./component/utilities/Navbar/Navbar";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/Dashboard/DashBoard";
import Services from "./pages/Services/Services";
import LogIn from "./pages/Login-Logout/LogIn";
import Register from "./pages/Login-Logout/Register";
import Contact from "./pages/Contact/Contact";
import Forgot from "./pages/Login-Logout/Forgot";
import Explore from "./pages/Explore/Explore";
import CaseDetail from "./component/utilities/caseDetail/CaseDetail";
import DemoRequestForm from "./component/form/DemoRequestForm/DemoRequestForm";
import ClientForm from "./component/form/Client/ClientForm";
import CaseForm from "./component/form/AddCase/CaseForm";
import AlertsForm from "./component/form/Alerts/AlertsForm";
import TeamMembersForm from "./component/form/TeamMember/TeamMemberForm";
import AppointmentForm from "./component/form/Appointment/AppointmentForm";
import GroupForm from "./component/form/Group/GroupForm";
import DocumentGenrationForm from "./component/form/DocumentGenration/DocumentGenrationForm";
import Proxy from "./component/form/Proxy/ProxyForm";
import PartyNameForm from "./component/form/PartyName/PartyNameForm";
import ImportCase from "./component/form/AddCase/importcase/ImportCase";
import CnrForm from "./component/form/Crn/CrnForm";
import AdvocateForm from "./component/form/Advocate/Advocate";
import Finances from "./component/form/Bill/Finances/Finances";
import BillForm from "./component/form/Bill/BillForm";
import InvoicesForm from "./component/form/Invoices/InvoicesForm";
import FinancesView from "./component/form/Bill/FinancesView/FinancesView";
// import BillFormData from "./component/form/Bill/FinancesView/BillData/BillFormData";
// import InvoiceFormData from "./component/form/Bill/FinancesView/InvoiceData/InvoiceFormData";
import ReviewDocForm from "./component/form/ReviewFormDoc/ReviewDocForm";
import CasesFormData from "./component/form/AddCase/CaseFormData";
import ClientFormData from "./component/form/Client/ClientFormData";
import InvoicesFormData from "./component/form/Invoices/InvoicesFormData";
import BillFormData from "./component/form/Bill/BillFormData";
import AlertsFormData from "./component/form/Alerts/AlertsFormData";
import TeamMemberdata from "./component/form/TeamMember/TeamMemberData";
import CalendarForm from "./component/form/Calendar/CalendarForm";

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Pages Routes */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<DashBoard />} />       
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LogIn />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="explore" element={<Explore />} />
            <Route path="DemoRequestForm" element={<DemoRequestForm />} />
            
            {/* Forms Routes */}
            <Route path="dashboard/caseform" element={<CaseForm />} />
            <Route path="dashboard/clientform" element={<ClientForm />} />
            <Route path="dashboard/alertsform" element={<AlertsForm />} />
            <Route path="dashboard/teammemberform" element={<TeamMembersForm />} />
            <Route path="appointmentform" element={<AppointmentForm />} />
            <Route path="dashboard/groupform" element={<GroupForm />} />
            <Route path="documentgenrationform" element={<DocumentGenrationForm />} />
            <Route path="dashboard/proxy" element={<Proxy />} />
            <Route path="partynameform" element={<PartyNameForm />} />
            <Route path="cnrform" element={<CnrForm />} />
            <Route path="advocateform" element={<AdvocateForm />} />
            <Route path="dashboard/billform" element={<BillForm />} />
            <Route path="dashboard/invoicesform" element={<InvoicesForm />} />
            <Route path="dashboard/reviewdocform" element={<ReviewDocForm />} />
            <Route path="dashboard/calendarform" element={<CalendarForm />} />

            {/* Form data routes */}
            <Route path="dashboard/caseformdata" element={<CasesFormData />} />
            <Route path="dashboard/clientformdata" element={<ClientFormData />} />
            <Route path="dashboard/invoicesformdata" element={<InvoicesFormData />} />
            <Route path="dashboard/alertsformdata" element={<AlertsFormData />} />
            <Route path="dashboard/teammemberdata" element={<TeamMemberdata />} />
            {/* <Route path="dashboard/alertsformdata" element={<Proxy />} /> */}

            {/* Form View routes */}
            <Route path="dashboard/financesview" element={<FinancesView />} />
            <Route path="dashboard/billformdata" element={<BillFormData />} />
            {/* <Route path="invoiceformdata" element={<InvoiceFormData />} /> */}

            {/* Inside Form Routes */}
            <Route path="dashboard/Importcase" element={<ImportCase />} />
            <Route path="dashboard/finances" element={<Finances />} />
            
            {/* Dynamkc routes */}
            <Route path="case/:case_no" element={<CaseDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
