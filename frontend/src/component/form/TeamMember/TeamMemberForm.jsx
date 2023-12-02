import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './TeamMemberForm.module.css';
import { NavLink } from 'react-router-dom';
import DashboardNavbar from '../../utilities/DashboardNavbar/DashboardNavbar';
import Axios from 'axios';

const initialValues = {
  image: '',
  fullName: '',
  email: '',
  designation: '',
  address: '',
  state: '',
  city: '',
  zipCode: '',
  selectedGroup: '',
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  designation: Yup.string(),
  address: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string(),
  selectedGroup: Yup.string(),
});




const TeamMembers = () => {
  const [groupNames, setGroupNames] = useState([]); // State to store group names

  useEffect(() => {
    // Fetch group names and populate the select options
    const fetchGroupNames = async () => {
      try {
        const response = await Axios.get('http://34.105.95.235:8052/dashboard/groupform', {
          headers: {
            'x-auth-token': localStorage.getItem('token'), // Get the token from localStorage or your authentication mechanism
          },
        });

        // Extract the group names from the response data
        const groupNamesArray = response.data.map((group) => group.groupName);
        setGroupNames(groupNamesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroupNames(); // Call the fetchGroupNames function when the component mounts
  }, []);
  return (
    <>
    <DashboardNavbar />
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            // Make an HTTP POST request to the backend with the full server URL
            const response = await Axios.post('http://34.105.95.235:8052/dashboard/teammemberform', values, {
              headers: {
                'x-auth-token': localStorage.getItem('token'), // Get the token from localStorage or your authentication mechanism
              },
            });
      
            console.log(response.data); // Log the response from the backend
            alert('Team Member Added successfully!');
            resetForm();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={styles.imageUpload}>
              <label className={styles.imageLabel} htmlFor="image">
                {values.image ? (
                  <img
                    src={URL.createObjectURL(values.image)}
                    alt="Uploaded"
                    className={styles.uploadedImage}
                  />
                ) : (
                  <div className={styles.emptyImage}>Click here to Upload</div>
                  
                )}
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0]);
                }}
                className={styles.imageInput}
              />
              <ErrorMessage name="image" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                type="text"
                name="fullName"
                placeholder="Full Name"
                className={styles.inputField}
              />
              <ErrorMessage name="fullName" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <Field type="email" name="email" placeholder="Email" className={styles.inputField} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                type="text"
                name="designation"
                placeholder="Designation"
                className={styles.inputField}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                type="text"
                name="address"
                placeholder="Address"
                className={styles.inputField}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Field type="text" name="state" placeholder="State" className={styles.inputField} />
            </div>

            <div className={styles.fieldGroup}>
              <Field type="text" name="city" placeholder="City" className={styles.inputField} />
            </div>

            <div className={styles.fieldGroup}>
              <Field type="text" name="zipCode" placeholder="Zip Code" className={styles.inputField} />
            </div>

            <div className={styles.horizontalFields}>
                <div className={styles.fieldGroup}>
                  <Field as="select" name="selectedGroup" className={styles.selectField}>
                    <option value="">Select a Group</option>
                    {groupNames.map((groupName) => (
                      <option key={groupName} value={groupName}>
                        {groupName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedGroup" component="div" className={styles.error} />
                </div>

              <div className={styles.fieldGroup}>
                <NavLink to={"/dashboard/groupform"} className={styles.link}>
                  Add New Group
                </NavLink>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
};

export default TeamMembers;
