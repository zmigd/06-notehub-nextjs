// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createNote } from "../../services/noteService";
// import css from "./NoteForm.module.css";

// interface NoteFormProps {
//   onCancel: () => void;
// }

// export default function NoteForm({ onCancel }: NoteFormProps) {
//   const queryClient = useQueryClient();

//   const createMutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       onCancel(); 
//     },
//   });

//   return (
//     <Formik
//       initialValues={{ title: "", content: "", tag: "Todo" }}
//       validationSchema={Yup.object({
//         title: Yup.string().min(3).max(50).required("Title is required"),
//         content: Yup.string().max(500, "Max 500 characters"),
//         tag: Yup.string()
//           .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//           .required("Tag is required"),
//       })}
//       onSubmit={(values, { resetForm }) => {
//         createMutation.mutate(values);
//         resetForm();
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form className={css.form}>
//           <div className={css.formGroup}>
//             <label htmlFor="title">Title</label>
//             <Field id="title" name="title" type="text" className={css.input} />
//             <ErrorMessage name="title" component="span" className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="content">Content</label>
//             <Field
//               id="content"
//               name="content"
//               as="textarea"
//               rows={8}
//               className={css.textarea}
//             />
//             <ErrorMessage name="content" component="span" className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="tag">Tag</label>
//             <Field id="tag" name="tag" as="select" className={css.select}>
//               <option value="Todo">Todo</option>
//               <option value="Work">Work</option>
//               <option value="Personal">Personal</option>
//               <option value="Meeting">Meeting</option>
//               <option value="Shopping">Shopping</option>
//             </Field>
//             <ErrorMessage name="tag" component="span" className={css.error} />
//           </div>

//           <div className={css.actions}>
//             <button type="button" className={css.cancelButton} onClick={onCancel}>
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={css.submitButton}
//               disabled={isSubmitting || createMutation.isPending}
//             >
//               {createMutation.isPending ? "Saving..." : "Create note"}
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }
