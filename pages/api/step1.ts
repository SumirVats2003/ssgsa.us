import path from 'path'
import { firestore } from '../../firebase'

export const updateApplicationData = (
  userId: string,
  name: string,
  enrollNo: string,
  currentPosition: string,
  targetProgram: string,
  faculty: string,
  targetDate: string,
  targetCountry: string,
  enrollProofDoc: string,
  formStatus: number,
) => {
  return firestore.doc(path.join('applications_data', userId)).update({
    name: name,
    enrollment: enrollNo,
    current_position: currentPosition,
    target_program: targetProgram,
    faculty: faculty,
    target_date: targetDate,
    target_country: targetCountry,
    enrollment_proof_doc: enrollProofDoc,
    form_status: formStatus,
  })
}
