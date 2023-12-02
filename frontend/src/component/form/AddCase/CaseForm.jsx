import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import styles from './AddCase.module.css';
import SideNav from '../../utilities/SideNavBar/SideNav';
import axios from 'axios';
import DashboardNavbar from '../../utilities/DashboardNavbar/DashboardNavbar';


const CaseForm = () => {
  const [clientNames, setClientNames] = useState([]); // State to store client first names
  const [teamMembers, setTeamMembers] = useState([]); // State to store team member full names

  useEffect(() => {
    // Fetch client first names and populate the select options
    const fetchClientNames = async () => {
      try {
        const response = await axios.get('http://localhost:4000/clientform', {
          headers: {
            'x-auth-token': localStorage.getItem('token'), // Get the token from localStorage or your authentication mechanism
          },
        });

        // Extract the first names from the response data
        const firstNamesArray = response.data.map((client) => client.firstName);
        setClientNames(firstNamesArray);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch team member full names and populate the select options
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/teammembers', {
          headers: {
            'x-auth-token': localStorage.getItem('token'), // Get the token from localStorage or your authentication mechanism
          },
        });

        // Extract the full names from the response data
        const fullNamesArray = response.data.map((member) => member.fullName);
        setTeamMembers(fullNamesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClientNames(); // Call the fetchClientNames function when the component mounts
    fetchTeamMembers(); // Call the fetchTeamMembers function when the component mounts
  }, []);
const initialValues = {
  title: '',
  caseType: '',
  courtType: '',
  courtName: '',
  caveatNo: '',
  caseCode: '',
  caseURL: '',
  caseStatus: '',
  honorableJudge: '',
  courtHallNo: '',
  cnrNo: '',
  batchNo: '',
  dateOfFiling: '',
  practiceArea: '',
  manage: '',
  client: '',
  addNewClient: '',
  team: '',
  addNewMember: '',
  clientDesignation: '',
  opponentPartyName: '',
  lawyerName: '',
  mobileNo: '',
  emailId: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  caseType: Yup.string().required('Case type is required'),
  // Add validation for other fields as needed
});


  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Make an HTTP POST request to the backend with the full server URL
      const response = await axios.post('http://34.105.95.235:8051/caseform', values, {
        headers: {
          'x-auth-token': localStorage.getItem('token'), // Get the token from localStorage or your authentication mechanism
        },
      });

      console.log(response.data); // Log the response from the backend
      alert('Case Added successfully!');
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <div className={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
           {({ values }) => (
          <Form className={styles.form}>
            {/* Title */}
           
            <div className={styles.row}>
            <div className={styles.column}> 
            <label className={styles.label}>Title:</label>
              <Field type="text" name="title" className={styles.inputTitle} />
              <ErrorMessage name="title" component="div" className={styles.error} />
              </div>
            </div>

            {/* Case Type (Radio Buttons) */}
           
            <div className={styles.row}>
            <div className={styles.column}>
            <label className={styles.label}>Case Type:</label>
              <div className={styles.radioGroup}>
                <Field type="radio" name="caseType" value="litigation" className={styles.radio} />Litigation
                <Field type="radio" name="caseType" value="non-litigation" className={styles.radio} />Non-Litigation
                <Field type="radio" name="caseType" value="caveat" className={styles.radio} />Caveat
              </div>
              <ErrorMessage name="caseType" component="div" className={styles.error} />
            </div>
            </div>

            {/* Court Type (Radio Buttons - Displayed when 'Litigation' selected) */}
            {values.caseType === 'litigation' && (
              <div className={styles.row}>
                <div className={styles.column}>
                <label className={styles.label}>Court Type:</label>
                {/* Add radio buttons for Court Type */}
                <div className={styles.radioGroup}>
                
                <Field type="radio" name="HighCourt" value="High" className={styles.radio} />High 
                <Field type="radio" name="ConsumerCourt" value="Consumer" className={styles.radio} />Consumer 
                <Field type="radio" name="SupremeCourt" value="Supreme" className={styles.radio} />Supreme 
                <Field type="radio" name="DistrictCourt" value="District" className={styles.radio} />District
                <Field type="radio" name="Tribunal" value="Tribunal" className={styles.radio} />Tribunal
                <Field type="radio" name="Revenue" value="Revenue" className={styles.radio} />Revenue
                <Field type="radio" name="Department" value="Department" className={styles.radio} />Department
                <Field type="radio" name="LokAdalat" value="LokAdalat" className={styles.radio} />Lok Adalat
                <Field type="radio" name="OtherCourt" value="Other" className={styles.radio} />Other 
              </div>
              </div>
              </div>
            )}

            {/* Court Name and Caveat No (Displayed when 'Caveat' selected) */}
            {values.caseType === 'caveat' && (
              <>
                
                <div className={styles.row}>
                   <div className={styles.column}>
                  <label className={styles.label}>Court Name:</label>
                  <Field type="text" name="courtName" className={styles.inputCaveat1} />
                  </div>
                  <div className={styles.column}>
                  <label className={styles.labelCaveat2}>Caveat No:</label>
                  <Field type="text" name="caveatNo" className={styles.inputCaveat2} />
                  </div>
                </div>
              </>
            )}

            {/* Case Code */}
            
            <div className={styles.row}>
            <div className={styles.column}>
              <label className={styles.label}>Case Code:</label>
              <Field type="text" name="caseCode" className={styles.input} />
            </div>

            {/* Case URL */}
            
            
            <div className={styles.column}>
              <label className={styles.label}>Case URL:</label>
              <Field type="text" name="caseURL" className={styles.input} />
            </div>

            {/* Honorable Judge */}
            <div className={styles.column}>
             <label className={styles.label}>Honorable Judge:</label>
             <Field type="text" name="honorableJudge" className={styles.input} />
            </div>
            {/* Case Status (Select Options) */}
            
            <div className={styles.column}>
              <label className={styles.label}>Case Status:</label>
              <Field as="select" name="caseStatus" className={styles.selectCaseStatus}>
                <option value="">Select</option>
                <option value="Closed">Closed</option>
                <option value="Transfered"> Transfered(NOC Given) </option>
                <option value="DirectionMatters">Direction Matters</option>
                <option value="OrderRecieved">Order Recieved</option>
              </Field>
              <ErrorMessage name="caseStatus" component="div" className={styles.error} />
            </div>
            </div>

            {/* Court Hall No */}
           
            <div className={styles.row}>
            <div className={styles.column}>
            <label className={styles.label}>Court Hall No:</label>
              <Field type="text" name="courtHallNo" className={styles.input} />
            </div>

            {/* CNR No */}
            
            <div className={styles.column}>
            <label className={styles.label}>CNR No:</label>
              <Field type="text" name="cnrNo" className={styles.input} />
            </div>

            {/* Batch No */}
            
            <div className={styles.column}>
            <label className={styles.label}>Batch No:</label>
              <Field type="text" name="batchNo" className={styles.input} />
            </div>

            {/* Date of Filing (Date Picker) */}
            
            <div className={styles.column}>
            <label className={styles.label}>Date of Filing:</label>
              <Field type="date" name="dateOfFiling" className={styles.inputDate} />
            </div>
            </div>

            {/* Practice Area (Select Options) */}
            
            
            <div className={styles.row}>
            <div className={styles.column}>
            <label className={styles.label}>Practice Area:</label>
              <Field as="select" name="practiceArea" className={styles.selectPa}>
                <option value="">Select</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="Immigration">Immigration</option>
                <option value="Industrial and Labouror">Industrial and Labouror</option>
                <option value="Insurance">Insurance</option>
                <option value="Traffic and Accident">Traffic and Accident</option>
                <option value="Maritime">Maritime</option>
                <option value="Media and Entertainment">Media and Entertainment</option>
                <option value="Marriage, Family and Adoption (NOC)">Marriage, Family and Adoption (NOC)</option>
                <option value="Alternative Dispute Resolution (NOC)">Alternative Dispute Resolution (NOC)</option>
                <option value="Human and Animal Rights (NOC)">Human and Animal Rights (NOC)</option>
                <option value="Enviorment (NOC)">Enviorment (NOC)</option>
                <option value="Criminal, Check bounce, Cyber Crimes (NOC)">Criminal, Check bounce, Cyber Crimes (NOC)</option>
                <option value="Direct Tax (NOC)">Direct Tax (NOC)</option>
                <option value="Indirect Tax (NOC)">Indirect Tax (NOC)</option>
                <option value="Consumer Protection (NOC)">Consumer Protection (NOC)</option>
                <option value="Constitution and Public Law (NOC)">Constitution and Public Law (NOC)</option>
              </Field>
            </div>

            {/* Manage (Select Options) */}
           
            <div className={styles.column}>
            <label className={styles.labelManage}>Priority:</label>
              <Field as="select" name="manage" className={styles.selectManage}>
                <option value="">Select</option>
                <option value="Critical">Critical</option>
                <option value="Important">Important</option>
                <option value="Normal">Normal</option>
              </Field>
            </div>
            </div>

           
            

            <div className={styles.heading}>Client</div>
            {/* Client (Select Options) */}
            
            <div className={styles.row}>
            <div className={styles.column}>
            <label className={styles.label}>Client:</label>
            <Field as="select" name="client" className={styles.selectClient}>
                    <option value="">Select</option>
                    {clientNames.map((firstName) => (
                      <option key={firstName} value={firstName}>
                        {firstName}
                      </option>
                    ))}
                  </Field>
              <NavLink className={styles.linkClient} to="/dashboard/clientform">Add New Client</NavLink>
            </div>
            <div className={styles.columnTeam}>
            <label className={styles.labelTeam}>Team:</label>
            <Field as="select" name="assignTo" className={styles.selectTeam}>
                    <option value="">Select an option</option>
                    {teamMembers.map((fullName) => (
                      <option key={fullName} value={fullName}>
                        {fullName}
                      </option>
                    ))}
                  </Field>
              <NavLink className={styles.linkTeam} to="/dashboard/teammemberform">Add New Member</NavLink>
            </div>
            </div>

            <div className={styles.column}>
            <label className={styles.label}>Client Designation:</label>
              <Field as="select" name="clientDesignation" className={styles.selectCd}>
                <option value="">Select</option>
                {/* Add client designation options */}
              </Field>
            </div>

            {/* Opponent (Heading) */}
            <div className={styles.heading}>Opponent</div>

            {/* Opponent Party Name */}
            <div className={styles.row1}>
            <div className={styles.column}>
            <label className={styles.label}>Party:</label>
              <Field type="text" name="opponentPartyName" className={styles.inputopn} />
            </div>

            {/* Lawyer Name */}
            
            <div className={styles.column}>
            <label className={styles.labelln}>Lawyer Name:</label>
              <Field type="text" name="lawyerName" className={styles.inputln} />
            </div>
            </div>

            {/* Mobile No */}
            <div className={styles.row1}>
            <div className={styles.column}>
            <label className={styles.label}>Mobile No:</label>
              <Field type="text" name="mobileNo" className={styles.inputmn} />
            </div>

            {/* Email Id */}
            <div className={styles.column}>
              <label className={styles.labelei}>Email Id:</label>
              <Field type="text" name="emailId" className={styles.inputei} />
            </div>
            </div>

            {/* Submit Button */}
            <div className={styles.row}>
              <label className={styles.label}></label>
              <button type="submit" className={styles.submitButton}>Submit</button>
            </div>
          </Form>
          )}
           </Formik>
      </div>
    </>
  );
};

export default CaseForm;
