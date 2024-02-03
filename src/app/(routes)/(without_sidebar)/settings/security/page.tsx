import { ChangeEmailForm, ChangePasswordForm } from "./_components/change-credentials-form"
import { ConfirmModal } from "./_components/confirm-modal"

const SecurityPage = () => {
    return(
        <div className="flex flex-col items-center gap-y-12 mobile:mt-8">
            <ChangeEmailForm />
            <ChangePasswordForm />
            <ConfirmModal />
        </div>
    )
}

export default SecurityPage