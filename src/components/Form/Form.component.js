'use client';

export default function FormComponent({ children, onSubmit, validationResult, setValidateForm, ref, className }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        await setValidateForm(true);

        setTimeout(() => setValidateForm(false), 1000);
        setTimeout(async () => {
            for (const id in validationResult) {
                if (!validationResult[id]) {
                    return false;
                }
            }

            onSubmit(e);
        }, 100);
    };

    return (
        <form className={ className } onSubmit={ handleSubmit } ref={ ref }>
            { children }
        </form>
    );
}
