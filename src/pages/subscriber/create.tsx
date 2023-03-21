import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Head from "next/head";

export default function CreateSubscriber() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    company: Yup.string().required("Required"),
  });

  return (
    <>
      <Head>
        <title>Create Subscriber</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Create Subscriber</h5>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    company: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    axios.post('/api/subscriber', values)
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <Field
                          type="text"
                          name="firstName"
                          className={
                            "form-control" +
                            (errors.firstName && touched.firstName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <Field
                          type="text"
                          name="lastName"
                          className={
                            "form-control" +
                            (errors.lastName && touched.lastName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <Field
                          type="email"
                          name="email"
                          className={
                            "form-control" +
                            (errors.email && touched.email ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="company">Company Name</label>
                        <Field
                          type="text"
                          name="company"
                          className={
                            "form-control" +
                            (errors.company && touched.company
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="company"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}