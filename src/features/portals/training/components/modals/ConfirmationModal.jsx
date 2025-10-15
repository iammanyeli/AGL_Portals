import React from 'react';

// icon: WarningIcon
const WarningIcon = (props) => (
    <svg className="h-6 w-6 text-[var(--color-danger)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

// layout: ModalLayout_Confirmation
const ModalLayout_Confirmation = ({ children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 h-full w-full z-50 flex justify-center items-center">
        <div className="p-8 w-11/12 md:w-1/3 shadow-lg rounded-xl bg-[var(--color-surface-alt)] text-center transform transition-all animate-fade-in">
            {children}
        </div>
    </div>
);

// block: ModalBlock_Confirmation
const ModalBlock_Confirmation = ({ title, message, icon, footer }) => (
    <>
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[var(--color-danger)]/10 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">{title}</h3>
        <p className="text-[var(--color-text-secondary)] mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
            {footer}
        </div>
    </>
);

// primitive: Button
const Button = (props) => (
    <button
        {...props}
        className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${props.className || ''}`}
    />
);

// primitive: Button_Destructive
const Button_Destructive = (props) => (
    <Button
        {...props}
        className="bg-[var(--color-button-destructive-solid-bg)] text-[var(--color-button-destructive-solid-text)] shadow-md hover:bg-[var(--color-button-destructive-solid-hover-bg)]"
    />
);

// primitive: Button_Subtle
const Button_Subtle = (props) => (
    <Button
        {...props}
        className="text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-opacity-80"
    />
);


const ConfirmationModal = ({ title, message, onConfirm, onClose }) => (
    <ModalLayout_Confirmation>
        <ModalBlock_Confirmation
            title={title}
            message={message}
            icon={<WarningIcon />}
            footer={
                <>
                    <Button_Subtle onClick={onClose}>Cancel</Button_Subtle>
                    <Button_Destructive onClick={onConfirm}>Confirm</Button_Destructive>
                </>
            }
        />
    </ModalLayout_Confirmation>
);

export default ConfirmationModal;

