import {
    ChangeEmailForm,
    ChangePasswordForm,
} from "./_components/change-credentials-form";

const SecurityPage = () => {
    return (
        <div className="flex flex-col items-center gap-y-12 mobile:mt-8">
            <ChangeEmailForm />
            <ChangePasswordForm />
        </div>
    );
};

export default SecurityPage;
