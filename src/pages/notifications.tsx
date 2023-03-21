import Head from "next/head";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';

const validationSchema = Yup.object().shape({
  subscriberId: Yup.string().required("Required"),
});

export default function Notifications() {
  const [subscriberId, setSubscriberId] = useState<string>('');
  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Notifications</h5>
                <Formik
                  initialValues={{
                    subscriberId: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    setSubscriberId(values.subscriberId)
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group mb-3">
                        <label htmlFor="subscriberId">Subscriber ID</label>
                        <Field
                          type="text"
                          name="subscriberId"
                          className={
                            "form-control" +
                            (errors.subscriberId && touched.subscriberId
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="subscriberId"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Receive
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                {
                  subscriberId.length > 0 && (
                    <NovuProvider
                      backendUrl={process.env.NEXT_PUBLIC_NOVU_BACKEND_URL as string}
                      socketUrl={process.env.NEXT_PUBLIC_NOVU_SOCKET_URL}
                      subscriberId={subscriberId}
                      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER as string}
                    >
                      <PopoverNotificationCenter colorScheme={'light'}>
                        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                      </PopoverNotificationCenter>
                    </NovuProvider>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}